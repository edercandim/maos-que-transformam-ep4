# Mãos que Transformam

Single Page Application desenvolvida para a disciplina de Desenvolvimento Front-End, simulando a plataforma digital de uma organização do terceiro setor.

## Funcionalidades

- navegação SPA por hash sem recarregamento completo;
- templates dinâmicos em JavaScript;
- cadastro e exclusão de voluntários;
- persistência com `localStorage`;
- validação de formulários com feedback visual;
- menu hambúrguer e dropdown responsivos;
- modal e toast acessíveis;
- módulos ES6 com `import` e `export`;
- suporte a navegação por teclado, foco visível e `aria-current`;
- respeito a `prefers-reduced-motion`.

## Tecnologias

O projeto utiliza HTML5, CSS3 e JavaScript moderno (ES6+), com módulos nativos do navegador. Para o fluxo de desenvolvimento são utilizados Git, GitHub e Node.js apenas para scripts locais de build e validação.

## Estrutura

```text
html/       Estrutura principal da SPA
css/        Design System, layout e responsividade
imagens/    Recursos visuais
js/         Módulos JavaScript
scripts/    Scripts de build e testes
README.md   Documentação do projeto
TESTES.md   Roteiro de testes funcionais
```

### Módulos JavaScript

- `app.js`: inicialização, eventos globais e integração dos módulos.
- `router.js`: roteamento e renderização das rotas.
- `templates.js`: templates e componentes dinâmicos.
- `storage.js`: leitura e escrita no `localStorage`.
- `validation.js`: validação e feedback dos formulários.
- `ui.js`: menu, dropdown, modal, toast e estados de navegação.
- `data.js`: dados utilizados pelos componentes.

## Pré-requisitos

- navegador moderno com suporte a ES6 Modules;
- VS Code ou outro editor;
- extensão Live Server para execução local;
- Git para controle de versão;
- Node.js para executar os comandos de build e testes.

## Instalação

O projeto não possui dependências externas obrigatórias. Após clonar o repositório, não é necessário instalar pacotes adicionais.

```bash
git clone https://github.com/edercandim/maos-que-transformam-ep4.git
cd maos-que-transformam-ep4
```

## Como executar

O projeto utiliza ES6 Modules e deve ser servido por HTTP.

1. Abra a pasta no VS Code.
2. Utilize a extensão Live Server.
3. Abra `html/index.html` com **Open with Live Server**.

## Build

A build prepara uma cópia do projeto na pasta `dist/`.

```bash
npm run build
```

## Testes

O comando abaixo executa uma verificação automática de sintaxe dos módulos JavaScript.

```bash
npm test
```

Os testes funcionais manuais também estão documentados no arquivo `TESTES.md`.

## Versionamento

O repositório utiliza uma estratégia baseada em GitFlow:

- `main`: versão estável e de lançamento;
- `develop`: integração do desenvolvimento;
- `feature/*`: desenvolvimento isolado de funcionalidades;
- `hotfix/*`: reservado para correções urgentes.

Os commits seguem Conventional Commits, com prefixos como `feat:`, `fix:`, `docs:`, `test:`, `build:` e `refactor:`. As versões estáveis seguem Semantic Versioning no formato `MAJOR.MINOR.PATCH`.

## Acessibilidade

O projeto busca conformidade com WCAG 2.1 nível AA por meio de HTML semântico, labels associados aos campos, foco visível, navegação por teclado, atributos ARIA, feedback de formulários, skip link e redução de movimentos quando configurada pelo utilizador.

## Persistência

Os voluntários são armazenados localmente usando `localStorage`, com serialização via `JSON.stringify()` e recuperação via `JSON.parse()`.

## Manutenção

Novas funcionalidades devem ser criadas em uma branch `feature/*` a partir de `develop`. Após revisão e testes, a feature é integrada à `develop`. Versões estáveis são posteriormente incorporadas à `main`.
