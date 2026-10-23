import Image from "next/image";
import styles from "./PhotographerBanner.module.css";
import ContactModal from "../ContactModal/ContactModal";
import Portrait from "../Portrait/Portrait";

// Bandeau du photographe : infos, bouton de contact (actif plus tard) et portrait
export default function PhotographerBanner({ photographer }) {
  const { name, city, country, tagline, portrait } = photographer;

  return (
    <section className={styles.banner}>
      <div>
        <h1 className={styles.name} tabIndex={0}>
          {name}
        </h1>
        <div tabIndex={0}>
          <p className={styles.location}>
            {city}, {country}
          </p>
          <p className={styles.tagline}>{tagline}</p>
        </div>
      </div>
      <ContactModal photographerName={name} />
      <Portrait src={`/${portrait}`} alt={name} />
    </section>
  );
}
