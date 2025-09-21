import { VideoInfo as VideoInfoType } from "@shared/schema";

interface VideoInfoProps {
  videoInfo: VideoInfoType;
}

export default function VideoInfoComponent({ videoInfo }: VideoInfoProps) {
  return (
    <div>
      <img 
        src={videoInfo.thumbnail} 
        alt={videoInfo.title}
        className="w-full aspect-video object-cover rounded-md mb-4"
        data-testid="img-video-thumbnail"
      />
      
      <h2 
        className="text-2xl font-bold text-foreground mb-3"
        data-testid="text-video-title"
      >
        {videoInfo.title}
      </h2>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Channel:</span>
          <span className="font-medium" data-testid="text-video-channel">
            {videoInfo.channel}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Duration:</span>
          <span className="font-medium" data-testid="text-video-duration">
            {videoInfo.duration}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Views:</span>
          <span className="font-medium" data-testid="text-video-views">
            {videoInfo.views}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Upload Date:</span>
          <span className="font-medium" data-testid="text-video-date">
            {videoInfo.publishDate}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-foreground mb-3">Description</h3>
        <p 
          className="text-muted-foreground text-sm leading-relaxed max-h-32 overflow-y-auto"
          data-testid="text-video-description"
        >
          {videoInfo.description}
        </p>
      </div>
    </div>
  );
}
