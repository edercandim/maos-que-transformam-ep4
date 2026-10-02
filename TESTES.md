# Registro de testes finais

## 1. Navegação SPA
- Clicar em Início, Projetos, Voluntariado, Sobre e Contato.
- Resultado esperado: apenas `#app` é atualizado; a página não realiza navegação tradicional.

## 2. Templates dinâmicos
- Abrir Projetos.
- Resultado esperado: cards são gerados a partir do array em `data.js`.

## 3. Formulário inválido
- Enviar Voluntariado com campos vazios, e-mail inválido ou idade menor que 16.
- Resultado esperado: envio bloqueado, classes `.is-invalid` e mensagens específicas.

## 4. Formulário válido
- Preencher todos os campos corretamente e aceitar os termos.
- Resultado esperado: cadastro salvo, toast de sucesso e card exibido na lista.

## 5. Persistência
- Após cadastrar um voluntário, atualizar a página.
- Resultado esperado: o cadastro permanece visível, recuperado de `localStorage`.

## 6. Exclusão
- Clicar em Excluir no cadastro salvo e atualizar a página.
- Resultado esperado: registro não retorna após F5.

## 7. Menu mobile
- Reduzir a viewport para menos de 768px e usar o hambúrguer.
- Resultado esperado: menu abre/fecha e `aria-expanded` é atualizado.

## 8. Modal
- Abrir na página inicial e fechar por botão, fundo ou tecla Escape.
- Resultado esperado: todos os métodos fecham o componente.

## 9. Console
- Verificar o Console durante os fluxos anteriores.
- Resultado esperado: nenhum erro JavaScript em uso normal.

## 10. localStorage corrompido
- Alterar manualmente o valor da chave `maos_que_transformam_voluntarios` para JSON inválido.
- Resultado esperado: `storage.js` captura a exceção e retorna array vazio, sem quebrar a SPA.
