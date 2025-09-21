import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VideoInfo, VideoFormat } from "@shared/schema";
import { cn } from "@/lib/utils";

interface DownloadOptionsProps {
  videoInfo: VideoInfo;
}

export default function DownloadOptions({ videoInfo }: DownloadOptionsProps) {
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat | null>(null);

  const handleDownload = () => {
    if (!selectedFormat) return;
    
    const downloadUrl = `/api/download?url=${encodeURIComponent(videoInfo.url)}&format=${selectedFormat.itag}`;
    window.open(downloadUrl, '_blank');
  };

  const videoFormats = videoInfo.formats.filter(f => f.type === 'video');
  const audioFormats = videoInfo.formats.filter(f => f.type === 'audio');

  return (
    <div>
      <h3 className="text-xl font-semibold text-foreground mb-6">Download Options</h3>
      
      <div className="space-y-6">
        {/* Video Formats */}
        {videoFormats.length > 0 && (
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center">
              <i className="fas fa-video mr-2 text-primary"></i>Video Quality
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videoFormats.map((format) => (
                <div
                  key={format.itag}
                  onClick={() => setSelectedFormat(format)}
                  className={cn(
                    "bg-secondary rounded-lg p-4 border cursor-pointer transition-all hover:border-primary",
                    selectedFormat?.itag === format.itag 
                      ? "border-primary bg-primary/5" 
                      : "border-border"
                  )}
                  data-testid={`format-video-${format.quality}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{format.quality}</span>
                    {format.quality.includes('720') && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div>Size: {format.size}</div>
                    <div>Format: {format.format.toUpperCase()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audio Formats */}
        {audioFormats.length > 0 && (
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center">
              <i className="fas fa-music mr-2 text-primary"></i>Audio Only
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {audioFormats.map((format) => (
                <div
                  key={format.itag}
                  onClick={() => setSelectedFormat(format)}
                  className={cn(
                    "bg-secondary rounded-lg p-4 border cursor-pointer transition-all hover:border-primary",
                    selectedFormat?.itag === format.itag 
                      ? "border-primary bg-primary/5" 
                      : "border-border"
                  )}
                  data-testid="format-audio"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium flex items-center">
                      <i className="fas fa-music mr-2"></i>Audio Only
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div>Size: {format.size}</div>
                    <div>Format: {format.format.toUpperCase()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Download Button */}
        <div className="bg-muted rounded-lg p-6 text-center">
          <div className="mb-4">
            <div className="text-sm text-muted-foreground mb-2">Selected Format:</div>
            <div 
              className="font-medium text-lg"
              data-testid="text-selected-format"
            >
              {selectedFormat ? `${selectedFormat.quality} - ${selectedFormat.size}` : 'None selected'}
            </div>
          </div>
          
          <Button 
            onClick={handleDownload}
            disabled={!selectedFormat}
            className="w-full px-6 py-3 bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-semibold disabled:opacity-50"
            data-testid="button-download"
          >
            <i className="fas fa-download mr-2"></i>Download Video
          </Button>
          
          <div className="mt-4 text-xs text-muted-foreground">
            <i className="fas fa-info-circle mr-1"></i>
            Downloads start immediately and work with any app or browser
          </div>
        </div>
      </div>
    </div>
  );
}
