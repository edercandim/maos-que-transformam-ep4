# Mãos que Transformam

Aplicação web desenvolvida como projeto acadêmico de **Desenvolvimento Front-End**, simulando a presença digital de uma organização do terceiro setor.

O projeto foi construído sem frameworks de interface, com foco em **JavaScript moderno, arquitetura modular, experiência responsiva, acessibilidade, persistência local e boas práticas de versionamento**.

## Visão geral

A aplicação funciona como uma **Single Page Application (SPA)** com roteamento por hash e renderização dinâmica de conteúdo, evitando recarregamentos completos durante a navegação.

Entre os principais fluxos estão a apresentação de projetos sociais, cadastro de voluntários e persistência dos dados no navegador.

## Principais funcionalidades

- navegação SPA por hash;
- renderização dinâmica por templates JavaScript;
- cadastro e exclusão de voluntários;
- persistência com `localStorage`;
- validação de formulários com feedback visual;
- menu responsivo para dispositivos móveis;
- dropdown, modal e toast;
- navegação por teclado;
- gerenciamento de foco e `aria-current`;
- suporte a `prefers-reduced-motion`;
- tratamento seguro de dados inválidos no `localStorage`.

## Tecnologias e ferramentas

- **HTML5**
- **CSS3**
- **JavaScript ES6+**
- **ES Modules**
- **Node.js**
- **Git e GitHub**
- **Playwright**
- **axe-core**
- **esbuild**
- **Clean CSS**
- **HTML Minifier Terser**
- **SVGO**

O projeto utiliza JavaScript nativo no navegador. Node.js é usado no fluxo de desenvolvimento para build, minificação e validações automatizadas.

## Estrutura do projeto

```text
.github/    Configurações relacionadas ao GitHub
css/        Design system, layout e responsividade
docs/       Arquivos de documentação
html/       Estrutura principal da aplicação
imagens/    Recursos visuais
js/         Módulos JavaScript
scripts/    Scripts de build e testes

README.md   Documentação principal
TESTES.md   Roteiro de testes funcionais
package.json
```

### Organização dos módulos JavaScript

- `app.js` — inicialização e integração da aplicação;
- `router.js` — roteamento e renderização das rotas;
- `templates.js` — templates e componentes dinâmicos;
- `storage.js` — leitura e escrita no `localStorage`;
- `validation.js` — validação e feedback dos formulários;
- `ui.js` — menu, dropdown, modal, toast e estados da interface;
- `data.js` — dados utilizados pelos componentes.

## Executando localmente

Clone o repositório:

```bash
git clone https://github.com/edercandim/maos-que-transformam-ep4.git
cd maos-que-transformam-ep4
```

Instale as dependências de desenvolvimento:

```bash
npm install
```

Como o projeto utiliza ES Modules, ele deve ser servido por HTTP. Uma opção simples é abrir `html/index.html` usando a extensão **Live Server** no VS Code.

## Build

O processo de build gera uma versão preparada da aplicação e utiliza ferramentas de otimização para HTML, CSS, JavaScript e recursos SVG.

```bash
npm run build
```

## Testes

Verificação automatizada dos módulos JavaScript:

```bash
npm test
```

Teste automatizado de acessibilidade:

```bash
npm run test:a11y
```

Também existe um roteiro de testes funcionais manuais documentado em [TESTES.md](./TESTES.md).

## Acessibilidade

A interface foi desenvolvida considerando práticas alinhadas à **WCAG 2.1**, incluindo:

- HTML semântico;
- labels associados aos campos;
- foco visível;
- navegação por teclado;
- atributos ARIA;
- skip link;
- feedback de formulários;
- redução de animações quando `prefers-reduced-motion` está habilitado.

O projeto também possui validação automatizada utilizando **Playwright + axe-core**.

## Persistência de dados

Os voluntários cadastrados são armazenados no navegador por meio de `localStorage`.

A aplicação utiliza serialização com `JSON.stringify()`, leitura com `JSON.parse()` e tratamento de exceções para impedir que dados corrompidos interrompam a execução da interface.

## Qualidade e otimização

O fluxo de desenvolvimento inclui ferramentas para otimização dos arquivos utilizados em produção:

- JavaScript com **esbuild**;
- CSS com **Clean CSS**;
- HTML com **HTML Minifier Terser**;
- SVG com **SVGO**.

Esse processo reduz arquivos desnecessários e prepara uma versão otimizada da aplicação.

## Versionamento

O desenvolvimento segue uma estratégia baseada em GitFlow:

- `main` — versão estável;
- `develop` — integração do desenvolvimento;
- `feature/*` — novas funcionalidades;
- `hotfix/*` — correções urgentes.

Os commits seguem a convenção **Conventional Commits**, com prefixos como:

`feat:`, `fix:`, `docs:`, `test:`, `build:` e `refactor:`.

As versões estáveis seguem **Semantic Versioning (SemVer)**.

## Aprendizados

Este projeto permitiu aplicar conceitos importantes de desenvolvimento front-end sem depender de frameworks, incluindo:

- organização de código em módulos;
- criação de uma SPA;
- manipulação do DOM;
- persistência de estado no navegador;
- responsividade;
- acessibilidade;
- validação de formulários;
- testes;
- build e otimização;
- fluxo profissional com Git e GitHub.

---

**Projeto acadêmico desenvolvido por Eder Henrique Feier Candim.**
