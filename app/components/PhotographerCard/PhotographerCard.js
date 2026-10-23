import Image from "next/image";
import Link from "next/link";
import styles from "./PhotographerCard.module.css";
import Portrait from "../Portrait/Portrait";

// Carte d'un photographe : la zone cliquable contient le portrait et le nom
export default function PhotographerCard({ photographer }) {
  const { id, name, city, country, tagline, price, portrait } = photographer;

  return (
    <article className={styles.card}>
      <Link href={`/photographer/${id}`} className={styles.link}>
        <Portrait src={`/${portrait}`} alt="" />
        <h2 className={styles.name}>{name}</h2>
      </Link>
      <p className={styles.location}>
        {city}, {country}
      </p>
      <p className={styles.tagline}>{tagline}</p>
      <p className={styles.price}>{price}€/jour</p>
    </article>
  );
}
