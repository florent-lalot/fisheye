import MediaCard from "../MediaCard/MediaCard";
import styles from "./MediaGallery.module.css";

// Galerie des réalisations du photographe
export default function MediaGallery({ medias }) {
  return (
    <section aria-labelledby="gallery-title">
      <h2 id="gallery-title" className="sr-only">
        Réalisations
      </h2>
      <ul className={styles.gallery}>
        {medias.map((media, index) => (
          <li key={media.id} className={styles.item}>
            <MediaCard media={media} isAboveFold={index < 3} />
          </li>
        ))}
      </ul>
    </section>
  );
}
