import Link from "next/link";
import Header from "@/app/components/Header/Header";
import styles from "./not-found.module.css";

// Page affichée quand l'URL ne correspond à aucune page (erreur 404)
export default function NotFound() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <h1 className={styles.title}>Page introuvable</h1>
        <p className={styles.message}>
          Oups ! La page que vous cherchez n’existe pas.
        </p>
        <Link href="/" className={styles.button}>
          Retour à l’accueil
        </Link>
      </main>
    </>
  );
}
