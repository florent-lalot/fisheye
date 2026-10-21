"use client";

import { useEffect, useId, useRef, useState } from "react";
import { SORT_OPTIONS } from "@/app/lib/sortMedias";
import styles from "./SortSelect.module.css";

// Chevron décoratif (vers le bas, ou vers le haut si "up")
function Chevron({ up = false }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={up ? "M6 15l6-6 6 6" : "M6 9l6 6 6-6"} />
    </svg>
  );
}

// Menu déroulant de tri accessible (modèle ARIA "listbox")
export default function SortSelect({ value, onChange }) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRef = useRef(null);
  const listboxRef = useRef(null);

  // Ordre affiché : l'option choisie en premier, puis les autres (comme la maquette)
  const selected = SORT_OPTIONS.find((option) => option.value === value);
  const options = [
    selected,
    ...SORT_OPTIONS.filter((option) => option.value !== value),
  ];

  // À l'ouverture : le focus va dans la liste
  useEffect(() => {
    if (isOpen) listboxRef.current.focus();
  }, [isOpen]);

  const open = () => {
    setActiveIndex(0);
    setIsOpen(true);
  };

  const close = (returnFocus = true) => {
    setIsOpen(false);
    if (returnFocus) buttonRef.current.focus();
  };

  const choose = (option) => {
    onChange(option.value);
    close();
  };

  // Clavier sur le bouton fermé : les flèches ouvrent aussi le menu
  const handleButtonKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      open();
    }
  };

  // Clavier dans la liste ouverte
  const handleListKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, options.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        choose(options[activeIndex]);
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "Tab":
        close(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.sort}>
      <span id={`${id}-label`} className={styles.label}>
        Trier par
      </span>

      <div className={styles.dropdown}>
        <button
          ref={buttonRef}
          id={`${id}-button`}
          type="button"
          className={styles.button}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={`${id}-label ${id}-button`}
          onClick={open}
          onKeyDown={handleButtonKeyDown}
        >
          {selected.label}
          <Chevron />
        </button>

        {isOpen && (
          <ul
            ref={listboxRef}
            role="listbox"
            tabIndex={-1}
            aria-labelledby={`${id}-label`}
            aria-activedescendant={`${id}-${options[activeIndex].value}`}
            className={styles.listbox}
            onKeyDown={handleListKeyDown}
            onBlur={() => close(false)}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                id={`${id}-${option.value}`}
                role="option"
                aria-selected={option.value === value}
                className={`${styles.option} ${index === activeIndex ? styles.active : ""}`}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => choose(option)}
              >
                {option.label}
                {index === 0 && <Chevron up />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
