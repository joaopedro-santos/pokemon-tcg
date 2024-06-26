<h3 align="center">Este é um aplicativo web desenvolvido utilizando Angular 16+, Tailwind e a biblioteca UI Infragistics. Ele permite aos jogadores montar seus próprios baralhos utilizando a API oficial do Pokémon TCG.</h3>
<img align="center" src="https://static.wikia.nocookie.net/nintendo/images/8/82/All_Starter_Pok%C3%A9mon.png/revision/latest?cb=20230603051954&path-prefix=en">


# Funcionalidades
**Lista de Baralhos**
- Visualização: Os jogadores podem ver uma lista dos seus baralhos existentes.
- Criação: Os jogadores podem criar um novo baralho.
- Remoção: Os jogadores podem remover um baralho existente.
- Edição: Os jogadores podem editar um baralho existente.
- Detalhes: Os jogadores podem clicar em um baralho para visualizar seus detalhes.
  
**Criação de um Baralho**
- Nome: Os jogadores podem atribuir um nome ao seu baralho.
- Inserção de Cartas: Os jogadores podem adicionar cartas ao seu baralho.
- Restrições de Cartas: O baralho deve conter entre 24 e 60 cartas, e não pode conter mais do que 4 cartas com o mesmo nome.
- Salvamento: Após salvar o baralho, os jogadores são redirecionados para a lista de baralhos atualizada.
- Armazenamento: O baralho é salvo apenas em memória.

**Detalhes do Baralho**
- Tipos de Cartas: Os jogadores podem ver quantos Pokémon e cartas de Treinador existem no baralho.
- Cores do Baralho: Os jogadores podem ver quantos tipos únicos de Pokémon existem no baralho.

# Instalação e Execução
1. Clone o Repositório: git clone https://github.com/seu-usuario/pokemon-tcg-deck-builder.git
2. Instale as Dependências: npm install
3. Inicie o Servidor de Desenvolvimento: ng serve
4. Acesse o Aplicativo: Navegue para http://localhost:4200/ no seu navegador.

# Contribuição
Se você gostaria de contribuir para este projeto, por favor, siga estes passos:

1. Faça um Fork do projeto
2. Crie uma nova branch (git checkout -b feature/nova-funcionalidade)
2. Faça o commit das suas alterações (git commit -am 'Adicione uma nova funcionalidade')
4. Faça o push para a branch (git push origin feature/nova-funcionalidade)
5. Crie um novo Pull Request
