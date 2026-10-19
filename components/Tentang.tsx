"use client";

/* eslint-disable @next/next/no-img-element */

import { FOLDER_GAMBAR } from "./data";
import useMuncul from "./useMuncul";

export default function Tentang() {
  const [ref, tampil] = useMuncul<HTMLDivElement>(0);

  return (
    <section className="tentang py-5" id="tentang">
      <div className="container">
        <div
          ref={ref}
          className={
            "tentang-flex d-flex flex-column flex-md-row align-items-center gap-4" +
            (tampil ? " tampil" : "")
          }
        >
          <img
            src={FOLDER_GAMBAR + "Logo Kedai Kopi Nusantara.jpeg"}
            className="rounded-circle flex-shrink-0"
            alt="Kedai Kopi Nusantara"
          />
          <div className="tentang-text text-center text-md-start">
            <h2 className="section-title fw-bold">Tentang Kami</h2>
            <p>
              Kopi Nusantara adalah usaha kedai kopi rumahan yang berdiri dari
              kecintaan terhadap kopi lokal. Kami berkomitmen menyajikan
              secangkir kopi berkualitas dengan harga yang bersahabat untuk
              semua kalangan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
