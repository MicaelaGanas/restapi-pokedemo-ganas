import LoadingSkeleton from "./components/LoadingSkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-red-500 border-8 border-black pixel-shadow p-6 text-center">
          <h1 className="pixel-font text-3xl md:text-4xl text-yellow-400 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
            ⏳ Loading Pokédex...
          </h1>
          <p className="font-bold text-white mt-2">Fetching Pokémon data</p>
        </div>
        <LoadingSkeleton count={8} />
      </div>
    </main>
  );
}
