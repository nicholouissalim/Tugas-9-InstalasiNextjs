import type { Metadata } from "next";
import BackToTop from "../../components/BackToTop";
import ContactForm from "../../components/ContactForm";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import MenuSection from "../../components/MenuSection";
import Navbar from "../../components/Navbar";
import Tentang from "../../components/Tentang";
import { css } from "../../components/gaya";

export const metadata: Metadata = {
  title: "Kopi Nusantara - Kedai Kopi Rumahan",
};

export default function KopiNusantara() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <Navbar />
      <Hero />
      <MenuSection />
      <Tentang />
      <Faq />
      <ContactForm />
      <Footer />
      <BackToTop />
    </>
  );
}