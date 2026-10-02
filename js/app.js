import { initRouter, navigate } from "./router.js";
import { addVoluntario, getVoluntarios, removeVoluntario } from "./storage.js";
import { bindRealtimeValidation, clearValidation, validateForm } from "./validation.js";
import { voluntarioCard } from "./templates.js";
import {
  showToast,
  openModal,
  closeModal,
  toggleMenu,
  toggleDropdown,
  toggleHighContrast,
  initAccessibilityPreferences,
  trapFocusInModal
} from "./ui.js";

function renderVoluntarios() {
  const list = document.querySelector("#volunteer-list");
  const count = document.querySelector("#volunteer-count");
  if (!list) return;

  const voluntarios = getVoluntarios();
  if (count) count.textContent = String(voluntarios.length);

  list.innerHTML = voluntarios.length
    ? voluntarios.map(voluntarioCard).join("")
    : `<div class="empty-state">Nenhum voluntário cadastrado ainda.</div>`;
}

function setupVolunteerForm() {
  const form = document.querySelector("#volunteer-form");
  if (!form) return;

  bindRealtimeValidation(form);
  renderVoluntarios();

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (!validateForm(form)) {
      const status = form.querySelector("#form-status");
      if (status) {
        status.textContent = "Revise os campos destacados antes de continuar.";
        status.style.color = "var(--color-error)";
      }
      showToast("Há campos que precisam ser corrigidos.");
      return;
    }

    const data = new FormData(form);
    const voluntario = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      nome: data.get("nome").trim(),
      email: data.get("email").trim(),
      telefone: data.get("telefone").trim(),
      idade: Number(data.get("idade")),
      area: data.get("area"),
      disponibilidade: data.get("disponibilidade"),
      criadoEm: new Date().toISOString()
    };

    const saved = addVoluntario(voluntario);
    const status = form.querySelector("#form-status");

    if (!saved) {
      if (status) {
        status.textContent = "Não foi possível salvar os dados no navegador.";
        status.style.color = "var(--color-error)";
      }
      showToast("Falha ao salvar o cadastro.");
      return;
    }

    form.reset();
    clearValidation(form);
    if (status) {
      status.textContent = "Cadastro salvo com sucesso.";
      status.style.color = "var(--color-success)";
    }

    renderVoluntarios();
    showToast("Voluntário salvo no localStorage.");
  });

  form.addEventListener("reset", () => {
    setTimeout(() => {
      clearValidation(form);
      const status = form.querySelector("#form-status");
      if (status) status.textContent = "";
    }, 0);
  });
}

function setupContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  bindRealtimeValidation(form);

  form.addEventListener("submit", event => {
    event.preventDefault();
    const status = form.querySelector("#contact-status");

    if (!validateForm(form)) {
      if (status) {
        status.textContent = "Corrija os campos destacados.";
        status.style.color = "var(--color-error)";
      }
      return;
    }

    if (status) {
      status.textContent = "Mensagem validada e processada com sucesso.";
      status.style.color = "var(--color-success)";
    }

    showToast("Mensagem enviada com sucesso.");
    form.reset();
    clearValidation(form);
  });
}

document.addEventListener("click", event => {
  const routeLink = event.target.closest("[data-route]");
  if (routeLink) {
    event.preventDefault();
    const route = routeLink.dataset.route;
    if (route) navigate(route);

    if (routeLink.hasAttribute("data-close-modal")) closeModal();
    return;
  }

  if (event.target.closest(".menu-toggle")) {
    toggleMenu();
    return;
  }

  if (event.target.closest(".nav-dropdown-toggle")) {
    toggleDropdown();
    return;
  }

  if (event.target.closest(".contrast-toggle")) {
    toggleHighContrast();
    return;
  }

  if (event.target.closest("[data-open-modal]")) {
    openModal();
    return;
  }

  if (event.target.closest("[data-close-modal]")) {
    closeModal();
    return;
  }

  const deleteButton = event.target.closest("[data-delete-volunteer]");
  if (deleteButton) {
    const id = deleteButton.dataset.deleteVolunteer;
    removeVoluntario(id);
    renderVoluntarios();
    showToast("Cadastro removido.");
    return;
  }

  const modal = document.querySelector("[data-modal]");
  if (modal && event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", event => {
  trapFocusInModal(event);

  if (event.key === "Escape") {
    closeModal();

    document.querySelector(".main-nav")?.classList.remove("open");
    document.querySelector(".menu-toggle")?.classList.remove("open");
    document.querySelector(".menu-toggle")?.setAttribute("aria-expanded", "false");

    document.querySelector(".nav-dropdown")?.classList.remove("open");
    document.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("route:rendered", event => {
  const { path } = event.detail;

  if (path === "/voluntariado") {
    setupVolunteerForm();
  }

  if (path === "/contato") {
    setupContactForm();
  }
});

initAccessibilityPreferences();
initRouter();
