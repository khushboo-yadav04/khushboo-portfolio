// ===== AOS INIT =====
AOS.init({ offset: 0, once: true });

// ===== NAVBAR =====
function hamburg() {
  document.querySelector(".dropdown").style.transform = "translateY(0px)";
}
function cancel() {
  document.querySelector(".dropdown").style.transform = "translateY(-600px)";
}

// Close dropdown when mobile link is clicked
document.querySelectorAll(".dropdown .links a").forEach(link => {
  link.addEventListener("click", () => cancel());
});

// ===== SMOOTH SCROLL + ACTIVE LINK =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      cancel();
    }
  });
});

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar .links a");
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === "#" + current) link.classList.add("active-link");
  });
});

// ===== TYPEWRITER =====
const roles = ["Developer", "Designer", "Coder", "Freelancer"];
let roleIndex = 0, charIndex = 0, deleting = false;
const typeEl = document.getElementById("typewriter-text");

function type() {
  if (!typeEl) return;
  const current = roles[roleIndex];
  typeEl.textContent = deleting
    ? current.slice(0, --charIndex)
    : current.slice(0, ++charIndex);
  if (!deleting && charIndex === current.length) {
    deleting = true; setTimeout(type, 1600); return;
  }
  if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(type, deleting ? 75 : 120);
}
type();

// ===== SKILL BARS =====
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".skill-fill").forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
      skillObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
const skillsSection = document.getElementById("skills");
if (skillsSection) skillObserver.observe(skillsSection);

// ===== PROJECT FILTER =====
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    // Update active button
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("hidden");
        card.style.animation = "fadeIn 0.4s ease";
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// ===== CONTACT FORM =====
document.getElementById("contact-form")?.addEventListener("submit", e => {
  e.preventDefault();
  const name = e.target.name.value.trim();
  const email = e.target.email.value.trim();
  const message = e.target.message.value.trim();
  if (!name || !email || !message) { showToast("Please fill in all fields!"); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast("Enter a valid email!"); return; }
  showToast("Thanks " + name + "! Message sent!");
  e.target.reset();
});

// ===== DOWNLOAD CV =====
document.getElementById("downloadBtn")?.addEventListener("click", () => {
  const a = document.createElement("a");
  a.href = "Khushboo_CV.pdf";
  a.download = "Khushboo_Yadav_CV.pdf";
  a.click();
  showToast("Downloading CV...");
});

// ===== BACK TO TOP =====
const topBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (topBtn) topBtn.style.display = window.scrollY > 300 ? "flex" : "none";
});
topBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}
