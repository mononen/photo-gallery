# Photo Gallery Website

A modern, responsive photo gallery website built with Next.js and Material UI that displays photography events with Google Photos album links. Content is managed through markdown files.

## Features

- 📸 Display events with Google Photos album links
- 🎨 Modern, responsive design with Material UI
- 🔍 Filter events by type, year, and search
- 📅 Sort events by date (newest/oldest first)
- 🖼️ Thumbnail previews with background styling
- 📝 Content managed via markdown files

## Getting Started

### Using Docker (Recommended)

1. **Development:**
   ```bash
   docker-compose up
   ```
   The app will be available at `http://localhost:3000`

2. **Production Build:**
   ```bash
   docker build --target production -t photo-gallery .
   docker run -p 3000:3000 photo-gallery
   ```

### Local Development (without Docker)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Content Management

Events are managed through markdown files in the `content/events/` directory. Each event should be a separate `.md` file with YAML frontmatter.

### Markdown File Format

Create a new file in `content/events/` with the following structure:

```yaml
---
title: "Event Name"
date: "2024-01-15"
description: "Event description"
albums:
  - name: "Album 1"
    url: "https://photos.app.goo.gl/..."
  - name: "Album 2"
    url: "https://photos.app.goo.gl/..."
thumbnails:
  - url: "https://photos.app.goo.gl/..."
  - url: "https://photos.app.goo.gl/..."
---
Optional markdown content for additional details.
```

### Fields

- **title**: Event name (required)
- **date**: Event date in YYYY-MM-DD format (required)
- **description**: Short description of the event (required)
- **albums**: Array of album objects with `name` and `url` (required)
- **thumbnails**: Array of thumbnail objects with `url` (optional, but recommended)
- **highlightUntil**: Date in YYYY-MM-DD format (optional). Until this date, the event is also shown in a highlighted slot right after the most recent event (before the About Me section), in addition to its normal chronological position. It's removed from the slot on this date. The page re-renders hourly, so no redeploy is needed.
- **Content**: Optional markdown content below the frontmatter

The most recent event is automatically marked with a "Latest" flag; no frontmatter is needed.

### Event Type Filtering

Event types are automatically inferred from event names. For example:
- "Wedding 2024" → "Wedding"
- "Concert 2023" → "Concert"
- "Birthday Party - 2024" → "Birthday Party"

The system removes years and common suffixes to group similar events together.

## Project Structure

```
photo-gallery/
├── content/
│   └── events/          # Markdown files for events
├── src/
│   ├── app/             # Next.js app router pages
│   ├── components/      # React components
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript type definitions
├── Dockerfile           # Multi-stage Docker build
└── docker-compose.yml   # Docker Compose for development
```

## Technologies

- **Next.js 14+**: React framework with SSR
- **Material UI**: Component library
- **TypeScript**: Type safety
- **gray-matter**: Markdown frontmatter parsing
- **remark**: Markdown processing

## Docker

The project includes a multi-stage Dockerfile:
- **Development**: Hot reload with volume mounts
- **Build**: Production build
- **Production**: Optimized standalone output

## License

MIT

