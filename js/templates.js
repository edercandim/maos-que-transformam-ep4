import { projetos } from "./data.js";
import { getVoluntarios } from "./storage.js";

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function projetoCard(projeto) {
  return `
    <article class="project-card">
      <span class="badge badge-info">${escapeHTML(projeto.badge)}</span>
      <div class="card-icon" aria-hidden="true">${projeto.icone}</div>
      <h3>${escapeHTML(projeto.titulo)}</h3>
      <p>${escapeHTML(projeto.descricao)}</p>
    </article>
  `;
}

export function inicioTemplate() {
  return `
    <section class="hero">
      <div class="container grid-12 hero-grid">
        <div class="hero-content">
          <p class="eyebrow">SPA dinâmica</p>
          <h1>Pequenas ações podem transformar grandes histórias.</h1>
          <p class="hero-text">
            Esta aplicação utiliza JavaScript para navegar entre conteúdos sem recarregar a página,
            validar formulários e persistir dados no navegador.
          </p>
          <div class="button-row">
            <a class="btn btn-primary" href="#/voluntariado" data-route="/voluntariado">Quero ser voluntário</a>
            <button class="btn btn-secondary" type="button" data-open-modal>Conhecer a ONG</button>
          </div>
        </div>
        <aside class="hero-card">
          <p class="eyebrow">Recursos implementados</p>
          <div class="stats">
            <div><strong>SPA</strong><span>navegação dinâmica</span></div>
            <div><strong>DOM</strong><span>templates e eventos</span></div>
            <div><strong>Storage</strong><span>dados persistentes</span></div>
          </div>
        </aside>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">Projetos</p>
          <h2>Algumas iniciativas da organização</h2>
        </div>
        <div class="grid-12">
          ${projetos.slice(0, 3).map(projetoCard).join("")}
        </div>
      </div>
    </section>
  `;
}

export function projetosTemplate(search = "") {
  const params = new URLSearchParams(search);
  const categoria = params.get("categoria");
  const filtrados = categoria ? projetos.filter(p => p.categoria === categoria) : projetos;

  return `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">Templates dinâmicos</p>
        <h1>Projetos sociais</h1>
        <p>Os cards abaixo são gerados em JavaScript a partir de um array de objetos.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="grid-12">
          ${filtrados.length ? filtrados.map(projetoCard).join("") : `<div class="alert alert-warning">Nenhum projeto encontrado nessa categoria.</div>`}
        </div>
      </div>
    </section>
  `;
}

export function voluntariadoTemplate() {
  const total = getVoluntarios().length;

  return `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">Eventos + validação + localStorage</p>
        <h1>Cadastro de voluntários</h1>
        <p>Cadastros salvos permanecem disponíveis após atualizar ou reabrir a página.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <form id="volunteer-form" class="form-card" novalidate>
          <div class="form-grid">
            <div class="field">
              <label for="nome">Nome completo *</label>
              <input id="nome" name="nome" type="text" minlength="3" maxlength="80" required>
              <small class="field-message">Digite pelo menos 3 caracteres.</small>
            </div>

            <div class="field">
              <label for="email">E-mail *</label>
              <input id="email" name="email" type="email" maxlength="120" required>
              <small class="field-message">Informe um e-mail válido.</small>
            </div>

            <div class="field">
              <label for="telefone">Telefone *</label>
              <input id="telefone" name="telefone" type="tel"
                pattern="\\(?\\d{2}\\)?\\s?9?\\d{4}-?\\d{4}"
                placeholder="(41) 99999-9999" required>
              <small class="field-message">Informe um telefone válido.</small>
            </div>

            <div class="field">
              <label for="idade">Idade *</label>
              <input id="idade" name="idade" type="number" min="16" max="100" required>
              <small class="field-message">A idade mínima é 16 anos.</small>
            </div>

            <div class="field">
              <label for="area">Área de interesse *</label>
              <select id="area" name="area" required>
                <option value="">Selecione</option>
                <option value="Educação">Educação</option>
                <option value="Arrecadação">Arrecadação</option>
                <option value="Tecnologia">Tecnologia</option>
                <option value="Eventos">Eventos</option>
              </select>
              <small class="field-message">Selecione uma área.</small>
            </div>

            <div class="field">
              <label for="disponibilidade">Disponibilidade *</label>
              <select id="disponibilidade" name="disponibilidade" required>
                <option value="">Selecione</option>
                <option value="Manhã">Manhã</option>
                <option value="Tarde">Tarde</option>
                <option value="Noite">Noite</option>
                <option value="Finais de semana">Finais de semana</option>
              </select>
              <small class="field-message">Selecione sua disponibilidade.</small>
            </div>

            <div class="field field-full checkbox-field">
              <input id="termos" name="termos" type="checkbox" required>
              <label for="termos">Autorizo o uso dos dados para contato sobre voluntariado. *</label>
            </div>
          </div>

          <div id="form-status" class="form-status" aria-live="polite"></div>

          <div class="button-row">
            <button class="btn btn-primary" type="submit">Salvar voluntário</button>
            <button class="btn btn-secondary" type="reset">Limpar</button>
          </div>
        </form>

        <div class="section-heading" style="margin-top:3rem">
          <p class="eyebrow">Dados persistentes</p>
          <h2>Voluntários cadastrados (<span id="volunteer-count">${total}</span>)</h2>
        </div>
        <div id="volunteer-list" class="volunteer-list"></div>
      </div>
    </section>
  `;
}

export function voluntarioCard(voluntario) {
  return `
    <article class="volunteer-card" data-volunteer-id="${escapeHTML(voluntario.id)}">
      <div>
        <span class="badge badge-success">${escapeHTML(voluntario.area)}</span>
        <h3>${escapeHTML(voluntario.nome)}</h3>
        <p><strong>E-mail:</strong> ${escapeHTML(voluntario.email)}</p>
        <p><strong>Telefone:</strong> ${escapeHTML(voluntario.telefone)}</p>
        <p><strong>Idade:</strong> ${escapeHTML(voluntario.idade)}</p>
        <p><strong>Disponibilidade:</strong> ${escapeHTML(voluntario.disponibilidade)}</p>
      </div>
      <button class="btn btn-danger" type="button" data-delete-volunteer="${escapeHTML(voluntario.id)}">
        Excluir
      </button>
    </article>
  `;
}

export function sobreTemplate() {
  return `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">Sobre</p>
        <h1>Uma aplicação organizada por responsabilidades</h1>
        <p>O projeto separa roteamento, templates, persistência, validação e interface em módulos JavaScript independentes.</p>
      </div>
    </section>
    <section class="section">
      <div class="container grid-12">
        <article class="info-card" style="grid-column:1 / span 6">
          <h2>Arquitetura</h2>
          <p>O arquivo principal inicializa a SPA, enquanto módulos menores concentram funções específicas e reutilizáveis.</p>
        </article>
        <article class="info-card" style="grid-column:7 / -1">
          <h2>Objetivo técnico</h2>
          <p>Reduzir acoplamento, facilitar testes, localizar falhas com mais rapidez e manter o código escalável.</p>
        </article>
      </div>
    </section>
  `;
}

export function contatoTemplate() {
  return `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">Contato</p>
        <h1>Envie uma mensagem</h1>
        <p>O formulário também utiliza eventos e validação antes de aceitar o envio.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <form id="contact-form" class="form-card" novalidate>
          <div class="form-grid">
            <div class="field">
              <label for="contato-nome">Nome *</label>
              <input id="contato-nome" name="nome" type="text" minlength="3" required>
              <small class="field-message">Digite seu nome.</small>
            </div>
            <div class="field">
              <label for="contato-email">E-mail *</label>
              <input id="contato-email" name="email" type="email" required>
              <small class="field-message">Informe um e-mail válido.</small>
            </div>
            <div class="field field-full">
              <label for="contato-msg">Mensagem *</label>
              <textarea id="contato-msg" name="mensagem" rows="6" minlength="10" maxlength="600" required></textarea>
              <small class="field-message">Escreva pelo menos 10 caracteres.</small>
            </div>
          </div>
          <div class="button-row">
            <button class="btn btn-primary" type="submit">Enviar mensagem</button>
          </div>
          <div id="contact-status" class="form-status" aria-live="polite"></div>
        </form>
      </div>
    </section>
  `;
}

export function notFoundTemplate() {
  return `
    <section class="section">
      <div class="container">
        <div class="alert alert-warning">
          <h1>Página não encontrada</h1>
          <p>A rota solicitada não existe.</p>
          <a class="btn btn-primary" href="#/inicio" data-route="/inicio">Voltar ao início</a>
        </div>
      </div>
    </section>
  `;
}
