"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

// ============================================================
// DATA
// Gambar tetap disimpan di folder public/kopi-nusantara/images
// ============================================================
const FOLDER_GAMBAR = "/kopi-nusantara/images/";

type Menu = {
  nama: string;
  gambar: string;
  ringkas: string;
  detail: string;
  harga: string;
};

const daftarMenu: Menu[] = [
  {
    nama: "Kopi Hitam",
    gambar: "Kopi Hitam.png",
    ringkas:
      "Kopi robusta lokal yang diseduh tubruk. Pahit pas dan aromanya kuat yang cocok untuk memulai hari.",
    detail:
      "Kopi robusta lokal pilihan yang diseduh dengan metode tubruk tradisional. Menghadirkan rasa pahit yang pas dan aroma yang sangat kuat. Pilihan sempurna untuk memberikan energi ekstra di pagi hari.",
    harga: "Rp 12.000",
  },
  {
    nama: "Kopi Susu Gula Aren",
    gambar: "Kopi Susu Gula Aren.png",
    ringkas:
      "Espresso, susu segar, dan gula aren asli dalam satu gelas. Manisnya tidak berlebihan.",
    detail:
      "Kombinasi sempurna dari double shot espresso, susu segar berkualitas, dan manisnya gula aren murni. Rasa manisnya pas dan tidak menutupi karakter asli dari kopi itu sendiri.",
    harga: "Rp 18.000",
  },
  {
    nama: "Cappuccino",
    gambar: "Cappuccino.jpg",
    ringkas:
      "Espresso dengan susu panas dan lapisan foam tebal. Hangat, creamy, dan seimbang di setiap tegukan.",
    detail:
      "Dibuat dari espresso base klasik dengan takaran susu panas yang presisi serta lapisan foam yang tebal di atasnya. Cita rasa yang hangat, creamy, namun rasa kopinya tetap menonjol.",
    harga: "Rp 20.000",
  },
  {
    nama: "Latte",
    gambar: "Iced Latte.jpg",
    ringkas:
      "Espresso berpadu susu steam yang halus dengan foam tipis. Rasa kopinya ringan dan mudah dinikmati.",
    detail:
      "Bagi yang menyukai kopi dengan rasa yang lebih lembut. Latte kami memadukan espresso ringan dengan susu steam dominan dan foam tipis, menghasilkan tekstur velvet yang sangat nikmat.",
    harga: "Rp 20.000",
  },
];

const daftarFaq = [
  {
    tanya: "Apakah Kopi Nusantara buka setiap hari?",
    jawab: "Ya, kami buka setiap hari mulai pukul 08.00 sampai 21.00 WIB.",
  },
  {
    tanya: "Apakah bisa pesan lewat online?",
    jawab:
      "Bisa, kamu bisa hubungi kami lewat Instagram atau WhatsApp yang tertera di bagian Kontak.",
  },
  {
    tanya: "Apakah tersedia menu tanpa gula?",
    jawab: "Tersedia, kamu bisa request level gula sesuai selera saat memesan.",
  },
  {
    tanya: "Apakah ada fasilitas WiFi dan stopkontak?",
    jawab:
      "Kami menyediakan WiFi gratis yang cepat dan banyak stopkontak, cocok untuk mengerjakan tugas atau work from cafe.",
  },
];

const daftarNavigasi = [
  { teks: "Beranda", tujuan: "#hero" },
  { teks: "Menu", tujuan: "#menu" },
  { teks: "Tentang", tujuan: "#tentang" },
  { teks: "FAQ", tujuan: "#faq" },
  { teks: "Kontak", tujuan: "#kontak" },
];

const JAM_BUKA = 8;
const JAM_TUTUP = 21;
const POLA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type NamaKolom = "nama" | "email" | "pesan";
type IsiForm = Record<NamaKolom, string>;
type ToastItem = { id: number; pesan: string; tipe: string };

function formatJam(jam: number) {
  return String(jam).padStart(2, "0") + ".00";
}

// ============================================================
// HOOK: animasi muncul saat di-scroll (pengganti IntersectionObserver
// + classList di script.js). Dipakai oleh kartu menu, FAQ, dan Tentang Kami.
// ============================================================
function useMuncul<T extends HTMLElement>(jeda: number) {
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

// ============================================================
// KOMPONEN: kartu menu
// ============================================================
type KartuMenuProps = {
  menu: Menu;
  index: number;
  disukai: boolean;
  terpopuler: boolean;
  onSuka: () => void;
  onBuka: () => void;
};

function KartuMenu({
  menu,
  index,
  disukai,
  terpopuler,
  onSuka,
  onBuka,
}: KartuMenuProps) {
  const [ref, tampil] = useMuncul<HTMLDivElement>(index * 150);

  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div
        ref={ref}
        className={
          "card h-100 shadow-sm border-0 position-relative" +
          (terpopuler ? " terpopuler" : "") +
          (tampil ? " tampil" : "")
        }
      >
        <div className="badge-populer">Terpopuler</div>
        <img
          src={FOLDER_GAMBAR + menu.gambar}
          className="card-img-top"
          alt={menu.nama}
          style={{ cursor: "pointer" }}
          role="button"
          tabIndex={0}
          onClick={onBuka}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onBuka();
            }
          }}
        />
        <div className="card-body d-flex flex-column text-center">
          <h3 className="card-title h5 text-dark fw-bold">{menu.nama}</h3>
          <p className="card-text text-muted small flex-grow-1">
            {menu.ringkas}
          </p>
          <span className="price fw-bold d-block mb-3">{menu.harga}</span>
          <button
            type="button"
            className={"btn-like w-100" + (disukai ? " liked" : "")}
            onClick={onSuka}
          >
            <i className="fa-solid fa-thumbs-up"></i> Suka (
            <span className="like-count">{disukai ? 1 : 0}</span>)
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// KOMPONEN: satu item FAQ (accordion)
// ============================================================
type ItemFaqProps = {
  tanya: string;
  jawab: string;
  index: number;
  aktif: boolean;
  onKlik: () => void;
};

function ItemFaq({ tanya, jawab, index, aktif, onKlik }: ItemFaqProps) {
  const [ref, tampil] = useMuncul<HTMLDivElement>(index * 120);

  return (
    <div
      ref={ref}
      className={"accordion-item faq-item" + (tampil ? " tampil" : "")}
    >
      <h3 className="accordion-header">
        <button
          className={"accordion-button" + (aktif ? "" : " collapsed")}
          type="button"
          aria-expanded={aktif}
          aria-controls={`faqCollapse${index + 1}`}
          onClick={onKlik}
        >
          {tanya}
        </button>
      </h3>
      <div
        id={`faqCollapse${index + 1}`}
        className={"accordion-collapse collapse" + (aktif ? " show" : "")}
      >
        <div className="accordion-body">{jawab}</div>
      </div>
    </div>
  );
}

// ============================================================
// HALAMAN UTAMA  →  http://localhost:3000/kopi-nusantara
// ============================================================
export default function KopiNusantara() {
  // --- state (pengganti manipulasi DOM jQuery) ---
  const [navTerbuka, setNavTerbuka] = useState(false);
  const [disukai, setDisukai] = useState<boolean[]>(daftarMenu.map(() => false));
  const [daftarToast, setDaftarToast] = useState<ToastItem[]>([]);
  const [menuTerbuka, setMenuTerbuka] = useState<number | null>(null);
  const [faqTerbuka, setFaqTerbuka] = useState<number | null>(null);
  const [tombolAtasTampil, setTombolAtasTampil] = useState(false);
  const [sedangBuka, setSedangBuka] = useState<boolean | null>(null);
  const [isi, setIsi] = useState<IsiForm>({ nama: "", email: "", pesan: "" });
  const [galat, setGalat] = useState<IsiForm>({ nama: "", email: "", pesan: "" });
  const [pesanSukses, setPesanSukses] = useState("");

  const idToast = useRef(0);
  const timerForm = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [refTentang, tentangTampil] = useMuncul<HTMLDivElement>(0);

  // --- 4. tombol kembali ke atas: muncul setelah scroll > 300px ---
  useEffect(() => {
    const saatScroll = () => setTombolAtasTampil(window.scrollY > 300);
    window.addEventListener("scroll", saatScroll, { passive: true });
    return () => window.removeEventListener("scroll", saatScroll);
  }, []);

  // --- 8. status buka/tutup berdasarkan jam Jakarta, diperbarui tiap menit ---
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

  // --- modal detail menu: tombol Esc menutup, scroll halaman dikunci ---
  useEffect(() => {
    if (menuTerbuka === null) return;

    const saatTombol = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuTerbuka(null);
    };
    document.addEventListener("keydown", saatTombol);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", saatTombol);
      document.body.style.overflow = "";
    };
  }, [menuTerbuka]);

  // --- 7. toast notification (maksimal 3, hilang sendiri) ---
  function tampilkanToast(pesan: string, tipe: string) {
    idToast.current += 1;
    const id = idToast.current;

    setDaftarToast((sebelumnya) => [...sebelumnya.slice(-2), { id, pesan, tipe }]);
    setTimeout(() => {
      setDaftarToast((sebelumnya) => sebelumnya.filter((t) => t.id !== id));
    }, 3050);
  }

  // --- 3. tombol suka: klik pertama menyukai, klik kedua membatalkan ---
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

  // --- 5. validasi form kontak ---
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
    const baru: IsiForm = { nama: "", email: "", pesan: "" };

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

    const kolomPertamaError = (["nama", "email", "pesan"] as NamaKolom[]).find(
      (kolom) => baru[kolom] !== ""
    );
    if (kolomPertamaError) {
      document.getElementById(kolomPertamaError)?.focus();
      return;
    }

    setPesanSukses("Terima kasih, " + isiNama + "! Pesan kamu sudah terkirim.");
    setIsi({ nama: "", email: "", pesan: "" });

    clearTimeout(timerForm.current);
    timerForm.current = setTimeout(() => setPesanSukses(""), 4600);
  }

  const menuModal = menuTerbuka !== null ? daftarMenu[menuTerbuka] : null;

  return (
    <>
      <title>Kopi Nusantara - Kedai Kopi Rumahan</title>

      {/* Bootstrap 5 CSS + Font Awesome (CDN), lalu CSS halaman ini */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* header & navbar */}
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
              aria-expanded={navTerbuka}
              aria-label="Toggle navigation"
              onClick={() => setNavTerbuka(!navTerbuka)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className={"collapse navbar-collapse" + (navTerbuka ? " show" : "")}
              id="navbarKopnus"
            >
              <ul className="navbar-nav ms-auto text-center">
                {daftarNavigasi.map((nav) => (
                  <li className="nav-item" key={nav.tujuan}>
                    <a
                      className="nav-link"
                      href={nav.tujuan}
                      onClick={() => setNavTerbuka(false)}
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

      {/* hero */}
      <section className="hero" id="hero">
        <div className="hero-content">
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
          <h2>Secangkir Kehangatan Nusantara</h2>
          <p>
            Kopi asli racikan rumahan, diseduh dengan cinta untuk menemani
            harimu.
          </p>
          <a href="#menu" className="btn">
            Lihat Menu
          </a>
        </div>
      </section>

      {/* menu */}
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
              <KartuMenu
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

      {/* detail menu (modal) */}
      {menuModal && (
        <>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="judulModal"
            onClick={(e) => {
              if (e.target === e.currentTarget) setMenuTerbuka(null);
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
                    {menuModal.nama}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setMenuTerbuka(null)}
                  ></button>
                </div>
                <div className="modal-body text-center">
                  <img
                    src={FOLDER_GAMBAR + menuModal.gambar}
                    className="img-fluid rounded mb-3 shadow-sm"
                    alt={menuModal.nama}
                  />
                  <p className="text-muted">{menuModal.detail}</p>
                  <span className="fs-5 fw-bold" style={{ color: "#a9662a" }}>
                    {menuModal.harga}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* tentang kami */}
      <section className="tentang py-5" id="tentang">
        <div className="container">
          <div
            ref={refTentang}
            className={
              "tentang-flex d-flex flex-column flex-md-row align-items-center gap-4" +
              (tentangTampil ? " tampil" : "")
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

      {/* faq */}
      <section className="faq py-5" id="faq">
        <div className="container">
          <h2 className="section-title text-center fw-bold mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>

          <div className="accordion" id="faqAccordion">
            {daftarFaq.map((faq, index) => (
              <ItemFaq
                key={faq.tanya}
                tanya={faq.tanya}
                jawab={faq.jawab}
                index={index}
                aktif={faqTerbuka === index}
                onKlik={() => setFaqTerbuka(faqTerbuka === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* kontak & pesan */}
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

      {/* footer */}
      <footer className="footer" id="footer">
        <p>&copy; 2026 Kopi Nusantara.</p>
        <p>Kedai kopi rumahan dengan cita rasa asli Nusantara.</p>
      </footer>

      {/* wadah toast notifikasi */}
      <div className="toast-container-custom" aria-live="polite">
        {daftarToast.map((toast) => (
          <div key={toast.id} className={"toast show " + toast.tipe}>
            {toast.pesan}
          </div>
        ))}
      </div>

      {/* tombol kembali ke atas */}
      <button
        type="button"
        className={"back-to-top" + (tombolAtasTampil ? " tampil" : "")}
        aria-label="Kembali ke atas"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </>
  );
}

// ============================================================
// CSS halaman (dari style.css, disesuaikan untuk React/Next.js)
// ============================================================
const css = `
/* menimpa gaya bawaan Next.js (globals.css) agar tampilan sama seperti aslinya */
html:root {
  color-scheme: light;
}

html body {
  display: block;
  background: #fff;
  color: #333;
  font-family: 'Segoe UI', Arial, sans-serif;
  line-height: 1.6;
  overflow-x: hidden;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/*agar saat discroll ada transisi dan juga padding agar menyesuaikan berhenti scrollnya dimana*/
html {
  scroll-behavior: smooth;
  scroll-padding-top: 4.4rem;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

/*===mobile===*/

/*==header==*/
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(75, 46, 46, 0.95);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 0.5rem 0;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
}

.navbar-brand.logo {
  color: #fff;
  font-size: 1.4rem;
}

.navbar-toggler {
  border-color: rgba(245, 230, 211, 0.5);
}

.navbar-toggler:focus {
  box-shadow: 0 0 0 0.2rem rgba(217, 160, 102, 0.5);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28245, 230, 211, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

@media (max-width: 575.98px) {
  .navbar-collapse {
    background-color: #4b2e2e;
    margin-top: 0.75rem;
    border-radius: 6px;
    padding: 0.5rem 0;
  }
}

.navbar-nav {
  gap: 0.3rem;
}

.nav-link {
  color: #f5e6d3;
  font-size: 0.95rem;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.nav-link:hover,
.nav-link:focus {
  color: #d9a066;
  border-bottom-color: #d9a066;
}

/* underline nyala kalau section-nya lagi aktif (via :target) */
body:has(#hero:target) .nav-link[href="#hero"],
body:has(#menu:target) .nav-link[href="#menu"],
body:has(#tentang:target) .nav-link[href="#tentang"],
body:has(#faq:target) .nav-link[href="#faq"],
body:has(#kontak:target) .nav-link[href="#kontak"] {
  color: #d9a066;
  border-bottom-color: #d9a066;
}

@media (min-width: 992px) {
  .nav-container {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

/*==hero==*/
.hero {
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
              url('${FOLDER_GAMBAR}Kedai Kopi Nusantara.jpeg') center/cover no-repeat;
  color: #fff;
  text-align: center;
  padding: 3rem 1rem;
}

.hero h2 {
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
}

.hero p {
  font-size: 0.95rem;
  margin-bottom: 1.2rem;
}

/* animasi masuk hero: judul, paragraf, dan tombol muncul bergantian */
.hero-content > * {
  animation: heroMasuk 0.7s ease both;
}
.hero-content > :nth-child(2) { animation-delay: 0.25s; }
.hero-content > :nth-child(3) { animation-delay: 0.5s; }
.hero-content > :nth-child(4) { animation-delay: 0.75s; }

@keyframes heroMasuk {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-content > * {
    animation: none;
  }
}

.btn {
  display: inline-block;
  background-color: transparent;
  border:  2px solid #d9a066;
  color: #ffffff;
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn:hover{
  background-color: #d9a066;
  color: #4b2e2e;
  box-shadow: 0 0 25px #d9a066;
}

/*==menu==*/
.menu {
  padding: 2rem 1rem;
}

.menu > p {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #555;
}

.section-title {
  text-align: center;
  margin-bottom: 0.5rem;
  color: #4b2e2e;
}

/*==card==*/
.card {
  background-color: #fdf6ee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  text-align: center;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
}

.card img {
  width: 100%;
  aspect-ratio: 3/2;
  object-fit: cover;
}

.card h3 {
  margin: 0.6rem 0 0.3rem;
  color: #4b2e2e;
}

.card p {
  font-size: 0.9rem;
  padding: 0 0.8rem;
  margin-bottom: 0.5rem;
}

.price {
  margin-top: auto;
  font-weight: bold;
  color: #a9662a;
}

.card.terpopuler{
  border: 2px solid #d9a066;
  box-shadow: 0 0 15px rgba(217, 160, 102, 0.6);
}

.badge-populer{
  display: none;
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: #d9a066;
  color: #fff;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  z-index: 5;
}

.card.terpopuler .badge-populer{
  display: inline-block;
}

/*==tentang==*/
.tentang {
  background-color: #f5e6d3;
}

.tentang-flex img {
  width: 150px;
  max-width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.tentang-flex {
  opacity: 0;
  transform: translateY(35px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.tentang-flex.tampil {
  opacity: 1;
  transform: translateY(0);
}

.tentang-text p {
  font-size: 0.95rem;
}

@media (min-width: 576px) {
  .tentang-flex img {
    width: 180px;
    max-width: 180px;
  }
}

@media (min-width: 992px) {
  .tentang-flex {
    max-width: 54%;
    margin: 0 auto;
  }
}

.card,
.faq-item {
  opacity: 0;
  transform: translateY(25px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.card.tampil,
.faq-item.tampil {
  opacity: 1;
  transform: translateY(0);
}

/*==faq==*/
.faq {
  background-color: #fdf6ee;
}

.accordion {
  --bs-accordion-color: #4b2e2e;
  --bs-accordion-btn-color: #4b2e2e;
  --bs-accordion-active-color: #4b2e2e;
  --bs-accordion-active-bg: #f5e6d3;
  --bs-accordion-border-color: #eee0cd;
  --bs-accordion-btn-focus-border-color: #d9a066;
  --bs-accordion-btn-focus-box-shadow: 0 0 0 0.2rem rgba(217, 160, 102, 0.35);
}

.accordion-item {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 0.8rem;
  border: none;
}

.accordion-button:not(.collapsed) {
  box-shadow: none;
}

.btn-like {
  background-color: transparent;
  border: 1px solid #d9a066;
  color: #d9a066;
  padding: 0.5rem;
  margin: 0.5rem 1rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-like:hover {
  background-color: #f5e6d3;
}

.btn-like.liked {
  background-color: #d9a066;
  color: #fff;
}

/*==kontak==*/
.kontak {
  padding: 2rem 1rem;
  background-color: #fff;
}

.kontak-info h2 {
  color: #4b2e2e;
  margin-bottom: 0.5rem;
}

.kontak-info p {
  color: #555;
  margin-bottom: 0.8rem;
}

.kontak-detail {
  list-style: none;
}

.kontak-detail li {
  margin-bottom: 0.4rem;
  font-size: 0.95rem;
}

/*==sosial media==*/
.social-links {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 1.2rem;
}

.social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4b2e2e;
  color: #f5e6d3;
  font-size: 1.25rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-btn:hover {
  transform: translateY(-3px);
  color: #ffffff;
}

.social-btn.whatsapp:hover {
  background-color: #25d366;
}

.social-btn.instagram:hover {
  background-color: #e1306c;
}

.social-btn.facebook:hover {
  background-color: #1877f2;
}

.social-btn.tiktok:hover {
  background-color: #000000;
}

.kontak-form {
  background-color: #f5e6d3;
  border-radius: 10px;
  padding: 1.2rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: bold;
  color: #4b2e2e;
  margin-bottom: 0.3rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  font: inherit;
  font-size: 0.9rem;
  padding: 0.6rem 0.8rem;
  border: 1px solid #d9c3a5;
  border-radius: 6px;
  background-color: #fff;
}

.form-group textarea {
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: 2px solid #d9a066;
  border-color: #d9a066;
}

.btn-kirim {
  width: 100%;
  font: inherit;
  font-weight: bold;
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 999px;
  background-color: #4b2e2e;
  color: #f5e6d3;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-kirim:hover {
  background-color: #6b4327;
}

/*==footer==*/
.footer {
  background-color: #4b2e2e;
  color: #f5e6d3;
  text-align: center;
  padding: 1.2rem 1rem;
  font-size: 0.85rem;
}

/*===tablet===*/
@media (min-width: 576px) {
  .hero h2 {
    font-size: 2rem;
  }
  .hero p {
    font-size: 1.05rem;
  }
  .tentang-flex {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    max-width: 85%;
    margin: 0 auto;
  }
  .tentang-flex img {
    width: 180px;
    max-width: 180px;
    margin: 0 60px 0 0;
    flex-shrink: 0;
  }
  .tentang-flex .tentang-text {
    flex: 1;
  }
}

/*===desktop===*/
@media (min-width: 992px) {
  html {
    scroll-padding-top: 5.4rem;
  }
  .header {
    padding: 0.7rem 0;
  }
  .logo {
    font-size: 1.8rem;
  }
  .hero {
    padding: 6rem 2rem;
  }
  .hero h2 {
    font-size: 2.8rem;
  }
  .hero p {
    font-size: 1.2rem;
  }
  .menu {
    padding: 3rem 4rem;
  }
  .tentang {
    padding: 3rem 4rem;
  }
  .tentang-flex {
    max-width: 54%;
    margin: auto;
  }
  .kontak {
    padding: 3rem 4rem;
  }
}

/*==tombol kembali ke atas (muncul/hilang dengan fade)==*/
.back-to-top {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 1.2rem;
  bottom: 1.2rem;
  z-index: 90;
  width: 46px;
  height: 46px;
  border: none;
  border-radius: 50%;
  background-color: #d9a066;
  color: #4b2e2e;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(75, 46, 46, 0.35);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease, background-color 0.3s ease, transform 0.3s ease;
}

.back-to-top.tampil {
  opacity: 1;
  visibility: visible;
}

.back-to-top:hover {
  background-color: #4b2e2e;
  color: #f5e6d3;
  transform: translateY(-3px);
}

.back-to-top:focus-visible {
  outline: 3px solid #d9a066;
  outline-offset: 3px;
}

/*==validasi form==*/
.error-msg {
  display: block;
  min-height: 1.2em;
  font-size: 0.8rem;
  color: #b3261e;
  margin-top: 0.25rem;
}

.form-group input.input-error,
.form-group textarea.input-error {
  border-color: #b3261e;
  background-color: #fff6f5;
}

.form-status {
  display: block;
  margin-top: 1rem;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  background-color: #e6f4ea;
  color: #1e5e34;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
  animation: statusForm 4.6s ease forwards;
}

@keyframes statusForm {
  0%   { opacity: 0; transform: translateY(-8px); }
  6%   { opacity: 1; transform: translateY(0); }
  93%  { opacity: 1; }
  100% { opacity: 0; }
}

/*==toast notification==*/
.toast-container-custom {
  position: fixed;
  left: 1.2rem;
  bottom: 1.2rem;
  z-index: 95;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: calc(100% - 5.5rem);
  pointer-events: none;
}

.toast {
  padding: 0.7rem 1rem;
  border-radius: 6px;
  border-left: 4px solid #d9a066;
  background-color: #4b2e2e;
  color: #f5e6d3;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(75, 46, 46, 0.35);
  animation: toastMuncul 3s ease forwards;
}

@keyframes toastMuncul {
  0%   { opacity: 0; transform: translateY(10px); }
  8%   { opacity: 1; transform: translateY(0); }
  90%  { opacity: 1; }
  100% { opacity: 0; }
}

.toast.toast-batal {
  border-left-color: #a9a9a9;
}

/*==status buka/tutup==*/
.status-buka {
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.3rem 0.9rem;
  border: 1px solid #fff;
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.45);
  font-size: 0.85rem;
  font-weight: bold;
}

.status-buka::before {
  content: '';
  display: inline-block;
  width: 9px;
  height: 9px;
  margin-right: 0.5rem;
  border-radius: 50%;
  background-color: #aaa;
}

.status-buka.buka {
  border-color: #3ddc84;
}

.status-buka.buka::before {
  background-color: #3ddc84;
}

.status-buka.tutup {
  border-color: #ff5a4f;
}

.status-buka.tutup::before {
  background-color: #ff5a4f;
}

.custom-modal-bg {
  background-color: #fdf6ee;
}
`;