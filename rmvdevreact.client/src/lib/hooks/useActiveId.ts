import { useEffect, useState } from "react";

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleChangeHash = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    }
    handleChangeHash();

    window.addEventListener('hashchange', handleChangeHash)

    return () => {
      window.removeEventListener('hashchange', handleChangeHash)
    }
  }, []);

  return activeId;
}

