import Link from "next/link";
import Header from "@/app/components/Header/Header";

// Page affichée quand l'URL ne correspond à aucune page (erreur 404)
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="status-page">
        <p className="status-code" aria-hidden="true">
          404
        </p>
        <h1 className="status-title">Page introuvable</h1>
        <p className="status-message">
          Oups ! La page que vous cherchez n’existe pas.
        </p>
        <Link href="/" className="status-button">
          Retour à l’accueil
        </Link>
      </main>
    </>
  );
}
