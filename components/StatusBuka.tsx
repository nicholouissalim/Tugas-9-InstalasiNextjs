"use client";

import { useEffect, useState } from "react";

const JAM_BUKA = 8;
const JAM_TUTUP = 21;

function formatJam(jam: number) {
  return String(jam).padStart(2, "0") + ".00";
}

// Badge buka/tutup berdasarkan jam Jakarta, diperbarui tiap menit
export default function StatusBuka() {
  // null = belum dihitung (dihitung di browser agar tidak beda dengan server)
  const [sedangBuka, setSedangBuka] = useState<boolean | null>(null);

  useEffect(() => {
    const perbarui = () => {
      const jamSekarang = parseInt(
        new Date().toLocaleString("en-GB", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          hourCycle: "h23",
        }),
        10
      );
      setSedangBuka(jamSekarang >= JAM_BUKA && jamSekarang < JAM_TUTUP);
    };

    const awal = setTimeout(perbarui, 0);
    const interval = setInterval(perbarui, 60000);
    return () => {
      clearTimeout(awal);
      clearInterval(interval);
    };
  }, []);

  return (
    <span
      className={
        "status-buka" +
        (sedangBuka === null ? "" : sedangBuka ? " buka" : " tutup")
      }
      style={{ visibility: sedangBuka === null ? "hidden" : "visible" }}
    >
      {sedangBuka
        ? "Buka sekarang · sampai " + formatJam(JAM_TUTUP) + " WIB"
        : "Tutup · buka lagi pukul " + formatJam(JAM_BUKA) + " WIB"}
    </span>
  );
}
