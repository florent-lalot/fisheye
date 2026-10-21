import Image from "next/image";
import styles from "./PhotographerBanner.module.css";
import ContactModal from "../ContactModal/ContactModal";

// Bandeau du photographe : infos, bouton de contact (actif plus tard) et portrait
export default function PhotographerBanner({ photographer }) {
  const { name, city, country, tagline, portrait } = photographer;

  return (
    <section className={styles.banner}>
      <div>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.location}>
          {city}, {country}
        </p>
        <p className={styles.tagline}>{tagline}</p>
      </div>
      <ContactModal photographerName={name} />
      <span className={styles.portraitFrame}>
        <Image
          src={`/${portrait}`}
          alt={name}
          width={200}
          height={200}
          loading="eager"
          className={styles.portrait}
        />
      </span>
    </section>
  );
}
