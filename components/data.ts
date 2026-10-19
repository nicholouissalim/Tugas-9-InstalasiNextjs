// ============================================================
// DATA bersama untuk halaman Kopi Nusantara
// Gambar tetap disimpan di folder public/kopi-nusantara/images
// ============================================================
export const FOLDER_GAMBAR = "/kopi-nusantara/images/";

export type Menu = {
  nama: string;
  gambar: string;
  ringkas: string;
  detail: string;
  harga: string;
};

export const daftarMenu: Menu[] = [
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

export const daftarFaq = [
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
