# Pokémon Dashboard

Interactive Pokédex built with Next.js App Router, Tailwind CSS v4, and Chart.js. Explore 151 Pokémon with search, filters, stats visualizations, comparisons, favorites, and a quiz.

## ✨ Features
- **Live Pokédex grid** with search, type filter, min-stats filter, sorting, favorites-only toggle, and incremental “Load More” ([`ClientWrapper`](app/components/ClientWrapper.js)).
- **Favorites system** persisted in `localStorage` via [`FavoritesManager`](app/components/FavoritesManager.js).
- **Detail pages** with sprites, flavor text, abilities, stats bars, radar chart, and type effectiveness ([`PokemonCard`](app/components/PokemonCard.js), [`TypeEffectiveness`](app/components/TypeEffectiveness.js), [`StatsChart`](app/components/StatsChart.js), [`app/pokemon/[id]/page.js`](app/pokemon/[id]/page.js)).
- **Comparison tool** for two Pokémon ([`PokemonComparison`](app/components/PokemonComparison.js), [`app/compare/page.js`](app/compare/page.js)).
- **Quiz mini-game** “Who’s That Pokémon?” with score/auto-advance ([`PokemonQuiz`](app/components/PokemonQuiz.js), [`app/quiz/page.js`](app/quiz/page.js)).
- **Hero landing + audio + navbar** with retro styling and dark-mode-ready globals ([`HeroBanner`](app/components/HeroBanner.js), [`BackgroundAudio`](app/components/BackgroundAudio.js), [`Navbar`](app/components/Navbar.js), [`app/page.js`](app/page.js), [`app/globals.css`](app/globals.css)).
- **Loading states & error boundary** ([`LoadingSkeleton`](app/components/LoadingSkeleton.js), [`app/loading.js`](app/loading.js), [`ErrorBoundary`](app/components/ErrorBoundary.js)).

## 🏗️ Project Structure
- Entry layout: [`app/layout.js`](app/layout.js)  
- Home page & data fetch: [`app/page.js`](app/page.js) with [`fetchPokemon`](app/page.js) (uses PokéAPI, `cache: "no-store"`).  
- Dynamic details: [`app/pokemon/[id]/page.js`](app/pokemon/[id]/page.js)  
- Compare: [`app/compare/page.js`](app/compare/page.js)  
- Quiz: [`app/quiz/page.js`](app/quiz/page.js)  
- Favorites: [`app/favorites/page.js`](app/favorites/page.js)  
- About: [`app/about/page.js`](app/about/page.js)  

## 🚀 Getting Started
Prerequisites: Node 18+

Install deps:
```sh
npm install
```

Run dev server:
```sh
npm run dev
```
Open http://localhost:3000.

Build:
```sh
npm run build
```

Production start:
```sh
npm run start
```

## ⚙️ Tech Stack
- Next.js 16 App Router ([`next.config.mjs`](next.config.mjs))
- React 19
- Tailwind CSS v4 ([`postcss.config.mjs`](postcss.config.mjs), [`app/globals.css`](app/globals.css))
- Chart.js + react-chartjs-2 ([`StatsChart`](app/components/StatsChart.js))
- ESLint core-web-vitals ([`eslint.config.mjs`](eslint.config.mjs))

## 📡 Data
- Pokémon data from PokéAPI (`https://pokeapi.co/api/v2/pokemon` + `pokemon-species`). Fetching happens server-side in [`fetchPokemon`](app/page.js) and per-ID in [`app/pokemon/[id]/page.js`](app/pokemon/[id]/page.js) with `cache: "no-store"`.

## ♿ UX Notes
- Smooth scroll, focus-visible outlines, retro pixel styling, scrollbar theming ([`app/globals.css`](app/globals.css)).
- Audio toggle dispatches `bg-music-toggle` custom event ([`Navbar`](app/components/Navbar.js), [`BackgroundAudio`](app/components/BackgroundAudio.js)).

## 🤝 Contributing
1) Fork and branch.  
2) `npm run dev` to develop.  
3) Add tests/linters where applicable, then open a PR.

## 📝 License
MIT (add a LICENSE file if distributing).
