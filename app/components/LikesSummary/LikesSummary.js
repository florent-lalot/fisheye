import styles from "./LikesSummary.module.css";

// Encart fixe en bas de page : total des likes du photographe et prix par jour
export default function LikesSummary({ totalLikes, price }) {
  return (
    <aside className={styles.summary} aria-label="Statistiques du photographe">
      <p className={styles.likes}>
        {totalLikes.toLocaleString("fr-FR")}
        <svg
          role="img"
          aria-label="likes au total"
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          fill="currentColor"
        >
          <path d="M12 21s-7.5-4.6-10-9.3C.4 8.3 2.3 4 6.3 4c2.3 0 3.8 1.3 4.7 2.6h2c.9-1.3 2.4-2.6 4.7-2.6 4 0 5.9 4.3 4.3 7.7C19.5 16.4 12 21 12 21z" />
        </svg>
      </p>
      <p>{price}€ / jour</p>
    </aside>
  );
}
