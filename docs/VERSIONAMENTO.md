# Estratégia de versionamento

O projeto utiliza uma adaptação do GitFlow para organizar o ciclo de desenvolvimento.

## Branches

- `main`: versão estável e pronta para entrega.
- `develop`: integração contínua das alterações validadas.
- `feature/*`: desenvolvimento isolado de novas funcionalidades ou melhorias.
- `hotfix/*`: reservado para correções urgentes em produção.

## Commits

As mensagens seguem o padrão Conventional Commits, com prefixos como `feat:`, `fix:` e `docs:`.

## Releases

As versões seguem Semantic Versioning no formato `MAJOR.MINOR.PATCH`. A primeira versão estável do projeto foi identificada como `v1.0.0`.
