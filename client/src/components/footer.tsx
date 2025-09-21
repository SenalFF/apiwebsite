export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <i className="fas fa-play-circle text-accent text-xl"></i>
            <span className="font-medium text-foreground">YouTube Downloader API</span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Developer: Mr Senal</span>
            <span>•</span>
            <span>Node.js + Express.js</span>
            <span>•</span>
            <span>ytdl-core + ytsr</span>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Built with Express.js, CORS support, and organized folder structure. Supports video search, quality selection, and direct downloads.
          </p>
        </div>
      </div>
    </footer>
  );
}
