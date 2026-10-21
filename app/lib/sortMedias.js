// Options du menu de tri (valeur technique + texte affiché)
export const SORT_OPTIONS = [
  { value: "popularity", label: "Popularité" },
  { value: "date", label: "Date" },
  { value: "title", label: "Titre" },
];

// Renvoie une NOUVELLE liste triée (la liste d'origine n'est pas modifiée)
export function sortMedias(medias, sortBy) {
  const sorted = [...medias];

  if (sortBy === "popularity") {
    return sorted.sort((a, b) => b.likes - a.likes); // le plus liké en premier
  }
  if (sortBy === "date") {
    return sorted.sort((a, b) => b.date.localeCompare(a.date)); // le plus récent en premier
  }
  return sorted.sort((a, b) => a.title.localeCompare(b.title, "fr")); // ordre alphabétique
}
