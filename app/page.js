import Header from "@/app/components/Header/Header";
import PhotographerList from "@/app/components/PhotographerList/PhotographerList";
import { getAllPhotographers } from "@/app/lib/prisma-db";

// Page d'accueil : récupère les photographes côté serveur et les transmet à la liste
export default async function Home() {
  const photographers = await getAllPhotographers();

  return (
    <>
      <Header title="Nos photographes" />
      <main>
        <PhotographerList photographers={photographers} />
      </main>
    </>
  );
}
