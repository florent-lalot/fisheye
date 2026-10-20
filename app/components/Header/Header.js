import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

// En-tête commun : logo cliquable + titre de la page (h1) optionnel
export default function Header({ title }) {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/logo.png"
          alt="FishEye, page d'accueil"
          width={200}
          height={50}
          priority
        />
      </Link>
      {title && <h1 className={styles.title}>{title}</h1>}
    </header>
  );
}
