import Image from "next/image";
import styles from "./Portrait.module.css";

// Portrait rond + léger débordement de la photo autour du cercle (opacité très réduite)
export default function Portrait({ src, alt }) {
  return (
    <span className={styles.portrait}>
      {/* Couche décorative qui dépasse du cercle : ignorée par les lecteurs d'écran */}
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        width={200}
        height={200}
        loading="eager"
        className={styles.overflow}
      />
      <span className={styles.frame}>
        <Image
          src={src}
          alt={alt}
          width={200}
          height={200}
          loading="eager"
          className={styles.photo}
        />
      </span>
    </span>
  );
}
