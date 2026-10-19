"use client";

import { useState } from "react";
import { daftarFaq } from "./data";
import useMuncul from "./useMuncul";

type FaqItemProps = {
  tanya: string;
  jawab: string;
  index: number;
  aktif: boolean;
  onKlik: () => void;
};

// satu pertanyaan (accordion), muncul satu-satu saat di-scroll
function FaqItem({ tanya, jawab, index, aktif, onKlik }: FaqItemProps) {
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

export default function Faq() {
  // index pertanyaan yang sedang terbuka (hanya satu, null = semua tertutup)
  const [terbuka, setTerbuka] = useState<number | null>(null);

  return (
    <section className="faq py-5" id="faq">
      <div className="container">
        <h2 className="section-title text-center fw-bold mb-4">
          Pertanyaan yang Sering Diajukan
        </h2>

        <div className="accordion" id="faqAccordion">
          {daftarFaq.map((faq, index) => (
            <FaqItem
              key={faq.tanya}
              tanya={faq.tanya}
              jawab={faq.jawab}
              index={index}
              aktif={terbuka === index}
              onKlik={() => setTerbuka(terbuka === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
