import StatusBuka from "./StatusBuka";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <StatusBuka />
        <h2>Secangkir Kehangatan Nusantara</h2>
        <p>
          Kopi asli racikan rumahan, diseduh dengan cinta untuk menemani harimu.
        </p>
        <a href="#menu" className="btn">
          Lihat Menu
        </a>
      </div>
    </section>
  );
}
