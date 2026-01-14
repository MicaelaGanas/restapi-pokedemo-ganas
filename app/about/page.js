export const metadata = {
  title: "About | Pokémon Dashboard",
  description: "Learn about this educational Pokémon dashboard project",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white border-8 border-black pixel-shadow p-8">
          <h1 className="pixel-font text-4xl mb-8 text-gray-900">
            About This Project
          </h1>

          <div className="space-y-6 text-gray-900">
            <div className="border-l-8 border-red-600 bg-yellow-50 p-6">
              <p className="text-lg font-bold mb-2">
                This website was created as a performance task for Web Programming. It demonstrates
                how to fetch and render API data using <span className="text-red-600">Next.js App Router</span> with Tailwind CSS.
              </p>
            </div>

            <div>
              <h2 className="pixel-font text-2xl mb-4 text-gray-900">
                ✨ Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="border-4 border-black bg-yellow-100 p-3 font-bold">🔍 Advanced Search</div>
                <div className="border-4 border-black bg-blue-100 p-3 font-bold">❤️ Favorites System</div>
                <div className="border-4 border-black bg-purple-100 p-3 font-bold">📊 Stats Charts</div>
                <div className="border-4 border-black bg-green-100 p-3 font-bold">⚔️ Comparison Tool</div>
                <div className="border-4 border-black bg-orange-100 p-3 font-bold">🎮 Quiz Game</div>
                <div className="border-4 border-black bg-pink-100 p-3 font-bold">📱 Responsive Design</div>
              </div>
            </div>

            <div className="border-4 border-black bg-blue-100 p-6">
              <h2 className="pixel-font text-2xl mb-4 text-gray-900">🎮 Pokémon</h2>
              <p className="font-bold text-gray-800">
                Pokémon (Pocket Monsters) is a popular franchise developed by Nintendo. It features fictional creatures that players can collect, train, and battle since its debut in 1996.
              </p>
            </div>

            <div className="border-4 border-black bg-red-100 p-6">
              <h2 className="pixel-font text-2xl mb-4 text-gray-900">🔌 API Source</h2>
              <p className="font-bold text-gray-800 mb-2">
                Data is fetched from the free and publicly available
              </p>
              <a href="https://pokeapi.co/" className="retro-button bg-red-500 text-white px-4 py-2 inline-block font-bold">
                PokéAPI
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}