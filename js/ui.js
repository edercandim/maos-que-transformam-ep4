let toastTimer;
let lastFocusedElement = null;
const contrastStorageKey = "maos_que_transformam_alto_contraste";

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

export function trapFocusInModal(event) {
  if (event.key !== "Tab") return;

  const modal = document.querySelector("[data-modal]");
  if (!modal || modal.hidden) return;

  const focusable = [...modal.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )].filter(element => !element.hasAttribute("hidden"));

  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
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

export function initAccessibilityPreferences() {
  const button = document.querySelector(".contrast-toggle");
  if (!button) return;

  let enabled = false;
  try {
    enabled = localStorage.getItem(contrastStorageKey) === "true";
  } catch {
    enabled = false;
  }

  document.body.classList.toggle("high-contrast", enabled);
  button.setAttribute("aria-pressed", String(enabled));
  button.setAttribute(
    "aria-label",
    enabled ? "Desativar modo de alto contraste" : "Ativar modo de alto contraste"
  );
}

export function toggleHighContrast() {
  const button = document.querySelector(".contrast-toggle");
  if (!button) return;

  const enabled = !document.body.classList.contains("high-contrast");
  document.body.classList.toggle("high-contrast", enabled);
  button.setAttribute("aria-pressed", String(enabled));
  button.setAttribute(
    "aria-label",
    enabled ? "Desativar modo de alto contraste" : "Ativar modo de alto contraste"
  );

  try {
    localStorage.setItem(contrastStorageKey, String(enabled));
  } catch {
    // A preferência continua válida durante a sessão atual.
  }
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