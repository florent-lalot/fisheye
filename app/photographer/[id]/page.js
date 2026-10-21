import { notFound } from "next/navigation";
import Header from "@/app/components/Header/Header";
import PhotographerBanner from "@/app/components/PhotographerBanner/PhotographerBanner";
import MediaGallery from "@/app/components/MediaGallery/MediaGallery";
import {
  getPhotographer,
  getAllMediasForPhotographer,
} from "@/app/lib/prisma-db";
import styles from "./page.module.css";

// Lit l'id dans l'URL et récupère le photographe (null si l'id est invalide ou inconnu)
async function loadPhotographer(params) {
  const { id } = await params;
  const photographerId = Number(id);
  if (!Number.isInteger(photographerId)) return null;
  return getPhotographer(photographerId);
}

// Titre de l'onglet propre à chaque photographe (accessibilité : chaque page a un titre unique)
export async function generateMetadata({ params }) {
  const photographer = await loadPhotographer(params);
  return {
    title: photographer
      ? `${photographer.name} - FishEye`
      : "Photographe introuvable - FishEye",
  };
}

export default async function PhotographerPage({ params }) {
  const photographer = await loadPhotographer(params);
  if (!photographer) notFound();

  const medias = await getAllMediasForPhotographer(photographer.id);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <PhotographerBanner photographer={photographer} />
        <MediaGallery medias={medias} />
      </main>
    </>
  );
}
