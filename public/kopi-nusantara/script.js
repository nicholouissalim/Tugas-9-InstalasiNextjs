$(document).ready(function() {

    // 1. ANIMASI MASUK HERO
    // Judul, paragraf, dan tombol muncul bergantian saat halaman dibuka
    // kalau pengguna mengaktifkan "kurangi animasi" di perangkatnya, animasi dilewati
    const kurangiAnimasi = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!kurangiAnimasi) {
        $('.hero-content').children().each(function(index) {
            $(this)
                .css({ opacity: 0, position: 'relative', top: '20px' }) // mulai transparan & agak turun
                .delay(index * 250)                                    // tiap elemen jeda 250ms
                .animate({ opacity: 1, top: 0 }, 700);                 // lalu naik & muncul
        });
    }

    // 2. MENU MOBILE
    // Setelah link navbar diklik, collapse Bootstrap ditutup lagi (kalau lagi kebuka di mobile)
    const navbarCollapseEl = document.getElementById('navbarKopnus');

    $('.nav-link').on('click', function() {
        if (navbarCollapseEl.classList.contains('show')) {
            bootstrap.Collapse.getOrCreateInstance(navbarCollapseEl).hide();
        }
    });

    // 3. TOMBOL SUKA + PENANDA MENU TERPOPULER
    // Klik pertama menambah 1, klik kedua membatalkan (mengurangi 1)
    // Card dengan like terbanyak otomatis dapat badge "Terpopuler"
    $('.btn-like').click(function() {
        const $tombol  = $(this);
        const $counter = $tombol.find('.like-count');
        const jumlah   = parseInt($counter.text());

        $tombol.toggleClass('liked');

        if ($tombol.hasClass('liked')) {
            $counter.text(jumlah + 1);
        } else {
            $counter.text(jumlah - 1);
        }

        perbaruiTerpopuler();

        // munculin toast notification
        const namaMenu = $tombol.closest('.card').find('h3').text();

        if ($tombol.hasClass('liked')) {
            tampilkanToast('Kamu menyukai ' + namaMenu, 'toast-suka');
        } else {
            tampilkanToast('Suka untuk ' + namaMenu + ' dibatalkan', 'toast-batal');
        }
    });

    function perbaruiTerpopuler() {
        let likeTertinggi = 0;

        // cari nilai like tertinggi di antara semua card
        $('.like-count').each(function() {
            let jumlah = parseInt($(this).text());
            if (jumlah > likeTertinggi) {
                likeTertinggi = jumlah;
            }
        });

        // bersihkan badge dari semua card dulu
        $('.card').removeClass('terpopuler');

        // kasih badge ke card dengan like tertinggi
        if (likeTertinggi > 0) {
            $('.like-count').each(function() {
                if (parseInt($(this).text()) === likeTertinggi) {
                    $(this).closest('.card').addClass('terpopuler');
                }
            });
        }
    }

    // 4. TOMBOL KEMBALI KE ATAS
    // Muncul setelah halaman di-scroll, klik untuk kembali ke atas
    const $tombolAtas = $('#back-to-top');

    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $tombolAtas.fadeIn(300);
        } else {
            $tombolAtas.fadeOut(300);
        }
    });

    $tombolAtas.click(function() {
        // scroll-behavior: smooth di CSS membuat animate() patah-patah,
        // jadi dimatikan sementara selama animasi lalu dikembalikan
        $('html').css('scroll-behavior', 'auto');
        $('html, body').animate({ scrollTop: 0 }, 600, function() {
            $('html').css('scroll-behavior', '');
        });
    });

    // 5. VALIDASI FORM KONTAK
    const $form       = $('#form-kontak');
    const $nama       = $('#nama');
    const $email      = $('#email');
    const $pesan      = $('#pesan');
    const $formStatus = $('#form-status');

    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function tampilkanError($input, pesan) {
        $input.addClass('input-error');
        $input.next('.error-msg').text(pesan);
    }

    function hapusError($input) {
        $input.removeClass('input-error');
        $input.next('.error-msg').text('');
    }

    $form.find('input, textarea').on('input', function() {
        hapusError($(this));
    });

    $form.submit(function(event) {
        event.preventDefault();

        const isiNama  = $nama.val().trim();
        const isiEmail = $email.val().trim();
        const isiPesan = $pesan.val().trim();

        let valid = true;

        if (isiNama === '') {
            tampilkanError($nama, 'Nama wajib diisi.');
            valid = false;
        } else if (isiNama.length < 3) {
            tampilkanError($nama, 'Nama minimal 3 huruf.');
            valid = false;
        } else {
            hapusError($nama);
        }

        if (isiEmail === '') {
            tampilkanError($email, 'Email wajib diisi.');
            valid = false;
        } else if (!polaEmail.test(isiEmail)) {
            tampilkanError($email, 'Format email belum benar, contoh: nama@email.com');
            valid = false;
        } else {
            hapusError($email);
        }

        if (isiPesan === '') {
            tampilkanError($pesan, 'Pesan wajib diisi.');
            valid = false;
        } else if (isiPesan.length < 10) {
            tampilkanError($pesan, 'Pesan minimal 10 karakter.');
            valid = false;
        } else {
            hapusError($pesan);
        }

        if (!valid) {
            $form.find('.input-error').first().focus();
            return;
        }

        $formStatus
            .text('Terima kasih, ' + isiNama + '! Pesan kamu sudah terkirim.')
            .slideDown(300)
            .delay(4000)
            .slideUp(300);

        this.reset();
    });

});

// 6. ANIMASI REVEAL SAAT SCROLL
// dipasang di luar $(document).ready karena pakai IntersectionObserver,
// bukan event jQuery tapi tetap aman karena DOM sudah siap saat script ini jalan

// pasang animasi reveal ke sekumpulan elemen, muncul satu-satu (staggered)
function pasangAnimasi(selector, jedaAntarElemen) {
    const elemenList = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                let index = Array.from(elemenList).indexOf(entry.target);
                setTimeout(function() {
                    entry.target.classList.add('tampil');
                }, index * jedaAntarElemen);
            } else {
                entry.target.classList.remove('tampil');
            }
        });
    }, { threshold: 0.2 });

    elemenList.forEach(function(elemen) {
        observer.observe(elemen);
    });
}

// 7. TOAST NOTIFICATION
// popup kecil di pojok kiri bawah. muncul lalu ilang sendiri
const $toastWadah = $('#toast-container');

function tampilkanToast(pesan, tipe) {
    // batasin maksimum 3 toast notif yg muncul
    if ($toastWadah.children().length >= 3) {
        $toastWadah.children().first().remove();
    }

    const $toast = $('<div class="toast"></div>')
        .addClass(tipe)
        .text(pesan)
        .hide()
        .appendTo($toastWadah);

    $toast.slideDown(250)
            .delay(2500)
            .fadeOut(300, function() {
                $(this).remove();
            });
}

// 8. STATUS BUKA DAN TUTUP
// cek jam sekarang dan jadiin status buka ato tutup
const $statusBuka = $('#status-buka');
const JAM_BUKA    = 8;
const JAM_TUTUP   = 21;

function formatJam(jam) {
    return String(jam).padStart(2, '0') + '.00';
}

function perbaruiStatusBuka() {
    // paksa zona jam jadi kayak di jkt
    const jamSekarang = parseInt(new Date().toLocaleString('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        hourCycle: 'h23'
    }), 10);

    const sedangBuka = jamSekarang >= JAM_BUKA && jamSekarang < JAM_TUTUP;

    $statusBuka
        .toggleClass('buka', sedangBuka)
        .toggleClass('tutup', !sedangBuka)
        .text(sedangBuka
            ? 'Buka sekarang · sampai ' + formatJam(JAM_TUTUP) + ' WIB'
            : 'Tutup · buka lagi pukul ' + formatJam(JAM_BUKA) + ' WIB');
}

perbaruiStatusBuka();
setInterval(perbaruiStatusBuka, 60000);

// Tentang Kami
pasangAnimasi('.tentang-flex', 0);

// card menu (muncul satu-satu, jeda 150ms)
pasangAnimasi('.card', 150);

// FAQ (muncul satu-satu, jeda 120ms)
pasangAnimasi('.faq-item', 120);