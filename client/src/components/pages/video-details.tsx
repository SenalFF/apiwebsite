import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import VideoInfoComponent from "@/components/video-info";
import DownloadOptions from "@/components/download-options";
import { Button } from "@/components/ui/button";
import { VideoInfo as VideoInfoType } from "@shared/schema";

export default function VideoDetails() {
  const [location, setLocation] = useLocation();
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get("url");
    if (url) {
      setVideoUrl(decodeURIComponent(url));
    }
  }, [location]);

  const { data: videoData, isLoading, error } = useQuery({
    queryKey: ["/api/info", videoUrl],
    enabled: !!videoUrl,
    queryFn: async () => {
      const response = await fetch(`/api/info?url=${encodeURIComponent(videoUrl)}`);
      if (!response.ok) {
        throw new Error("Failed to get video information");
      }
      return (await response.json()) as VideoInfoType;
    },
  });

  const handleGoBack = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={handleGoBack}
            data-testid="button-back"
            className="text-muted-foreground hover:text-foreground"
          >
            <i className="fas fa-arrow-left mr-2"></i>Back to Search
          </Button>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-8">
            <p className="text-destructive">
              Failed to load video information. Please check the URL and try again.
            </p>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <i className="fas fa-spinner animate-spin text-primary text-4xl mb-4"></i>
              <p className="text-foreground font-medium">Loading video information...</p>
            </div>
          </div>
        )}

        {videoData && (
          <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <VideoInfoComponent videoInfo={videoData} />
                <DownloadOptions videoInfo={videoData} />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
