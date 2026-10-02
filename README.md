# Mãos que Transformam — Experiência Prática III

Projeto reorganizado como Single Page Application (SPA) em JavaScript modular.

## Estrutura

- `html/index.html`: casca principal da SPA.
- `css/style.css`: design system, Grid, Flexbox, responsividade e estados visuais.
- `imagens/logo.svg`: recurso visual local.
- `js/app.js`: inicialização e eventos globais.
- `js/router.js`: roteamento por hash e renderização dentro de `#app`.
- `js/templates.js`: templates dinâmicos e componentes.
- `js/storage.js`: persistência via `localStorage`.
- `js/validation.js`: validação e feedback visual dos formulários.
- `js/ui.js`: menu, dropdown, modal, toast e estado ativo.
- `js/data.js`: dados de origem dos cards de projeto.

## Funcionalidades exigidas pela EP III

- SPA sem recarregamento entre rotas.
- Manipulação do DOM.
- Templates JavaScript reutilizáveis.
- Eventos `click`, `submit`, `input`, `blur`, `keydown` e `hashchange`.
- Uso de `preventDefault()`.
- Validação de formulário.
- Feedback visual de sucesso e erro.
- Persistência com `localStorage`.
- Recuperação dos dados após F5.
- Exclusão de registros persistidos.
- ES6 Modules com `import` / `export`.
- Menu hambúrguer, dropdown, modal e toast.
- 5 breakpoints e Grid de 12 colunas herdados da EP anterior.

## Como executar

Como o projeto usa ES6 Modules, abra com um servidor local.

No VS Code:
1. Instale/abra a extensão **Live Server**.
2. Abra `html/index.html`.
3. Clique em **Open with Live Server**.

Não abra apenas com duplo clique em `index.html`, pois alguns navegadores restringem módulos ES6 usando `file://`.
