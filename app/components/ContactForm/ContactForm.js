"use client";

import { useEffect, useId, useRef } from "react";
import styles from "./ContactForm.module.css";

// Enfant : la modale (balise <dialog> native) avec le formulaire de contact
export default function ContactForm({ photographerName, onClose }) {
  const dialogRef = useRef(null);
  const id = useId();

  // Dès l'affichage : ouverture en mode modal (fond grisé, Échap, focus piégé)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
  }, []);

  // Envoi : affiche les champs dans la console (demandé par les spécifications), puis ferme
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    console.log("Formulaire de contact :", formData);
    dialogRef.current.close();
  };
  // Boucle du focus : Tab sur le dernier élément → retour au premier, Maj+Tab sur le premier → le dernier
  const handleKeyDown = (event) => {
    if (event.key !== "Tab") return;

    const focusables = dialogRef.current.querySelectorAll(
      "input, textarea, button",
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
  };
  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={`${id}-title`}
      onClose={onClose}
      onKeyDown={handleKeyDown}
    >
      <h2 id={`${id}-title`} className={styles.title}>
        Contactez-moi
        <br />
        {photographerName}
      </h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor={`${id}-firstname`} className={styles.label}>
          Prénom
        </label>
        <input
          id={`${id}-firstname`}
          name="firstName"
          type="text"
          autoComplete="given-name"
          required
          className={styles.input}
        />

        <label htmlFor={`${id}-lastname`} className={styles.label}>
          Nom
        </label>
        <input
          id={`${id}-lastname`}
          name="lastName"
          type="text"
          autoComplete="family-name"
          required
          className={styles.input}
        />

        <label htmlFor={`${id}-email`} className={styles.label}>
          Email
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          className={styles.input}
        />

        <label htmlFor={`${id}-message`} className={styles.label}>
          Votre message
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          className={`${styles.input} ${styles.textarea}`}
        />

        <button type="submit" className={styles.submitButton}>
          Envoyer
        </button>
      </form>

      {/* Placé en dernier : c'est le dernier élément du parcours au clavier (annotation ⑫) */}
      <button
        type="button"
        className={styles.closeButton}
        aria-label="Fermer le formulaire de contact"
        onClick={() => dialogRef.current.close()}
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
        >
          <path d="M5 5l14 14M19 5L5 19" />
        </svg>
      </button>
    </dialog>
  );
}
