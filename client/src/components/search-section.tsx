import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchSectionProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function SearchSection({ onSearch, isLoading }: SearchSectionProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <section className="mb-12">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Search & Download YouTube Videos</h2>
        <p className="text-muted-foreground">Enter a search term or paste a YouTube URL to get started</p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="relative flex">
          <Input
            type="text"
            placeholder="Search videos or paste YouTube URL..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={handleKeyUp}
            data-testid="input-search"
            className="flex-1 px-4 py-3 text-base rounded-l-md focus:ring-2 focus:ring-ring"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !query.trim()}
            data-testid="button-search"
            className="px-6 py-3 rounded-r-md rounded-l-none"
          >
            {isLoading ? (
              <i className="fas fa-spinner animate-spin"></i>
            ) : (
              <i className="fas fa-search"></i>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
