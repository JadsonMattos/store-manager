# Boas-vindas ao repositório do projeto Store Manager

<details>
<summary>🧑‍💻 O que deverá ser desenvolvido</summary>

- Você vai desenvolver uma API RESTful utilizando a arquitetura em camadas!

- A API a ser construída é um sistema de gerenciamento de vendas em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Você deverá utilizar o banco de dados MySQL para a gestão de dados.

- Você também irá desenvolver testes para garantir as funcionalidade das implementações, uma habilidade essencial para a pessoa desenvolvedora.

</details>
  
<details>
  <summary>📝 Habilidades a serem trabalhadas </summary>

Neste projeto, verificamos se você é capaz de:

- Interagir com um banco de dados relacional MySQL;
- Implementar uma API utilizando arquitetura em camadas;
- Criar validações para os dados recebidos pela API;
- Escrever testes para APIs para garantir a implementação dos endpoints;

</details>

## Orientações

> ⚠️ Aviso: Não é necessário entrar no container para rodar os testes e nem para iniciar a aplicação.
>
> - O container `backend` inicia a aplicação automaticamente.
>
> - Os testes do avaliador são executados fora do container. Caso não sejam definidas variáveis de ambiente, os testes irão assumir valores como os em [`env.example`](./env.example).
>
> - ⚠️ É necessário ter a versão Node 16.14 ou superior instalada localmente.

<details>
<summary>🐳 Iniciando a aplicação no Docker Compose</summary>

```bash
# Instale as dependências
npm install

# Inicie os containers do compose `backend` e `db`
# A aplicação estará disponível em `http://localhost:3001` em modo de desenvolvimento
docker-compose up -d

# É possível ver os logs da aplicação com `docker logs -n 10 -f <nome-do-container>`
docker logs -n 10 -f store_manager
```

</details>

<details>
<summary>🖥️ Iniciando a aplicação localmente</summary>

> ⚠️ Atenção: Ao rodar localmente, a aplicação deverá receber variáveis de ambiente como exemplificado em [`env.example`](./env.example) para poder se comunicar com o serviço de banco de dados.

```bash
# Instale as dependências
npm install

# Inicie apenas o serviço `db` no compose
docker-compose up -d db

# Inicie a aplicação em modo de desenvolvimento
npm run dev:local
```

</details>

## Requisitos do projeto

### 01 - Crie endpoints para listar produtos

> 💡Dica: Comece criando pelo menos um teste do mocha para que os testes do avaliador funcionem.

- O endpoint para listar produtos deve ser acessível através do caminho `GET /products` e `GET /products/:id`;
- Através do caminho `GET /products`, todos os produtos devem ser retornados;
- Através do caminho `GET /products/:id`, apenas o produto com o `id` presente na URL deve ser retornado;
- O resultado da listagem deve ser **ordenado** de forma crescente pelo campo `id`;
- Crie testes que garantem a funcionalidade implementada;

> :warning: Em seus arquivos de `models`, `controllers` e `services` **não importe funções de forma desestruturada**, pois esta forma de importação gera problemas nos `stubs` dos testes unitários com `sinon`;

<details>
<summary>💡Se quiser buscar os 100% de cobertura de testes, veja esta dica!</summary>

Se quiser incluir as rotas na sua cobertura de testes, lembre-se que testes unitários testam funções - e o _router_ só faz chamadas, ele não implementa nenhuma função. O teste mais adequado para ele é de integração - fique à vontade para fazê-los para complementar seus testes unitários!

</details>

### 02 - Crie endpoints para listar vendas

- O endpoint para listar vendas deve ser acessível através do caminho `GET /sales` e `GET /sales/:id`;
- Através do caminho `GET /sales`, todas as vendas devem ser retornadas;
- Através do caminho `GET /sales/:id`, apenas a venda com o `id` presente na URL deve ser retornada;
- O resultado deve ser **ordenado** de forma crescente pelo campo `saleId`, em caso de empate, **ordenar** também de forma crescente pelo campo `productId`;

### 03 - Crie endpoint para cadastrar produtos

- O endpoint deve ser acessível através do caminho `POST /products`;
- Os produtos enviados devem ser salvos na tabela `products` do banco de dados;
- O corpo da requisição deverá seguir o formato abaixo:

```json
{
  "name": "ProdutoX"
}
```

### 04 - Crie validações para o cadastro de produtos

- O endpoint de cadastro de produtos deve retornar mensagens de erro para requisições com dados inválidos;
- Lembre-se, o banco de dados não deve ser acessado nas validações iniciais do corpo da requisição;

<details>
<summary>💡 Dica: Para testar middlewares, você pode mockar a função next como no exemplo a seguir:</summary>

```js
// ...
const next = sinon.stub().returns(); // crie um stub
>
myMiddlewares.validateMiddleware(req, res, next); // passe o `next` para o middleware junto com o `req` e `res`
>
expect(next).to.have.been.calledWith(); // verifica se o `next` foi chamado pelo middleware
// ...
```

</details>

### 05 - Crie endpoint para cadastrar vendas

- O endpoint de vendas deve ser acessível através do caminho `POST /sales`;
- As vendas enviadas devem ser salvas nas tabelas `sales` e `sales_products` do banco de dados;
- Deve ser possível cadastrar a venda de vários produtos através da uma mesma requisição;
- O corpo da requisição deverá seguir o formato abaixo:

```json
[
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]
```

### 06 - Crie validações para o cadastro de vendas

- O endpoint de cadastro de vendas deve retornar mensagens de erro para requisições com dados inválidos;

### 07 - Crie endpoint para atualizar um produto

- O endpoint deve ser acessível através do caminho `PUT /products/:id`;
- Apenas o produto com o `id` presente na URL deve ser atualizado;
- O corpo da requisição deve ser validado igual no cadastro;
- O corpo da requisição deverá seguir o formato abaixo:

```json
{
  "name": "Martelo do Batman"
}
```

### 08 - Crie endpoint para deletar um produto

- O endpoint deve ser acessível através do caminho `DELETE /products/:id`;
- Apenas o produto com o `id` presente na URL deve ser deletado;

## Requisitos Bônus

### 09 - Crie endpoint para deletar uma venda

- O endpoint deve ser acessível através do caminho `DELETE /sales/:id`;
- Apenas a venda com o `id` presente na URL deve ser deletada;

### 10 - Crie endpoint para atualizar a quantidade de um produto em uma venda

- O endpoint deve ser acessível através do caminho `/sales/:saleId/products/:productId/quantity`;
- Apenas a quantidade do produto vendido com o `productId` na URL deve ser atualizada;
- O corpo da requisição receberá um valor `quantity`, que:
    - Deverá ser validado como o valor `quantity` para produtos recebidos na requisição de cadastro de venda;
    - Substituirá o valor atual de `quantity` do produto com o `productId` na venda;
- O corpo da requisição deverá seguir o formato abaixo:

```json
{
  "quantity": 20
}
```

### 11 - Crie endpoint para pesquisar produtos

- O endpoint deve ser acessível através do URL `GET /products/search`;
- O endpoint deve ser capaz de trazer todos os produtos no banco de dados contendo o valor da query `q` em `name`, se existirem;
- Sua aplicação deve ser capaz de retornar um array de produtos que contenham em seu nome o termo passado na URL;
- Sua aplicação deve ser capaz de retornar todos os produtos caso _query params_ `q` esteja vazia;
- Sua aplicação deve ser capaz de retornar um array vazio caso nenhum nome satisfaça a busca;
- O _query params_ da requisição deverá seguir o formato abaixo:

```text
  http://localhost:PORT/products/search?q=Martelo
```
