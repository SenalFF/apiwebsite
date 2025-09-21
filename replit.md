# YouTube Downloader API

## Overview

This is a full-stack YouTube video downloader application built with Node.js/Express backend and React frontend. The application allows users to search for YouTube videos and download them in various quality formats. It features a modern UI built with shadcn/ui components and uses TypeScript throughout for type safety.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod for validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with endpoints for search and video info
- **Development**: Hot reload with Vite integration for full-stack development
- **Error Handling**: Centralized error handling middleware
- **Request Logging**: Custom middleware for API request logging

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM configured
- **Caching**: In-memory caching system with TTL for search results and video info
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **Schema Definition**: Shared Zod schemas for type-safe data validation

### Core Features
- **YouTube Integration**: Uses ytdl-core for video downloads and ytsr for search
- **Video Search**: Search YouTube videos with caching to improve performance
- **Video Information**: Fetch detailed video metadata including available formats
- **Download Options**: Multiple quality options for video downloads
- **Responsive Design**: Mobile-first responsive UI with proper breakpoints

### Development Environment
- **Replit Integration**: Custom plugins for development banners and error overlays
- **Hot Module Replacement**: Vite HMR for fast development iterations
- **TypeScript**: Strict type checking across client, server, and shared code
- **Path Aliases**: Configured aliases for clean imports (@/, @shared/, etc.)

## External Dependencies

### Core Libraries
- **ytdl-core**: YouTube video downloading functionality
- **ytsr**: YouTube search API integration
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-orm**: Type-safe ORM for database operations

### UI Framework
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for component styling
- **cmdk**: Command menu component

### Development Tools
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production builds

### Utilities
- **zod**: Schema validation and type inference
- **date-fns**: Date manipulation utilities
- **clsx**: Conditional CSS class composition
- **nanoid**: URL-safe unique ID generator