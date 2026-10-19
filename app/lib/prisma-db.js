import path from "node:path";
import { PrismaClient } from "@/generated/prisma/client";

// Chemin absolu vers la base : process.cwd() = racine du projet.
// Nécessaire car Next.js exécute le code depuis .next/, ce qui casse le chemin relatif du schéma.
const dbPath = path
  .join(process.cwd(), "prisma", "dev.db")
  .replaceAll("\\", "/");

// Une seule instance de PrismaClient (évite les connexions en double avec le rechargement à chaud)
const globalForPrisma = globalThis;
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ datasourceUrl: `file:${dbPath}` });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const getAllPhotographers = () => prisma.photographer.findMany();

export const getPhotographer = (id) =>
  prisma.photographer.findUnique({ where: { id } });

export const getAllMediasForPhotographer = (photographerId) =>
  prisma.media.findMany({ where: { photographerId } });

export const updateNumberOfLikes = (mediaId, newNumberOfLikes) =>
  prisma.media.update({
    where: { id: mediaId },
    data: { likes: newNumberOfLikes },
  });
