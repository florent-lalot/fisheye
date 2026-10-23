"use client";

import { useState } from "react";
import MediaCard from "../MediaCard/MediaCard";
import Lightbox from "../Lightbox/Lightbox";
import LikesSummary from "../LikesSummary/LikesSummary";
import SortSelect from "../SortSelect/SortSelect";
import { saveLikes } from "@/app/lib/actions";
import { sortMedias } from "@/app/lib/sortMedias";
import styles from "./MediaGallery.module.css";

// Galerie : tri, likes, lightbox et encart du total
export default function MediaGallery({ medias, price }) {
  const [sortBy, setSortBy] = useState("popularity");
  // Médias triés par popularité au départ, avec l'info "liké ou non"
  const [items, setItems] = useState(() =>
    sortMedias(
      medias.map((media) => ({ ...media, liked: false })),
      "popularity",
    ),
  );
  const [openIndex, setOpenIndex] = useState(null);
  const [likeError, setLikeError] = useState(false);

  const totalLikes = items.reduce((sum, media) => sum + media.likes, 0);

  // Changement de tri : on réordonne la liste
  const handleSortChange = (value) => {
    setSortBy(value);
    setItems((current) => sortMedias(current, value));
  };

  // Remet un média dans un état donné (utilisé pour le like et pour l'annulation)
  const updateMedia = (mediaId, likes, liked) => {
    setItems((current) =>
      current.map((item) =>
        item.id === mediaId ? { ...item, likes, liked } : item,
      ),
    );
  };

  // Like / unlike : affichage mis à jour tout de suite, puis enregistrement en base.
  // En cas d'échec : on annule et on prévient l'utilisateur.
  const handleLike = async (mediaId) => {
    const media = items.find((item) => item.id === mediaId);
    const newLikes = media.liked ? media.likes - 1 : media.likes + 1;

    updateMedia(mediaId, newLikes, !media.liked);

    try {
      await saveLikes(mediaId, newLikes);
      setLikeError(false);
    } catch {
      updateMedia(mediaId, media.likes, media.liked);
      setLikeError(true);
    }
  };

  return (
    <section aria-labelledby="gallery-title">
      <h2 id="gallery-title" className="sr-only">
        Réalisations
      </h2>

      <SortSelect value={sortBy} onChange={handleSortChange} />

      {likeError && (
        <p role="alert" className={styles.error}>
          Votre like n’a pas pu être enregistré. Veuillez réessayer.
        </p>
      )}

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
