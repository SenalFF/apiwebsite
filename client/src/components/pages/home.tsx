import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchSection from "@/components/search-section";
import SearchResults from "@/components/search-results";
import { SearchResult } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);

  const { data: searchData, isLoading, error } = useQuery({
    queryKey: ["/api/search", searchQuery],
    enabled: shouldSearch && searchQuery.length > 0,
    queryFn: async () => {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error("Failed to search videos");
      }
      return response.json();
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShouldSearch(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchSection onSearch={handleSearch} isLoading={isLoading} />
        
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-8">
            <p className="text-destructive">
              Failed to search videos. Please try again.
            </p>
          </div>
        )}
        
        {searchData?.videos && (
          <SearchResults 
            results={searchData.videos as SearchResult[]} 
            isLoading={isLoading}
          />
        )}

        {/* API Documentation */}
        <section className="mb-12">
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <i className="fas fa-code mr-3 text-primary"></i>API Documentation
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">Search Videos</h4>
                <div className="text-sm font-mono bg-secondary p-3 rounded mb-3">
                  GET /api/search?q=QUERY
                </div>
                <p className="text-xs text-muted-foreground">Search YouTube videos by keyword or phrase</p>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">Video Info</h4>
                <div className="text-sm font-mono bg-secondary p-3 rounded mb-3">
                  GET /api/info?url=VIDEO_URL
                </div>
                <p className="text-xs text-muted-foreground">Get detailed information about a specific video</p>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">Download Video</h4>
                <div className="text-sm font-mono bg-secondary p-3 rounded mb-3">
                  GET /api/download?url=VIDEO_URL&format=itag
                </div>
                <p className="text-xs text-muted-foreground">Direct download link for specified format</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
