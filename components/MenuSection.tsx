"use client";

import { useRef, useState } from "react";
import { daftarMenu } from "./data";
import MenuCard from "./MenuCard";
import MenuModal from "./MenuModal";
import Toast from "./Toast";
import type { ToastItem } from "./Toast";

export default function MenuSection() {
  // disukai[i] = true kalau menu ke-i sudah disukai
  const [disukai, setDisukai] = useState<boolean[]>(daftarMenu.map(() => false));
  // index menu yang detailnya sedang dibuka (null = modal tertutup)
  const [menuTerbuka, setMenuTerbuka] = useState<number | null>(null);
  const [daftarToast, setDaftarToast] = useState<ToastItem[]>([]);
  const idToast = useRef(0);

  // toast notification (maksimal 3, hilang sendiri setelah ± 3 detik)
  function tampilkanToast(pesan: string, tipe: string) {
    idToast.current += 1;
    const id = idToast.current;

    setDaftarToast((sebelumnya) => [...sebelumnya.slice(-2), { id, pesan, tipe }]);
    setTimeout(() => {
      setDaftarToast((sebelumnya) => sebelumnya.filter((t) => t.id !== id));
    }, 3050);
  }

  // tombol suka: klik pertama menyukai, klik kedua membatalkan
  function klikSuka(index: number) {
    const sekarangSuka = !disukai[index];
    const namaMenu = daftarMenu[index].nama;

    setDisukai((sebelumnya) =>
      sebelumnya.map((nilai, i) => (i === index ? !nilai : nilai))
    );

    if (sekarangSuka) {
      tampilkanToast("Kamu menyukai " + namaMenu, "toast-suka");
    } else {
      tampilkanToast("Suka untuk " + namaMenu + " dibatalkan", "toast-batal");
    }
  }

  // card dengan like terbanyak (minimal 1) mendapat badge "Terpopuler"
  const jumlahSuka = disukai.map((nilai) => (nilai ? 1 : 0));
  const likeTertinggi = Math.max(...jumlahSuka);

  return (
    <>
      <section className="menu py-5" id="menu">
        <div className="container">
          <h2 className="section-title text-center fw-bold mb-2">
            Menu Favorit Kami
          </h2>
          <p className="text-center text-muted mb-4">
            Empat pilihan andalan kami. (Klik gambar untuk detail)
          </p>

          <div className="row g-4 justify-content-center">
            {daftarMenu.map((menu, index) => (
              <MenuCard
                key={menu.nama}
                menu={menu}
                index={index}
                disukai={disukai[index]}
                terpopuler={likeTertinggi > 0 && jumlahSuka[index] === likeTertinggi}
                onSuka={() => klikSuka(index)}
                onBuka={() => setMenuTerbuka(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {menuTerbuka !== null && (
        <MenuModal
          menu={daftarMenu[menuTerbuka]}
          onTutup={() => setMenuTerbuka(null)}
        />
      )}

      <Toast daftar={daftarToast} />
    </>
  );
}
