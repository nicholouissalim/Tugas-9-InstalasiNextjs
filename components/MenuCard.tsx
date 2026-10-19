"use client";

/* eslint-disable @next/next/no-img-element */

import { FOLDER_GAMBAR } from "./data";
import type { Menu } from "./data";
import useMuncul from "./useMuncul";

type Props = {
  menu: Menu;
  index: number;
  disukai: boolean;
  terpopuler: boolean;
  onSuka: () => void;
  onBuka: () => void;
};

export default function MenuCard({
  menu,
  index,
  disukai,
  terpopuler,
  onSuka,
  onBuka,
}: Props) {
  // kartu muncul satu-satu saat di-scroll (jeda 150ms per kartu)
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
