"use server";

import { updateNumberOfLikes } from "./prisma-db";

// Server Action : appelée depuis le navigateur, exécutée sur le serveur (accès à la base)
export async function saveLikes(mediaId, newNumberOfLikes) {
  /*throw new Error("test");*/
  // Valeurs incohérentes envoyées par le navigateur : on signale l'erreur
  if (
    !Number.isInteger(mediaId) ||
    !Number.isInteger(newNumberOfLikes) ||
    newNumberOfLikes < 0
  ) {
    throw new Error("Données de like invalides");
  }

  try {
    await updateNumberOfLikes(mediaId, newNumberOfLikes);
  } catch (error) {
    // Erreur de la base (média introuvable, base inaccessible…) : trace côté serveur + erreur renvoyée
    console.error("Échec de la mise à jour des likes :", error);
    throw new Error("Impossible d’enregistrer le like");
  }
}
