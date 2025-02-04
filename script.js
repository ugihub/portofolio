// Toggle Navbar for Burger Menu
const burger = document.getElementById("burger");
const navbar = document.getElementById("navbar");

burger.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// Daftar teks yang akan ditampilkan
const texts = [
  "I'm a new programmer.",
  "I create stunning websites.",
  "I create game in greenfoot.",
  "Let's build Together!",
];

// Fungsi untuk membuat efek ketik
function typeWriter(text, element, speed, callback) {
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(interval); // Hentikan interval setelah selesai
      setTimeout(callback, 1500); // Tunggu 1.5 detik sebelum menjalankan callback
    }
  }, speed);
}

// Fungsi untuk menghapus teks dengan efek backspace
function deleteText(element, speed, callback) {
  const text = element.textContent;
  let i = text.length;
  const interval = setInterval(() => {
    if (i > 0) {
      element.textContent = text.substring(0, i - 1);
      i--;
    } else {
      clearInterval(interval); // Hentikan interval setelah teks dihapus
      callback(); // Panggil callback untuk menulis teks berikutnya
    }
  }, speed);
}

// Fungsi utama untuk mengelola pergantian teks
function rotateTexts(index) {
  const textElement = document.getElementById("typing-text");
  const currentText = texts[index];

  // Efek pengetikan
  typeWriter(currentText, textElement, 80, () => {
    // Kecepatan dikurangi menjadi 80ms
    // Setelah selesai mengetik, hapus teks
    deleteText(textElement, 40, () => {
      // Kecepatan backspace 40ms
      // Pindah ke teks berikutnya
      const nextIndex = (index + 1) % texts.length; // Loop kembali ke awal jika sudah di akhir
      rotateTexts(nextIndex);
    });
  });
}

// Inisialisasi pergantian teks saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  rotateTexts(0); // Mulai dari teks pertama
});

// Intersection Observer for Fade-In Animation
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  });

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Feather Splash Background
function createFeatherSplash() {
  const heroSection = document.getElementById("hero");

  for (let i = 0; i < 50; i++) {
    const feather = document.createElement("div");
    feather.classList.add("feather");

    // Randomize position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    feather.style.left = `${x}vw`;
    feather.style.top = `${y}vh`;

    // Randomize size
    const size = Math.random() * 10 + 5; // Between 5px and 15px
    feather.style.width = `${size}px`;
    feather.style.height = `${size}px`;

    // Randomize animation duration and delay
    const duration = Math.random() * 5 + 3; // Between 3s and 8s
    const delay = Math.random() * 5; // Up to 5s delay
    feather.style.animationDuration = `${duration}s`;
    feather.style.animationDelay = `${delay}s`;

    heroSection.appendChild(feather);
  }
}

// Initialize Feather Splash
createFeatherSplash();

// Mouse Interaction
const feathers = document.querySelectorAll(".feather");
const heroSection = document.getElementById("hero");

heroSection.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;

  feathers.forEach((feather) => {
    const rect = feather.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance between mouse and feather
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Apply slight movement based on distance
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const maxDistance = 300; // Maximum distance for interaction effect
    const strength = Math.min(distance / maxDistance, 1);

    feather.style.transform = `translate(${deltaX * strength * 0.1}px, ${
      deltaY * strength * 0.1
    }px)`;
  });
});

// Scroll to Hero Functionality
function scrollToHero() {
  document.getElementById("hero").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Mencegah pengiriman formulir standar

    // Ambil nilai dari input
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Buat subjek dan isi email
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    // Buat tautan mailto
    const mailtoLink = `mailto:ugisugiman6@gmail.com?subject=${subject}&body=${body}`;

    // Buka aplikasi email default
    window.location.href = mailtoLink;

    // Kosongkan formulir setelah dikirim (opsional)
    form.reset();
  });
});
