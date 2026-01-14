export const metadata = {
  title: "About | Pokémon Dashboard",
  description: "Learn about this educational Pokémon dashboard project",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
          About This Project
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            This website was created as a performance task for the Web Programming course. Its main goal
            is to demonstrate how to fetch and render API data using{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">Next.js App Router</span>{" "}
            with Tailwind CSS.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-white">
            ✨ Features Implemented
          </h2>
          <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300">
            <li>🔍 Advanced search and filtering (by name, type, stats)</li>
            <li>🌙 Dark mode toggle with localStorage persistence</li>
            <li>📊 Interactive stats visualization with Chart.js</li>
            <li>❤️ Favorites system with localStorage</li>
            <li>⚔️ Pokémon comparison tool</li>
            <li>🎲 Random Pokémon generator</li>
            <li>📱 Fully responsive design</li>
            <li>🎨 Type effectiveness chart</li>
            <li>🔄 Pagination with "Load More" functionality</li>
            <li>⚡ Loading skeletons for better UX</li>
            <li>🛡️ Error boundaries for graceful error handling</li>
            <li>♿ Accessibility improvements (ARIA labels, keyboard navigation)</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-white">
            🎮 Pokémon Overview
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Pokémon (short for Pocket Monsters) is a popular game franchise developed by Nintendo. It
            features fictional creatures that players can collect, train, and battle. Since its debut in
            1996, Pokémon has expanded into trading cards, animation, and media worldwide.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-white">
            🔌 API Source
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            All Pokémon information displayed in this application comes from the open REST API:
            <br />
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 font-semibold"
            >
              https://pokeapi.co/
            </a>
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-white">
            ⚠️ Important Note
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            This website is intended solely for educational demonstration. No commercial usage is
            intended, and all Pokémon data & assets belong to their respective copyright owners.
          </p>

          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              🛠️ Technologies Used
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Next.js 16.1 (App Router)</li>
              <li>React 19</li>
              <li>Tailwind CSS 4</li>
              <li>Chart.js & react-chartjs-2</li>
              <li>PokéAPI (REST API)</li>
            </ul>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8 text-center">
            © {new Date().getFullYear()} Web Programming — Educational Demo Application
          </p>
        </div>
      </div>
    </div>
  );
}