// El estado de lectura se guarda en el navegador, por sección
import { useEffect, useState } from "react";

interface Props {
  sectionId: string;
}

export default function MarkAsReadButton({ sectionId }: Props) {
  const storageKey = `leido:${sectionId}`;
  const [read, setRead] = useState(false);

  useEffect(() => {
    try {
      setRead(localStorage.getItem(storageKey) === "1");
    } catch {
      // Sin acceso a localStorage (modo privado): el botón sigue funcionando en la sesión
    }
  }, [storageKey]);

  function toggle() {
    const next = !read;
    setRead(next);
    try {
      if (next) localStorage.setItem(storageKey, "1");
      else localStorage.removeItem(storageKey);
    } catch {
      // Ídem
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={read}
      className={
        "inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-sans text-sm font-semibold transition-colors " +
        (read
          ? "border-accent-strong bg-accent-strong text-bg"
          : "border-surface-2 bg-surface text-fg hover:border-accent")
      }
    >
      <span aria-hidden="true">{read ? "✓" : "○"}</span>
      {read ? "Leído" : "Marcar como leído"}
    </button>
  );
}
