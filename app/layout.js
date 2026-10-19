import { DM_Sans } from "next/font/google";
import "./globals.css";

// Police de la maquette, chargée et optimisée par Next.js
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "FishEye",
  description: "Plateforme de photographes indépendants",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
