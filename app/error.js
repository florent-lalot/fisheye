"use client";

// Affiché automatiquement par Next.js si une erreur survient pendant le chargement d'une page
export default function Error({ reset }) {
  return (
    <main className="status-page">
      <h1 className="status-title">Une erreur est survenue</h1>
      <p className="status-message">
        Impossible de charger la page. Veuillez réessayer.
      </p>
      <button type="button" className="status-button" onClick={() => reset()}>
        Réessayer
      </button>
    </main>
  );
}
