import Link from "next/link";

import { SITE } from "@/lib/constants";

export const metadata = {
  title: `Page introuvable · ${SITE.name}`,
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        background: "var(--c-black)",
        color: "var(--c-white)",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "var(--c-accent)",
          margin: 0,
        }}
      >
        Erreur 404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: "clamp(34px, 6vw, 60px)",
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        Cette adresse n’existe pas.
      </h1>
      <p style={{ color: "var(--c-muted)", maxWidth: "440px", margin: 0 }}>
        Le trajet demandé n’est pas au carnet. Revenez à l’accueil pour
        préparer votre course.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "12px",
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--c-black)",
          background: "var(--c-accent)",
          padding: "14px 26px",
          borderRadius: "999px",
          textDecoration: "none",
        }}
      >
        Retour à l’accueil
      </Link>
    </main>
  );
}
