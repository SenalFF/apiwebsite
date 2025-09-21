import { type SearchResult, type VideoInfo } from "@shared/schema";

export interface IStorage {
  // Cache search results
  cacheSearchResults(query: string, results: SearchResult[]): Promise<void>;
  getCachedSearchResults(query: string): Promise<SearchResult[] | undefined>;
  
  // Cache video info
  cacheVideoInfo(url: string, info: VideoInfo): Promise<void>;
  getCachedVideoInfo(url: string): Promise<VideoInfo | undefined>;
}

export class MemStorage implements IStorage {
  private searchCache: Map<string, { results: SearchResult[], timestamp: number }>;
  private videoCache: Map<string, { info: VideoInfo, timestamp: number }>;
  private readonly CACHE_TTL = 3600000; // 1 hour

  constructor() {
    this.searchCache = new Map();
    this.videoCache = new Map();
  }

  async cacheSearchResults(query: string, results: SearchResult[]): Promise<void> {
    this.searchCache.set(query.toLowerCase(), {
      results,
      timestamp: Date.now()
    });
  }

  async getCachedSearchResults(query: string): Promise<SearchResult[] | undefined> {
    const cached = this.searchCache.get(query.toLowerCase());
    if (!cached) return undefined;
    
    if (Date.now() - cached.timestamp > this.CACHE_TTL) {
      this.searchCache.delete(query.toLowerCase());
      return undefined;
    }
    
    return cached.results;
  }

  async cacheVideoInfo(url: string, info: VideoInfo): Promise<void> {
    this.videoCache.set(url, {
      info,
      timestamp: Date.now()
    });
  }

  async getCachedVideoInfo(url: string): Promise<VideoInfo | undefined> {
    const cached = this.videoCache.get(url);
    if (!cached) return undefined;
    
    if (Date.now() - cached.timestamp > this.CACHE_TTL) {
      this.videoCache.delete(url);
      return undefined;
    }
    
    return cached.info;
  }
}

export const storage = new MemStorage();
