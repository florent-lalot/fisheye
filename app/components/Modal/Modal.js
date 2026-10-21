"use client";

import { useEffect, useRef } from "react";

// Modale générique (balise <dialog> native) : ouverture, Échap, focus en boucle, croix.
// Le contenu (children) et le style (className) sont fournis par le composant qui l'utilise.
export default function Modal({
  onClose,
  labelledBy,
  ariaLabel,
  className,
  closeLabel,
  closeClassName,
  onKeyDown,
  children,
}) {
  const dialogRef = useRef(null);

  // Dès l'affichage : ouverture en mode modal
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
  }, []);

  const handleKeyDown = (event) => {
    // Touches propres au composant parent (ex. : flèches de la lightbox)
    onKeyDown?.(event);

    // Boucle du focus : Tab sur le dernier élément → premier, Maj+Tab sur le premier → dernier
    if (event.key !== "Tab") return;
    const focusables = dialogRef.current.querySelectorAll(
      "button, input, textarea, video[controls]",
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
      className={className}
      aria-labelledby={labelledBy}
      aria-label={ariaLabel}
      onClose={onClose}
      onKeyDown={handleKeyDown}
    >
      {children}

      {/* Croix placée en dernier : dernier élément du parcours au clavier */}
      <button
        type="button"
        className={closeClassName}
        aria-label={closeLabel}
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
