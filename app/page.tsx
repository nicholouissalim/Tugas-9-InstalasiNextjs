import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "12px",
        backgroundColor: "#000000",
        color: "#ffffff",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <h1>Nicho Louis Salim</h1>
      <p>NIM: 535250095</p>
      <a
        href="/kopi-nusantara/index.html"
        style={{
          marginTop: "16px",
          padding: "12px 28px",
          backgroundColor: "#ffffff",
          color: "#000000",
          borderRadius: "999px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Buka Website Kopi Nusantara
      </a>
    </main>
  );
}
