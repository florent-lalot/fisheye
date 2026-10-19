import { getAllPhotographers } from "@/app/lib/prisma-db";

// Server Component : il s'exécute côté serveur, donc il peut lire la base directement
export default async function Home() {
  const photographers = await getAllPhotographers();

  return (
    <main>
      <h1>Test BDD</h1>
      <ul>
        {photographers.map((photographer) => (
          <li key={photographer.id}>{photographer.name}</li>
        ))}
      </ul>
    </main>
  );
}
