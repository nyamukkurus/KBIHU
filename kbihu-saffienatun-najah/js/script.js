const WA_NUMBER = "62XXXXXXXXXXX"; // GANTI DATA DI SINI
const WA_MESSAGE = "Assalamu'alaikum, saya ingin mendapatkan informasi mengenai program Haji/Umroh KBIHU Saffienatun Najah.";

const programs = [
  {title:"Umroh Reguler",type:"umroh",duration:"9-12 Hari",image:"assets/images/program-umroh.svg",items:["Hotel","Transportasi","Konsumsi","Pembimbing","Manasik"],button:"Detail Program"},
  {title:"Umroh Plus",type:"umroh",duration:"12-15 Hari",image:"assets/images/program-plus.svg",items:["Program Umroh","City Tour","Hotel","Transportasi","Pembimbing"],button:"Detail Program"},
  {title:"Bimbingan Haji",type:"haji",duration:"Mengikuti jadwal resmi",image:"assets/images/program-haji.svg",items:["Manasik Haji","Pembinaan","Konsultasi","Persiapan dokumen"],button:"Pelajari Program"},
  {title:"Manasik Umroh",type:"manasik",duration:"Jadwal diperbarui",image:"assets/images/gallery-manasik.svg",items:["Materi ibadah","Praktik","Tanya jawab","Simulasi perjalanan"],button:"Pelajari Program"}
];

const schedules = [
  {program:"Umroh Reguler",period:"Data segera diperbarui",duration:"9-12 Hari",status:"Segera Dibuka"},
  {program:"Umroh Plus",period:"Data segera diperbarui",duration:"12-15 Hari",status:"Tersedia"},
  {program:"Bimbingan Haji",period:"Data segera diperbarui",duration:"Bertahap",status:"Segera Dibuka"},
  {program:"Manasik",period:"Data segera diperbarui",duration:"1 Hari",status:"Penuh"}
];

const articles = [
  {title:"Panduan Persiapan Umroh",cat:"Umroh",date:"Data tanggal diperbarui",img:"assets/images/article-umroh.svg",excerpt:"Langkah awal menyiapkan fisik, dokumen, perlengkapan, dan bekal ilmu sebelum berangkat."},
  {title:"Hal yang Perlu Dipersiapkan Sebelum Berangkat",cat:"Persiapan",date:"Data tanggal diperbarui",img:"assets/images/article-dokumen.svg",excerpt:"Daftar persiapan yang membantu calon jamaah merasa lebih tenang."},
  {title:"Panduan Manasik",cat:"Manasik",date:"Data tanggal diperbarui",img:"assets/images/article-manasik.svg",excerpt:"Gambaran materi dan praktik manasik untuk Haji dan Umroh."},
  {title:"Tips Umroh untuk Lansia",cat:"Lansia",date:"Data tanggal diperbarui",img:"assets/images/article-lansia.svg",excerpt:"Hal-hal sederhana yang membantu kenyamanan jamaah lanjut usia."},
  {title:"Persiapan Dokumen Perjalanan",cat:"Dokumen",date:"Data tanggal diperbarui",img:"assets/images/article-dokumen.svg",excerpt:"Dokumen perjalanan perlu dicek sejak awal agar proses lebih tertata."},
  {title:"Doa dan Adab Perjalanan",cat:"Bekal Ibadah",date:"Data tanggal diperbarui",img:"assets/images/article-doa.svg",excerpt:"Pengingat adab perjalanan dan doa yang dapat dipelajari sebelum berangkat."}
];

const faqs = [
  ["Apa saja yang perlu disiapkan sebelum umroh?","Calon jamaah perlu menyiapkan dokumen, kondisi kesehatan, perlengkapan pribadi, serta mengikuti bimbingan manasik agar lebih siap."],
  ["Bagaimana proses pendaftaran?","Mulai dari konsultasi, memilih program, melengkapi data, mengikuti manasik, lalu persiapan keberangkatan."],
  ["Apakah tersedia bimbingan manasik?","Ya, informasi jadwal dan materi manasik akan disampaikan admin sesuai program."],
  ["Apakah jamaah lansia mendapatkan pendampingan?","Pelayanan dirancang memperhatikan kenyamanan jamaah lanjut usia. Detail pendampingan mengikuti program yang dipilih."],
  ["Apa saja dokumen yang perlu disiapkan?","Dokumen umum seperti identitas, paspor, dan dokumen pendukung lain akan dijelaskan admin sesuai kebutuhan program."],
  ["Bagaimana cara mengetahui jadwal keberangkatan?","Jadwal terbaru dapat ditanyakan melalui WhatsApp admin."],
  ["Bagaimana cara konsultasi dengan admin?","Klik tombol Konsultasi WhatsApp atau isi form konsultasi di halaman kontak."]
];

const testimonials = [
  ["Alhamdulillah, proses bimbingan terasa jelas dan kami lebih siap menghadapi perjalanan ibadah.","Jamaah Saffienatun Najah"],
  ["Penjelasan manasik mudah diikuti. Placeholder ini siap diganti dengan testimoni jamaah asli.","Jamaah Saffienatun Najah"],
  ["Admin membantu menjawab pertanyaan keluarga dengan tenang. Placeholder ini bukan identitas asli.","Jamaah Saffienatun Najah"]
];

const waLink = (text = WA_MESSAGE) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".loader")?.classList.add("hide");
  setupHeader();
  setupWhatsapp();
  renderPrograms("semua");
  setupProgramFilters();
  renderSchedules();
  renderArticles();
  setupArticleSearch();
  renderFaq();
  setupReveal();
  setupGallery();
  setupTestimonials();
  setupConsultForm();
  setupBackTop();
});

function setupHeader(){
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, {passive:true});
  toggle?.addEventListener("click", () => {
    nav?.classList.toggle("open");
    toggle.classList.toggle("open");
    toggle.setAttribute("aria-expanded", nav?.classList.contains("open") ? "true" : "false");
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.classList.remove("open");
  }));
}

function setupWhatsapp(){
  document.querySelectorAll("[data-wa]").forEach(link => link.setAttribute("href", waLink()));
}

function renderPrograms(filter){
  document.querySelectorAll("[data-program-list]").forEach(list => {
    const visible = programs.filter(item => filter === "semua" || item.type === filter);
    list.innerHTML = visible.map(item => `
      <article class="program-card reveal" data-type="${item.type}">
        <img src="${item.image}" alt="${item.title}">
        <div class="program-card-body">
          <span class="pill">${item.type.toUpperCase()}</span>
          <h3>${item.title}</h3>
          <div class="program-meta"><span class="pill"><i class="fa-regular fa-clock"></i> ${item.duration}</span></div>
          <ul>${item.items.map(feature => `<li>${feature}</li>`).join("")}</ul>
          <p class="price-note">Hubungi admin untuk harga terbaru</p>
          <a class="btn btn-primary" href="${waLink(`Assalamu'alaikum, saya ingin bertanya tentang ${item.title} KBIHU Saffienatun Najah.`)}">${item.button}</a>
        </div>
      </article>`).join("");
    setupReveal();
  });
}

function setupProgramFilters(){
  document.querySelectorAll("[data-program-filters]").forEach(group => {
    group.addEventListener("click", event => {
      const button = event.target.closest("button[data-filter]");
      if(!button) return;
      group.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      renderPrograms(button.dataset.filter);
    });
  });
}

function renderSchedules(){
  document.querySelectorAll("[data-schedule-list]").forEach(list => {
    list.innerHTML = `<div class="schedule-row head"><span>Program</span><span>Periode</span><span>Durasi</span><span>Status</span><span>Info</span></div>` +
      schedules.map(item => {
        const statusClass = item.status === "Tersedia" ? "tersedia" : item.status === "Penuh" ? "penuh" : "segera";
        return `<div class="schedule-row"><strong>${item.program}</strong><span>${item.period}</span><span>${item.duration}</span><span class="status ${statusClass}">${item.status}</span><a class="btn btn-soft" href="${waLink(`Assalamu'alaikum, saya ingin bertanya jadwal ${item.program}.`)}">Tanya Jadwal</a></div>`;
      }).join("");
  });
}

function renderArticles(items = articles){
  document.querySelectorAll("[data-article-list]").forEach(list => {
    const limit = Number(list.dataset.limit || items.length);
    list.innerHTML = items.slice(0, limit).map(item => `
      <article class="article-card reveal">
        <img src="${item.img}" alt="${item.title}">
        <div class="article-card-body">
          <span class="pill">${item.cat}</span>
          <p class="date">${item.date}</p>
          <h3>${item.title}</h3>
          <p>${item.excerpt}</p>
          <a class="link-more" href="#">Baca selengkapnya</a>
        </div>
      </article>`).join("") || `<p>Artikel tidak ditemukan.</p>`;
    setupReveal();
  });
}

function setupArticleSearch(){
  const input = document.querySelector("[data-article-search]");
  input?.addEventListener("input", () => {
    const q = input.value.toLowerCase();
    renderArticles(articles.filter(item => `${item.title} ${item.cat} ${item.excerpt}`.toLowerCase().includes(q)));
  });
}

function renderFaq(){
  document.querySelectorAll("[data-faq]").forEach(root => {
    root.innerHTML = faqs.map(([q,a], index) => `<article class="faq-item ${index === 0 ? "open" : ""}"><button class="faq-question" aria-expanded="${index === 0}">${q}<i class="fa-solid fa-plus"></i></button><div class="faq-answer"><p>${a}</p></div></article>`).join("");
    root.addEventListener("click", event => {
      const button = event.target.closest(".faq-question");
      if(!button) return;
      const item = button.parentElement;
      const open = item.classList.toggle("open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
}

function setupReveal(){
  const items = document.querySelectorAll(".reveal:not(.observed)");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("visible"));
  }, {threshold:.12});
  items.forEach(item => {
    item.classList.add("observed");
    observer.observe(item);
  });
}

function setupGallery(){
  const lightbox = document.querySelector("[data-lightbox]");
  if(!lightbox) return;
  const img = lightbox.querySelector("img");
  document.querySelector("[data-gallery]")?.addEventListener("click", event => {
    const button = event.target.closest("button[data-src]");
    if(!button) return;
    img.src = button.dataset.src;
    lightbox.classList.add("open");
  });
  document.querySelector("[data-close-lightbox]")?.addEventListener("click", () => lightbox.classList.remove("open"));
  lightbox.addEventListener("click", event => { if(event.target === lightbox) lightbox.classList.remove("open"); });
  document.addEventListener("keydown", event => { if(event.key === "Escape") lightbox.classList.remove("open"); });
}

function setupTestimonials(){
  const root = document.querySelector("[data-testimonial]");
  if(!root) return;
  let index = 0;
  const show = () => {
    root.querySelector("[data-quote]").textContent = testimonials[index][0];
    root.querySelector("[data-name]").textContent = testimonials[index][1];
  };
  root.querySelector("[data-next]")?.addEventListener("click", () => { index = (index + 1) % testimonials.length; show(); });
  root.querySelector("[data-prev]")?.addEventListener("click", () => { index = (index - 1 + testimonials.length) % testimonials.length; show(); });
  setInterval(() => { index = (index + 1) % testimonials.length; show(); }, 6500);
}

function setupConsultForm(){
  document.querySelectorAll("[data-consult-form]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const note = form.querySelector("[data-form-note]");
      if(!data.name || !data.phone || !data.program){
        note.textContent = "Mohon lengkapi nama, nomor WhatsApp, dan program.";
        note.style.color = "#9a2d2d";
        return;
      }
      const message = `Assalamu'alaikum, saya ingin konsultasi KBIHU Saffienatun Najah.

Nama: ${data.name}
Nomor WA: ${data.phone}
Program: ${data.program}
Perkiraan berangkat: ${data.date || "-"}
Jumlah jamaah: ${data.people || "-"}
Pesan: ${data.message || "-"}`;
      window.location.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    });
  });
}

function setupBackTop(){
  const button = document.querySelector("[data-back-top]");
  const toggle = () => button?.classList.toggle("show", window.scrollY > 600);
  toggle();
  window.addEventListener("scroll", toggle, {passive:true});
  button?.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));
}
