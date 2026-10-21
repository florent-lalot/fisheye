"use client";

import { useState } from "react";
import MediaCard from "../MediaCard/MediaCard";
import Lightbox from "../Lightbox/Lightbox";
import styles from "./MediaGallery.module.css";

// Galerie des réalisations + gestion de la lightbox (quel média est ouvert)
export default function MediaGallery({ medias }) {
  // null = lightbox fermée ; un nombre = position du média ouvert
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section aria-labelledby="gallery-title">
      <h2 id="gallery-title" className="sr-only">
        Réalisations
      </h2>
      <ul className={styles.gallery}>
        {medias.map((media, index) => (
          <li key={media.id} className={styles.item}>
            <MediaCard
              media={media}
              isAboveFold={index < 3}
              onOpen={() => setOpenIndex(index)}
            />
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <Lightbox
          medias={medias}
          startIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}
