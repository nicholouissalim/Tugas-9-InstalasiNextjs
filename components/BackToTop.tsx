"use client";

import { useEffect, useState } from "react";

// Tombol kembali ke atas: muncul setelah halaman di-scroll lebih dari 300px
export default function BackToTop() {
  const [tampil, setTampil] = useState(false);

  useEffect(() => {
    const saatScroll = () => setTampil(window.scrollY > 300);
    window.addEventListener("scroll", saatScroll, { passive: true });
    return () => window.removeEventListener("scroll", saatScroll);
  }, []);

  return (
    <button
      type="button"
      className={"back-to-top" + (tampil ? " tampil" : "")}
      aria-label="Kembali ke atas"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
}
