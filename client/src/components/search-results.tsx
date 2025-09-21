import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { SearchResult } from "@shared/schema";

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
}

export default function SearchResults({ results, isLoading }: SearchResultsProps) {
  const [, setLocation] = useLocation();

  const handleViewDetails = (url: string) => {
    setLocation(`/video?url=${encodeURIComponent(url)}`);
  };

  if (isLoading) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <i className="fas fa-spinner animate-spin text-primary text-4xl mb-4"></i>
            <p className="text-foreground font-medium">Searching videos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!results.length) {
    return null;
  }

  return (
    <section className="mb-12">
      <h3 className="text-2xl font-semibold text-foreground mb-6">Search Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {results.map((video, index) => (
          <div
            key={video.id}
            className="bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
            data-testid={`card-video-${video.id}`}
          >
            <img 
              src={video.thumbnail} 
              alt={video.title}
              className="w-full aspect-video object-cover"
              data-testid={`img-thumbnail-${video.id}`}
            />
            <div className="p-4">
              <h4 
                className="font-medium text-foreground mb-2 line-clamp-2"
                data-testid={`text-title-${video.id}`}
              >
                {video.title}
              </h4>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <span data-testid={`text-channel-${video.id}`}>{video.channel}</span>
                <span data-testid={`text-duration-${video.id}`}>{video.duration}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span data-testid={`text-views-${video.id}`}>{video.views}</span>
                <span data-testid={`text-published-${video.id}`}>{video.publishedAt}</span>
              </div>
              <Button
                onClick={() => handleViewDetails(video.url)}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                data-testid={`button-details-${video.id}`}
              >
                <i className="fas fa-info-circle mr-2"></i>View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
