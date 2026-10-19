"use client";

import { useState } from "react";

const daftarNavigasi = [
  { teks: "Beranda", tujuan: "#hero" },
  { teks: "Menu", tujuan: "#menu" },
  { teks: "Tentang", tujuan: "#tentang" },
  { teks: "FAQ", tujuan: "#faq" },
  { teks: "Kontak", tujuan: "#kontak" },
];

export default function Navbar() {
  // true = menu hamburger terbuka (di layar kecil)
  const [terbuka, setTerbuka] = useState(false);

  return (
    <header className="header">
      <nav className="navbar navbar-expand-sm navbar-dark">
        <div className="nav-container">
          <a className="navbar-brand logo" href="#hero">
            Kopi Nusantara
          </a>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarKopnus"
            aria-expanded={terbuka}
            aria-label="Toggle navigation"
            onClick={() => setTerbuka(!terbuka)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={"collapse navbar-collapse" + (terbuka ? " show" : "")}
            id="navbarKopnus"
          >
            <ul className="navbar-nav ms-auto text-center">
              {daftarNavigasi.map((nav) => (
                <li className="nav-item" key={nav.tujuan}>
                  {/* setelah link diklik, menu hamburger ditutup lagi */}
                  <a
                    className="nav-link"
                    href={nav.tujuan}
                    onClick={() => setTerbuka(false)}
                  >
                    {nav.teks}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
