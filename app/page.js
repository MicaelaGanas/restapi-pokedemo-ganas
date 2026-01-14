import ClientWrapper from "./components/ClientWrapper";
import ErrorBoundary from "./components/ErrorBoundary";
import HeroBanner from "./components/HeroBanner";

export const dynamic = "force-dynamic";

async function fetchPokemon(limit = 151) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`, {
    cache: "no-store"
  });
  const list = await res.json();

  const detailed = await Promise.all(
    list.results.map(async (p) => {
      const res = await fetch(p.url);
      return res.json();
    })
  );

  return detailed;
}

export const metadata = {
  title: "Pokémon Dashboard | Explore & Discover",
  description: "Interactive Pokémon dashboard with search, filter, and stats visualization",
};

export default async function Page() {
  const data = await fetchPokemon(151); // Fetch first generation

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <HeroBanner />
          <ClientWrapper data={data} />
        </div>
      </main>
    </ErrorBoundary>
  );
}