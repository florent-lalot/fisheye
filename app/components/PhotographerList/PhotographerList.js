import PhotographerCard from "../PhotographerCard/PhotographerCard";
import styles from "./PhotographerList.module.css";

// Liste des photographes : une carte par photographe
export default function PhotographerList({ photographers }) {
  return (
    <ul className={styles.list}>
      {photographers.map((photographer) => (
        <li key={photographer.id} className={styles.item}>
          <PhotographerCard photographer={photographer} />
        </li>
      ))}
    </ul>
  );
}
