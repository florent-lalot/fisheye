import styles from "./loading.module.css";

// Affiché automatiquement par Next.js pendant le chargement d'une page
export default function Loading() {
  return (
    <div className={styles.loading} role="status">
      <span className={styles.spinner} aria-hidden="true" />
      <p>Chargement…</p>
    </div>
  );
}
