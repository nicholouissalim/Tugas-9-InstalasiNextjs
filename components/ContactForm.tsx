"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

const POLA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type NamaKolom = "nama" | "email" | "pesan";
type IsiForm = Record<NamaKolom, string>;

const KOSONG: IsiForm = { nama: "", email: "", pesan: "" };

// Bagian "Hubungi & Pesan": info kontak + formulir dengan validasi
export default function ContactForm() {
  const [isi, setIsi] = useState<IsiForm>(KOSONG);
  const [galat, setGalat] = useState<IsiForm>(KOSONG); // pesan error per kolom
  const [pesanSukses, setPesanSukses] = useState("");
  const timerSukses = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // saat user mengetik, error kolom itu langsung dihapus
  function ubahIsi(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const nama = e.target.name as NamaKolom;
    const nilai = e.target.value;
    setIsi((sebelumnya) => ({ ...sebelumnya, [nama]: nilai }));
    setGalat((sebelumnya) => ({ ...sebelumnya, [nama]: "" }));
  }

  function kirimForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isiNama = isi.nama.trim();
    const isiEmail = isi.email.trim();
    const isiPesan = isi.pesan.trim();
    const baru: IsiForm = { ...KOSONG };

    if (isiNama === "") {
      baru.nama = "Nama wajib diisi.";
    } else if (isiNama.length < 3) {
      baru.nama = "Nama minimal 3 huruf.";
    }

    if (isiEmail === "") {
      baru.email = "Email wajib diisi.";
    } else if (!POLA_EMAIL.test(isiEmail)) {
      baru.email = "Format email belum benar, contoh: nama@email.com";
    }

    if (isiPesan === "") {
      baru.pesan = "Pesan wajib diisi.";
    } else if (isiPesan.length < 10) {
      baru.pesan = "Pesan minimal 10 karakter.";
    }

    setGalat(baru);

    // kalau ada error, fokus ke kolom pertama yang salah
    const kolomPertamaError = (["nama", "email", "pesan"] as NamaKolom[]).find(
      (kolom) => baru[kolom] !== ""
    );
    if (kolomPertamaError) {
      document.getElementById(kolomPertamaError)?.focus();
      return;
    }

    setPesanSukses("Terima kasih, " + isiNama + "! Pesan kamu sudah terkirim.");
    setIsi(KOSONG);

    clearTimeout(timerSukses.current);
    timerSukses.current = setTimeout(() => setPesanSukses(""), 4600);
  }

  return (
    <section className="kontak py-5" id="kontak">
      <div className="container">
        <div
          className="row g-5 align-items-center justify-content-center"
          style={{ maxWidth: "1000px", margin: "0 auto" }}
        >
          <div className="col-12 col-lg-6 kontak-info">
            <h2 className="fw-bold mb-3">Hubungi &amp; Pesan</h2>
            <p className="text-muted">
              Isi formulir berikut, tim kami akan segera menghubungi Anda
              kembali.
            </p>
            <ul className="kontak-detail p-0">
              <li>
                <strong>Alamat:</strong> Jl. Jeruk, Jakarta Barat
              </li>
              <li>
                <strong>WhatsApp:</strong> 0857-7060-7933
              </li>
              <li>
                <strong>Jam Buka:</strong> Setiap hari, 08.00 – 21.00
              </li>
            </ul>

            <div className="social-links">
              <a
                href="https://wa.me/6285770607933"
                className="social-btn whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a
                href="https://www.instagram.com/kopinusantara.kopnus?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
                className="social-btn instagram"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://www.facebook.com/kopinusantaraa/"
                className="social-btn facebook"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="https://www.tiktok.com/@kedai_kosim?is_from_webapp=1&sender_device=pc"
                className="social-btn tiktok"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <form className="kontak-form shadow-sm" onSubmit={kirimForm} noValidate>
              <div className="form-group mb-3">
                <label htmlFor="nama">Nama</label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  className={"form-control" + (galat.nama ? " input-error" : "")}
                  placeholder="Nama lengkap Anda"
                  value={isi.nama}
                  onChange={ubahIsi}
                />
                <span className="error-msg">{galat.nama}</span>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={"form-control" + (galat.email ? " input-error" : "")}
                  placeholder="nama@email.com"
                  value={isi.email}
                  onChange={ubahIsi}
                />
                <span className="error-msg">{galat.email}</span>
              </div>
              <div className="form-group mb-4">
                <label htmlFor="pesan">Pesan</label>
                <textarea
                  id="pesan"
                  name="pesan"
                  rows={4}
                  className={"form-control" + (galat.pesan ? " input-error" : "")}
                  placeholder="Tuliskan pesanan atau pertanyaan Anda"
                  value={isi.pesan}
                  onChange={ubahIsi}
                ></textarea>
                <span className="error-msg">{galat.pesan}</span>
              </div>
              <button type="submit" className="btn-kirim">
                Kirim Pesan
              </button>
              {pesanSukses && (
                <div className="form-status" role="status">
                  {pesanSukses}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
