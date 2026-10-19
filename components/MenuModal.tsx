"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect } from "react";
import { FOLDER_GAMBAR } from "./data";
import type { Menu } from "./data";

type Props = {
  menu: Menu;
  onTutup: () => void;
};

// Detail menu (pengganti modal Bootstrap berbasis JavaScript)
export default function MenuModal({ menu, onTutup }: Props) {
  // tombol Esc menutup modal, scroll halaman dikunci selama modal terbuka
  useEffect(() => {
    const saatTombol = (e: KeyboardEvent) => {
      if (e.key === "Escape") onTutup();
    };
    document.addEventListener("keydown", saatTombol);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", saatTombol);
      document.body.style.overflow = "";
    };
  }, [onTutup]);

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="judulModal"
        onClick={(e) => {
          // klik di area gelap (di luar kotak) menutup modal
          if (e.target === e.currentTarget) onTutup();
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal-bg">
            <div className="modal-header border-0">
              <h5
                className="modal-title fw-bold"
                id="judulModal"
                style={{ color: "#4b2e2e" }}
              >
                {menu.nama}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onTutup}
              ></button>
            </div>
            <div className="modal-body text-center">
              <img
                src={FOLDER_GAMBAR + menu.gambar}
                className="img-fluid rounded mb-3 shadow-sm"
                alt={menu.nama}
              />
              <p className="text-muted">{menu.detail}</p>
              <span className="fs-5 fw-bold" style={{ color: "#a9662a" }}>
                {menu.harga}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}
