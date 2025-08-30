# SoloNomad

An AI-powered, agentic travel companion (PWA) using the **Foursquare Places API** and **Goggle Gemini**.

## Features
- Find nearby places (`/places/search`)
- Fetch rich details for selected places (`/places/{fsq_id}`)
- Planner & Challenge agents powered by Gemini
- PWA with basic offline cache
- Vite + React + TailwindCSS

## Getting Started
```bash
npm install
npm run dev
```

### Environment Variables
Create a `.env` file at project root:
```
VITE_FSQ_API_KEY=your_key_here
VITE_GEMINI_API_KEY=your_key_here
```

> **Note:** For FSQ, use the *token* value directly as the `Authorization` header.

## Build & Deploy
```bash
npm run build
npm run preview
```
Deploy the `dist/` folder to Vercel. Add the same env vars in Vercel Project Settings.

## Submission Notes
- **Endpoints used:** `/places/search`, `/places/{fsq_id}`
- **Most useful data:** name, categories, address, distance, website
- **End user:** Solo travelers seeking contextual, safe, and engaging exploration
- **Improvements:** Offline maps, AR overlays, geo-fenced safety, social discovery
