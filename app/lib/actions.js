"use server";

import { updateNumberOfLikes } from "./prisma-db";

// Server Action : appelée depuis le navigateur, exécutée sur le serveur (accès à la base)
export async function saveLikes(mediaId, newNumberOfLikes) {
  // Sécurité : on refuse toute valeur incohérente envoyée par le navigateur
  if (
    !Number.isInteger(mediaId) ||
    !Number.isInteger(newNumberOfLikes) ||
    newNumberOfLikes < 0
  ) {
    return;
  }
  await updateNumberOfLikes(mediaId, newNumberOfLikes);
}
