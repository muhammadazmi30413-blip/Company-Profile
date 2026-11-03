// GANTI dengan nomor WhatsApp Anda: kode negara + nomor, tanpa +, spasi, atau 0 di depan (contoh: 6281234567890)
const WA_NUMBER = '6289620881770';
const waLink = text => `https://wa.me/${WA_NUMBER}` + (text ? `?text=${encodeURIComponent(text)}` : '');

// Menu mobile
const btn = document.getElementById('menuBtn');
const links = document.getElementById('navLinks');
btn.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
  btn.textContent = open ? '✕' : '☰';
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open'); btn.textContent = '☰';
}));

// Bayangan header saat scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 10));

// Tahun otomatis di footer
document.getElementById('year').textContent = new Date().getFullYear();

// Validasi form kontak (hanya ada di halaman Home)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    const rules = {
      name: v => v.trim().length >= 3 || 'Nama minimal 3 karakter.',
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Format email belum benar.',
      message: v => v.trim().length >= 10 || 'Pesan minimal 10 karakter.'
    };
    for (const id in rules) {
      const field = form.elements[id];
      const result = rules[id](field.value);
      document.getElementById(id + 'Err').textContent = result === true ? '' : result;
      if (result !== true) valid = false;
    }
    const msg = document.getElementById('formMsg');
    if (valid) {
      const text = `Halo Nextwave Digital Company,\nNama: ${form.elements.name.value.trim()}\nEmail: ${form.elements.email.value.trim()}\n\n${form.elements.message.value.trim()}`;
      window.open(waLink(text), '_blank', 'noopener');
      msg.textContent = 'Mengalihkan ke WhatsApp... Tekan kirim di WhatsApp untuk menyelesaikan.';
      form.reset();
    }
    else msg.textContent = '';
  });
}

// Pindah halaman Home <-> About Us (tanpa reload)
const pages = { home: document.getElementById('page-home'), about: document.getElementById('page-about') };
const menuLinks = document.querySelectorAll('.nav-links a[data-page]');
function route() {
  const hash = location.hash.slice(1) || 'home';
  const page = hash === 'about' ? 'about' : 'home';
  for (const key in pages) pages[key].hidden = key !== page;
  menuLinks.forEach(a => a.classList.toggle('active', a.dataset.page === page));
  const target = (hash !== 'home' && hash !== 'about') ? document.getElementById(hash) : null;
  if (target) target.scrollIntoView(); else window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
route();

// Tombol Chat via WhatsApp
const waBtn = document.getElementById('waBtn');
if (waBtn) waBtn.href = waLink('Halo Nextwave Digital Company, saya ingin berkonsultasi.');
