"use client";

import { useId } from "react";
import Modal from "../Modal/Modal";
import styles from "./ContactForm.module.css";

// Modale de contact : utilise la modale générique, ne contient que le formulaire
export default function ContactForm({ photographerName, onClose }) {
  const id = useId();

  // Affiche les champs dans la console (demandé par les spécifications).
  // method="dialog" : le formulaire ferme la modale tout seul après l'envoi.
  const handleSubmit = (event) => {
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    console.log("Formulaire de contact :", formData);
  };

  return (
    <Modal
      onClose={onClose}
      labelledBy={`${id}-title`}
      className={styles.dialog}
      closeLabel="Fermer le formulaire de contact"
      closeClassName={styles.closeButton}
    >
      <h2 id={`${id}-title`} className={styles.title}>
        Contactez-moi
        <br />
        {photographerName}
      </h2>

      <form method="dialog" className={styles.form} onSubmit={handleSubmit}>
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
    </Modal>
  );
}
