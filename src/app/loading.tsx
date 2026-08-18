export default function Loading() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--c-black)",
        zIndex: 200,
      }}
    />
  );
}
