/* ===========================
   GreenVest — JavaScript
   =========================== */

// ---------- DOM References ----------
const modal = document.getElementById("auth-modal");
const modalKicker = document.getElementById("modal-kicker");
const modalTitle = document.getElementById("modal-title");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const contactForm = document.getElementById("contact-form");
const modalMessage = document.getElementById("modal-message");
const tabLogin = document.getElementById("tab-login");
const tabRegister = document.getElementById("tab-register");
const tabContact = document.getElementById("tab-contact");
const menu = document.getElementById("mobile-menu");
const btn = document.getElementById("menu-toggle");
const io = document.getElementById("icon-open");
const ic = document.getElementById("icon-close");

// ---------- FAQ ----------
function toggleFaq(button) {
  const answer = button.nextElementSibling;
  const icon = button.querySelector(".faq-icon");
  const isOpen = answer.classList.contains("open");

  document
    .querySelectorAll(".faq-answer")
    .forEach((el) => el.classList.remove("open"));
  document.querySelectorAll(".faq-icon").forEach((el) => {
    el.classList.remove("open");
    el.textContent = "+";
  });
  document
    .querySelectorAll(".faq-toggle")
    .forEach((el) => el.setAttribute("aria-expanded", "false"));

  if (!isOpen) {
    answer.classList.add("open");
    icon.classList.add("open");
    icon.textContent = "+";
    button.setAttribute("aria-expanded", "true");
  }
}

// ---------- Mobile Menu ----------
function toggleMenu() {
  const isOpen = menu.classList.contains("open");
  menu.classList.toggle("open");
  io.classList.toggle("hidden", isOpen);
  ic.classList.toggle("hidden", !isOpen);
  btn.setAttribute("aria-expanded", String(!isOpen));
}

function closeMenu() {
  menu.classList.remove("open");
  io.classList.remove("hidden");
  ic.classList.add("hidden");
  btn.setAttribute("aria-expanded", "false");
}

// ---------- Modal Tabs ----------
function setActiveTab(active) {
  [tabLogin, tabRegister, tabContact].forEach(
    (tab) =>
      (tab.className =
        "flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-500"),
  );
  if (active === "login")
    tabLogin.className =
      "flex-1 py-2.5 rounded-xl text-sm font-semibold bg-white text-forest-900 shadow-sm";
  if (active === "register")
    tabRegister.className =
      "flex-1 py-2.5 rounded-xl text-sm font-semibold bg-white text-forest-900 shadow-sm";
  if (active === "contact")
    tabContact.className =
      "flex-1 py-2.5 rounded-xl text-sm font-semibold bg-white text-forest-900 shadow-sm";
}

// ---------- Modal Messages ----------
function showMessage(type, text) {
  modalMessage.className = "mt-4 rounded-xl border px-4 py-3 text-sm";
  modalMessage.classList.remove("hidden");
  if (type === "success")
    modalMessage.classList.add(
      "bg-emerald-50",
      "border-emerald-200",
      "text-emerald-800",
    );
  else
    modalMessage.classList.add("bg-red-50", "border-red-200", "text-red-700");
  modalMessage.textContent = text;
}

// ---------- Auth Mode Switch ----------
function switchAuthMode(mode) {
  loginForm.classList.add("hidden");
  registerForm.classList.add("hidden");
  contactForm.classList.add("hidden");
  modalMessage.classList.add("hidden");

  if (mode === "login") {
    loginForm.classList.remove("hidden");
    modalKicker.textContent = "Masuk";
    modalTitle.textContent = "Selamat datang kembali";
  } else if (mode === "register") {
    registerForm.classList.remove("hidden");
    modalKicker.textContent = "Daftar";
    modalTitle.textContent = "Buat akun GreenVest";
  } else {
    contactForm.classList.remove("hidden");
    modalKicker.textContent = "Sales";
    modalTitle.textContent = "Hubungi tim kami";
  }

  setActiveTab(mode);
}

// ---------- Modal Open / Close ----------
function openModal(mode = "login") {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  switchAuthMode(mode);
  setTimeout(() => {
    const visibleField = modal.querySelector(
      "form:not(.hidden) input, form:not(.hidden) textarea",
    );
    if (visibleField) visibleField.focus();
  }, 0);
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// ---------- Password Toggle ----------
function togglePassword(inputId, button) {
  const input = document.getElementById(inputId);
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  button.textContent = isHidden ? "Hide" : "Show";
}

// ---------- Notice / Reset ----------
function showNotice(type) {
  if (type === "reset")
    showMessage(
      "success",
      "Link reset password demo sudah dikirim ke email kamu.",
    );
  else showMessage("success", "Tim GreenVest akan menghubungi kamu segera.");
}

// ---------- Form Submissions ----------
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showMessage("success", "Login demo berhasil. Selamat datang di GreenVest.");
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showMessage(
    "success",
    "Akun demo berhasil dibuat. Silakan lanjut ke dashboard.",
  );
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showMessage(
    "success",
    "Pesan kamu sudah diterima. Tim kami akan menghubungi kamu.",
  );
});

// ---------- Global Event Listeners ----------
document.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeMenu();
  }
});

// ---------- Scroll: Fade-up + Navbar Shadow ----------
window.addEventListener("scroll", () => {
  document.querySelectorAll(".fade-up").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add("visible");
  });
  const nav = document.querySelector("nav");
  nav.style.boxShadow =
    window.scrollY > 20 ? "0 4px 30px rgba(11,32,22,.12)" : "none";
});

// ---------- Init on Load ----------
document.querySelectorAll(".fade-up").forEach((el) => {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) el.classList.add("visible");
});

setActiveTab("login");
switchAuthMode("login");
