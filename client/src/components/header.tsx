export default function Header() {
  return (
    <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <i className="fas fa-play-circle text-accent text-2xl"></i>
            <h1 className="text-xl font-bold text-foreground">YouTube Downloader API</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Developer: Mr Senal</span>
          </div>
        </div>
      </div>
    </header>
  );
}
