"use client";

import { useEffect, useRef, useState } from "react";

// ============================================================
// HOOK: animasi muncul saat elemen di-scroll sampai terlihat
// (pengganti IntersectionObserver + classList di script.js).
// Dipakai oleh MenuCard, FaqItem (di Faq.tsx), dan Tentang.
// ============================================================
export default function useMuncul<T extends HTMLElement>(jeda: number) {
  const ref = useRef<T>(null);
  const [tampil, setTampil] = useState(false);

  useEffect(() => {
    const elemen = ref.current;
    if (!elemen) return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(timer);
        if (entry.isIntersecting) {
          timer = setTimeout(() => setTampil(true), jeda);
        } else {
          setTampil(false);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(elemen);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [jeda]);

  return [ref, tampil] as const;
}
