"use client";

import styles from "./not-found.module.css";

// Affiché automatiquement par Next.js si une erreur survient pendant le chargement d'une page
export default function Error({ reset }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Une erreur est survenue</h1>
      <p className={styles.message}>
        Impossible de charger la page. Veuillez réessayer.
      </p>
      <button type="button" className={styles.button} onClick={() => reset()}>
        Réessayer
      </button>
    </main>
  );
}
