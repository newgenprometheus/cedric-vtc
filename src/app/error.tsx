"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
        Incident technique
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
        Un contretemps sur la route.
      </h1>
      <p style={{ color: "var(--c-muted)", maxWidth: "440px", margin: 0 }}>
        Quelque chose s’est mal passé pendant le chargement. Réessayez, et si
        le problème persiste, écrivez-nous.
      </p>
      <button
        type="button"
        onClick={reset}
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
          border: "none",
          cursor: "pointer",
        }}
      >
        Réessayer
      </button>
    </main>
  );
}
