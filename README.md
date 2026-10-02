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

## Estrutura

```text
html/       Estrutura principal da SPA
css/        Design System, layout e responsividade
imagens/    Recursos visuais
js/         Módulos JavaScript
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

## Como executar

O projeto utiliza ES6 Modules e deve ser servido por HTTP.

1. Abra a pasta no VS Code.
2. Utilize a extensão Live Server.
3. Abra `html/index.html` com **Open with Live Server**.

## Versionamento

O repositório utiliza uma estratégia baseada em GitFlow:

- `main`: versão estável e de lançamento;
- `develop`: integração do desenvolvimento;
- `feature/*`: desenvolvimento isolado de funcionalidades.

Os commits seguem um padrão semântico, como `feat:`, `fix:`, `docs:` e `refactor:`.

## Acessibilidade

O projeto busca conformidade com WCAG 2.1 nível AA por meio de HTML semântico, labels associados aos campos, foco visível, navegação por teclado, atributos ARIA, feedback de formulários, skip link e redução de movimentos quando configurada pelo utilizador.

## Persistência

Os voluntários são armazenados localmente usando `localStorage`, com serialização via `JSON.stringify()` e recuperação via `JSON.parse()`.

## Manutenção

Novas funcionalidades devem ser criadas em uma branch `feature/*` a partir de `develop`. Após revisão e testes, a feature é integrada à `develop`. Versões estáveis são posteriormente incorporadas à `main`.
