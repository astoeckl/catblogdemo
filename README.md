# The Cat Blog

A modern, responsive blog application showcasing fascinating stories, knowledge, and inspiration about cats. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Responsive Grid Layout** - Automatically adapts to mobile, tablet, and desktop screens
- **Dynamic Content Loading** - Fetches blog posts from a remote CMS API
- **Interactive Post Cards** - Beautiful card design with hover effects and animations
- **Full-Screen Modal View** - Click any post to read the full article in a modal
- **Markdown Support** - Rich text formatting with custom markdown parser
- **Modern Design** - Clean, professional interface with smooth transitions
- **Loading States** - Elegant loading indicators and error handling

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd project
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

## Project Structure

```
src/
├── components/
│   ├── BlogHeader.tsx       # Header component with logo and title
│   ├── BlogPost.tsx         # Individual blog post card
│   ├── BlogPostModal.tsx    # Full-screen modal for reading posts
│   └── ReactMarkdown.tsx    # Custom markdown renderer
├── services/
│   └── api.ts              # API service for fetching blog posts
├── App.tsx                 # Main application component
└── main.tsx               # Application entry point
```

## API Integration

The blog fetches content from the cognitor.dev CMS:

**Endpoint:** `https://backend.cognitor.dev/public{siteselector}/elements`

**Parameters:**
- `type` - Content type filter
- `limit` - Number of posts to fetch (default: 10)
- `skip` - Number of posts to skip (default: 0)

## Customization

### Changing the Blog Title

Edit the `BlogHeader.tsx` component to update the title and tagline.

### Styling

The project uses Tailwind CSS. Customize colors, spacing, and other design tokens in `tailwind.config.js`.

### API Source

Update the API endpoint in `src/services/api.ts` to fetch content from a different source.

## Building for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist/` directory.

## License

This project is private and not licensed for public use.

## Contributing

This is a private project. Contact the repository owner for contribution guidelines.
