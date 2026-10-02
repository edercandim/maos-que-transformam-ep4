let toastTimer;
let lastFocusedElement = null;

export function showToast(message) {
  const toast = document.querySelector(".toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

export function openModal() {
  const modal = document.querySelector("[data-modal]");
  if (!modal) return;

  lastFocusedElement = document.activeElement;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector("[data-close-modal]")?.focus();
}

export function closeModal() {
  const modal = document.querySelector("[data-modal]");
  if (!modal) return;

  modal.hidden = true;
  document.body.style.overflow = "";
  lastFocusedElement?.focus();
}

export function toggleMenu() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (!button || !nav) return;

  const isOpen = nav.classList.toggle("open");
  button.classList.toggle("open", isOpen);
  button.setAttribute("aria-expanded", String(isOpen));
  button.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
}

export function closeMenu() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  nav?.classList.remove("open");
  button?.classList.remove("open");
  button?.setAttribute("aria-expanded", "false");
  button?.setAttribute("aria-label", "Abrir menu");
}

export function toggleDropdown() {
  const dropdown = document.querySelector(".nav-dropdown");
  const toggle = document.querySelector(".nav-dropdown-toggle");
  if (!dropdown || !toggle) return;

  const mobile = window.matchMedia("(max-width: 768px)").matches;
  if (!mobile) return;

  const isOpen = dropdown.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
}

export function setActiveRoute(path) {
  document.querySelectorAll("[data-route]").forEach(link => {
    const target = link.dataset.route?.split("?")[0];
    const active = target === path;

    link.classList.toggle("is-active", active);

    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}