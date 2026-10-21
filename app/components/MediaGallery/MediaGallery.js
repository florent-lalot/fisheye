"use client";

import { useState } from "react";
import MediaCard from "../MediaCard/MediaCard";
import Lightbox from "../Lightbox/Lightbox";
import LikesSummary from "../LikesSummary/LikesSummary";
import { saveLikes } from "@/app/lib/actions";
import styles from "./MediaGallery.module.css";

// Galerie : gère les likes (state), la lightbox et l'encart du total
export default function MediaGallery({ medias, price }) {
  // Copie modifiable des médias, avec pour chacun l'info "liké ou non" par l'utilisateur
  const [items, setItems] = useState(() =>
    medias.map((media) => ({ ...media, liked: false })),
  );
  const [openIndex, setOpenIndex] = useState(null);

  // Total des likes = somme des likes de chaque média
  const totalLikes = items.reduce((sum, media) => sum + media.likes, 0);

  // Like / unlike : affichage mis à jour tout de suite, puis enregistrement en base
  const handleLike = async (mediaId) => {
    const media = items.find((item) => item.id === mediaId);
    const newLikes = media.liked ? media.likes - 1 : media.likes + 1;

    setItems((current) =>
      current.map((item) =>
        item.id === mediaId
          ? { ...item, likes: newLikes, liked: !item.liked }
          : item,
      ),
    );
    await saveLikes(mediaId, newLikes);
  };

  return (
    <section aria-labelledby="gallery-title">
      <h2 id="gallery-title" className="sr-only">
        Réalisations
      </h2>
      <ul className={styles.gallery}>
        {items.map((media, index) => (
          <li key={media.id} className={styles.item}>
            <MediaCard
              media={media}
              isAboveFold={index < 3}
              onOpen={() => setOpenIndex(index)}
              onLike={() => handleLike(media.id)}
            />
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <Lightbox
          medias={items}
          startIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}

      <LikesSummary totalLikes={totalLikes} price={price} />
    </section>
  );
}
