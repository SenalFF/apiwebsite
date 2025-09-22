import { z } from "zod";

export const searchResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  thumbnail: z.string(),
  duration: z.string(),
  channel: z.string(),
  views: z.string(),
  publishedAt: z.string(),
});

export const videoFormatSchema = z.object({
  itag: z.number(),
  quality: z.string(),
  format: z.string(),
  size: z.string(),
  type: z.string(),
});

export const videoInfoSchema = z.object({
  title: z.string(),
  url: z.string(),
  thumbnail: z.string(),
  duration: z.string(),
  channel: z.string(),
  views: z.string(),
  publishDate: z.string(),
  description: z.string(),
  formats: z.array(videoFormatSchema),
});

export type SearchResult = z.infer<typeof searchResultSchema>;
export type VideoFormat = z.infer<typeof videoFormatSchema>;
export type VideoInfo = z.infer<typeof videoInfoSchema>;
