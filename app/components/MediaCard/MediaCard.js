import Image from "next/image";
import styles from "./MediaCard.module.css";

// Carte d'un média : photo ou miniature de vidéo (bouton qui ouvre la lightbox), titre et likes
export default function MediaCard({ media, isAboveFold, onOpen }) {
  const { title, image, video, likes } = media;

  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.frame}
        aria-label={`${title}, vue rapprochée`}
        onClick={onOpen}
      >
        {image ? (
          <Image
            src={`/${image}`}
            alt={title}
            fill
            sizes="(max-width: 1200px) 33vw, 350px"
            loading={isAboveFold ? "eager" : "lazy"}
            className={styles.media}
          />
        ) : (
          <video
            src={`/${video}#t=0.1`}
            preload="metadata"
            muted
            aria-label={title}
            className={styles.media}
          />
        )}
      </button>
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <p className={styles.likes}>
          {likes}
          <svg
            role="img"
            aria-label="likes"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            fill="currentColor"
          >
            <path d="M12 21s-7.5-4.6-10-9.3C.4 8.3 2.3 4 6.3 4c2.3 0 3.8 1.3 4.7 2.6h2c.9-1.3 2.4-2.6 4.7-2.6 4 0 5.9 4.3 4.3 7.7C19.5 16.4 12 21 12 21z" />
          </svg>
        </p>
      </div>
    </article>
  );
}
