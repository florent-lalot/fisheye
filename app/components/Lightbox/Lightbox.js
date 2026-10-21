"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "../Modal/Modal";
import styles from "./Lightbox.module.css";

// Lightbox : affiche un média en grand, navigation par boutons et flèches du clavier
export default function Lightbox({ medias, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const media = medias[index];

  // Navigation en boucle : après le dernier média, on revient au premier (et inversement)
  const showPrevious = () =>
    setIndex((current) => (current - 1 + medias.length) % medias.length);
  const showNext = () => setIndex((current) => (current + 1) % medias.length);

  // Flèches du clavier (KeyboardEvent.key, comme demandé par les spécifications)
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  };

  return (
    <Modal
      onClose={onClose}
      ariaLabel="Vue rapprochée du média"
      className={styles.lightbox}
      closeLabel="Fermer la vue rapprochée"
      closeClassName={styles.closeButton}
      onKeyDown={handleKeyDown}
    >
      <figure className={styles.figure}>
        <div className={styles.frame}>
          {media.image ? (
            <Image
              src={`/${media.image}`}
              alt={media.title}
              fill
              sizes="80vw"
              loading="eager"
              className={styles.media}
            />
          ) : (
            <video
              key={media.id}
              src={`/${media.video}`}
              controls
              aria-label={media.title}
              className={styles.media}
            />
          )}
        </div>
        <figcaption className={styles.title} aria-live="polite">
          {media.title}
        </figcaption>
      </figure>

      <button
        type="button"
        className={`${styles.navButton} ${styles.previous}`}
        aria-label="Média précédent"
        onClick={showPrevious}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 4l-8 8 8 8" />
        </svg>
      </button>

      <button
        type="button"
        className={`${styles.navButton} ${styles.next}`}
        aria-label="Média suivant"
        onClick={showNext}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 4l8 8-8 8" />
        </svg>
      </button>
    </Modal>
  );
}
