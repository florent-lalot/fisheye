"use client";

import { useState } from "react";
import ContactForm from "../ContactForm/ContactForm";
import styles from "./ContactModal.module.css";

// Parent : bouton d'ouverture + state booléen qui affiche ou non la modale
export default function ContactModal({ photographerName }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.contactButton}
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
      >
        Contactez-moi
      </button>
      {isOpen && (
        <ContactForm
          photographerName={photographerName}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
