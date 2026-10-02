import {
  inicioTemplate,
  projetosTemplate,
  voluntariadoTemplate,
  sobreTemplate,
  contatoTemplate,
  notFoundTemplate
} from "./templates.js";
import { setActiveRoute, closeMenu } from "./ui.js";

let shouldMoveFocus = false;

const routes = {
  "/inicio": inicioTemplate,
  "/projetos": projetosTemplate,
  "/voluntariado": voluntariadoTemplate,
  "/sobre": sobreTemplate,
  "/contato": contatoTemplate
};

function parseHash() {
  const raw = location.hash.replace(/^#/, "") || "/inicio";
  const [path, query = ""] = raw.split("?");
  return { path, query };
}

export function renderRoute() {
  const app = document.querySelector("#app");
  if (!app) return;

  const { path, query } = parseHash();
  const template = routes[path];

  app.innerHTML = template ? template(query) : notFoundTemplate();
  setActiveRoute(path);
  closeMenu();

  window.scrollTo({ top: 0, behavior: "auto" });

  if (shouldMoveFocus) {
    app.focus({ preventScroll: true });
    shouldMoveFocus = false;
  }

  document.dispatchEvent(new CustomEvent("route:rendered", {
    detail: { path, query }
  }));
}

export function navigate(route) {
  shouldMoveFocus = true;
  const nextHash = `#${route}`;
  if (location.hash === nextHash) {
    renderRoute();
  } else {
    location.hash = route;
  }
}

export function initRouter() {
  window.addEventListener("hashchange", renderRoute);
  if (!location.hash) {
    location.hash = "/inicio";
  } else {
    renderRoute();
  }
}