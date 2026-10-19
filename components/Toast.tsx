export type ToastItem = { id: number; pesan: string; tipe: string };

type Props = {
  daftar: ToastItem[];
};

// Wadah notifikasi kecil di pojok kiri bawah (isinya dikelola MenuSection)
export default function Toast({ daftar }: Props) {
  return (
    <div className="toast-container-custom" aria-live="polite">
      {daftar.map((toast) => (
        <div key={toast.id} className={"toast show " + toast.tipe}>
          {toast.pesan}
        </div>
      ))}
    </div>
  );
}
