# 🔥 Pokémon Dashboard - Enhanced Edition

An interactive, feature-rich Pokémon dashboard built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. This educational project demonstrates modern web development techniques with full CRUD-like interactions, advanced filtering, and beautiful UI/UX.

![Pokémon Dashboard](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)

---

## ✨ Features Implemented

### 🎨 UI/UX Enhancements
- ✅ **Advanced Search** - Search by name or Pokémon ID
- ✅ **Type Filtering** - Filter by all 18 Pokémon types
- ✅ **Stats Range Filter** - Find Pokémon with minimum total stats
- ✅ **Multi-Criteria Sorting** - Sort by ID, name, HP, attack, defense, or total stats
- ✅ **Pagination** - Load Pokémon in batches with "Load More" button
- ✅ **Dark Mode** - Toggle with localStorage persistence
- ✅ **Responsive Design** - Mobile, tablet, and desktop optimized
- ✅ **Loading Skeletons** - Smooth loading states instead of spinners
- ✅ **Smooth Animations** - Hover effects, transitions, fade-ins

### 📊 Feature Additions
- ✅ **Type Effectiveness Chart** - Shows weaknesses, resistances, and immunities
- ✅ **Pokémon Comparison** - Side-by-side stat comparison (2 Pokémon)
- ✅ **Abilities Details** - Display all abilities for each Pokémon
- ✅ **Height & Weight** - Physical stats in metric units
- ✅ **Favorites/Team Builder** - Save favorite Pokémon (localStorage)
- ✅ **Stats Visualization** - Interactive radar chart with Chart.js
- ✅ **Visual Progress Bars** - Stat bars with color coding

### 🔧 Technical Improvements
- ✅ **Error Boundaries** - Graceful error handling with fallback UI
- ✅ **Client-Side Caching** - Reduces redundant API calls
- ✅ **Load More Pagination** - Progressive loading (12 per batch)
- ✅ **Image Optimization** - Next.js Image component usage
- ✅ **SEO Metadata** - Page-specific titles and descriptions
- ✅ **Accessibility** - ARIA labels, keyboard navigation, focus states
- ✅ **Type Safety** - Proper prop validation
- ✅ **Code Organization** - Modular component architecture

### 🎮 Interactive Features
- ✅ **Random Pokémon Generator** - "Surprise Me" button
- ✅ **Favorites Filter** - Toggle to show only favorites
- ✅ **Clear Filters** - Reset all filters with one click
- ✅ **Expandable Cards** - Show/hide stats and details
- ✅ **Dynamic Stats Display** - Real-time filtering and sorting
- ✅ **Favorites Counter** - Track number of favorites

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MicaelaGanas/restapi-pokedemo-ganas.git
   cd restapi-pokedemo-ganas
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
restapi-pokedemo-ganas/
├── app/
│   ├── components/
│   │   ├── ClientWrapper.js       # Main container with filtering logic
│   │   ├── PokemonCard.js         # Enhanced card with favorites
│   │   ├── SearchFilter.js        # Advanced search & filter UI
│   │   ├── DarkModeToggle.js      # Theme switcher
│   │   ├── LoadingSkeleton.js     # Loading state component
│   │   ├── FavoritesManager.js    # Favorites heart button
│   │   ├── TypeEffectiveness.js   # Type chart component
│   │   ├── RandomGenerator.js     # Random Pokémon button
│   │   ├── ErrorBoundary.js       # Error handling wrapper
│   │   ├── PokemonComparison.js   # Compare 2 Pokémon
│   │   ├── StatsChart.js          # Radar chart visualization
│   │   └── Navbar.js              # Navigation bar
│   ├── about/
│   │   └── page.js                # About page
│   ├── compare/
│   │   └── page.js                # Comparison page
│   ├── favorites/
│   │   └── page.js                # Favorites collection page
│   ├── layout.js                  # Root layout with navbar
│   ├── page.js                    # Home page (server component)
│   └── globals.css                # Global styles & animations
├── public/                         # Static assets
├── package.json                    # Dependencies
└── README.md                       # This file
```

---

## 🎯 Key Features Explained

### 1. Advanced Search & Filtering
- **Search**: Type name or ID (e.g., "pikachu" or "25")
- **Type Filter**: Select from 18 Pokémon types
- **Stats Filter**: Set minimum total stats threshold
- **Sorting**: Multiple sort options (name, stats, ID)

### 2. Dark Mode
- Toggle in navbar (sun/moon icon)
- Persists across sessions (localStorage)
- Smooth transitions between themes
- System preference detection

### 3. Favorites System
- Click heart icon on any card to favorite
- Stored in localStorage (persists)
- Dedicated favorites page (`/favorites`)
- Filter button to show favorites only

### 4. Pokémon Comparison (`/compare`)
- Enter two Pokémon names or IDs
- Visual stat comparison bars
- Side-by-side display with images
- Summary with total stats, height, weight

### 5. Type Effectiveness
- Shows what types the Pokémon is weak to
- Displays resistances
- Indicates immunities
- Based on main type

### 6. Stats Visualization
- Radar chart (when single Pokémon filtered)
- Progress bars in card view
- Total stats calculation
- Color-coded stat bars

---

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | React framework with App Router |
| React | 19.2.3 | UI library |
| Tailwind CSS | 4.0 | Utility-first CSS framework |
| Chart.js | 4.5.1 | Stats visualization |
| react-chartjs-2 | 5.3.1 | React wrapper for Chart.js |
| PokéAPI | - | REST API for Pokémon data |

---

## 📊 API Usage

This app uses the **[PokéAPI](https://pokeapi.co/)** (free, open-source REST API):

- **Endpoint**: `https://pokeapi.co/api/v2/pokemon`
- **Initial Load**: Fetches 151 Pokémon (Gen 1)
- **Random Generator**: Fetches individual Pokémon by ID
- **Comparison**: Fetches 2 Pokémon on-demand
- **Caching**: Server-side revalidation every hour

---

## 🎨 Color Scheme

### Light Mode
- Background: `#f3f4f6` (gray-100)
- Cards: `#ffffff` (white)
- Primary: `#3b82f6` (blue-600)
- Accent: `#ef4444` (red-600)

### Dark Mode
- Background: `#111827` (gray-900)
- Cards: `#1f2937` (gray-800)
- Primary: `#60a5fa` (blue-400)
- Accent: `#f87171` (red-400)

---

## ♿ Accessibility Features

- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus visible states (blue outline)
- ✅ Alt text on images
- ✅ Semantic HTML structure
- ✅ Color contrast compliance
- ✅ Screen reader friendly

---

## 🚧 Future Enhancements (Not Yet Implemented)

- [ ] Evolution Chain Display (API integration needed)
- [ ] Move List with types and power
- [ ] Mini-games (Guess the Pokémon, Type Quiz)
- [ ] Sound Effects (Pokémon cries)
- [ ] PWA Support (installable app)
- [ ] Multi-language Support (i18n)
- [ ] Battle Simulator
- [ ] Shiny Variants Toggle
- [ ] Infinite Scroll (instead of Load More)

---

## 📸 Screenshots

### Home Page (Light Mode)
- Grid of Pokémon cards
- Search & filter bar
- Random generator button

### Home Page (Dark Mode)
- Automatic theme detection
- Smooth color transitions

### Comparison Page
- Side-by-side stats
- Visual comparison bars

### Favorites Page
- Personal collection
- Heart icon toggle

---

## 📝 Educational Purpose

This project was created for **Web Programming course** to demonstrate:
- Server-side rendering (SSR) with Next.js
- Client-side interactivity with React
- REST API integration
- State management (useState, localStorage)
- Responsive design with Tailwind CSS
- Accessibility best practices
- Modern web development patterns

---

## ⚠️ Disclaimer

This is an **educational project**. All Pokémon data, names, and images are property of **Nintendo**, **Game Freak**, and **The Pokémon Company**. No commercial use is intended.

---

## 📄 License

This project is for educational purposes only. All rights to Pokémon content belong to their respective owners.

---

## 🤝 Contributing

This is a student project, but suggestions are welcome! Feel free to:
- Report bugs via GitHub Issues
- Suggest features
- Share feedback

---

## 📧 Contact

**Student**: Micaela Ganas  
**Course**: Web Programming  
**Repository**: [github.com/MicaelaGanas/restapi-pokedemo-ganas](https://github.com/MicaelaGanas/restapi-pokedemo-ganas)

---

## 🎉 Acknowledgments

- **PokéAPI** for the amazing free API
- **Next.js** team for the fantastic framework
- **Tailwind CSS** for the utility-first approach
- **Chart.js** for beautiful charts

---

**Made with ❤️ using Next.js and the PokéAPI**
