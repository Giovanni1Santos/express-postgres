# Express PostgreSQL Backend

Este projeto é um backend construído com **Node.js**, **Express** e **PostgreSQL**, utilizando **Sequelize** como ORM. Ele fornece autenticação via **JWT** e uma API para gerenciamento de tarefas (to-dos). Está preparado para deploy em ambientes como **Vercel**.

## Funcionalidades

* Cadastro e login de usuários
* Geração de token JWT para autenticação
* CRUD de tarefas vinculadas a usuários
* Middleware de autenticação
* Conexão com banco PostgreSQL via Sequelize

## Estrutura do Projeto

```
express-postgre-backend-main/
├── api/
│   ├── controllers/      # Lógica dos endpoints
│   ├── database/         # Configuração e sincronização do Sequelize
│   ├── middlewares/      # Autenticação JWT
│   ├── models/           # Modelos Sequelize
│   ├── routes/           # Rotas da aplicação
│   ├── app.js            # Instância do app Express
│   └── index.js          # Inicializa o app
├── server.js             # Ponto de entrada do servidor
├── .env                  # Variáveis de ambiente
├── vercel.json           # Configuração para deploy na Vercel
├── package.json
└── docker-compose.yml    # Para execução com Docker (PostgreSQL)
```

## Instalação

### Requisitos

* Node.js >= 18
* PostgreSQL

### Passos

1. Clone o repositório:

```bash
https://github.com/seu-usuario/seu-repo.git
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o arquivo `.env` com as variáveis de ambiente:

```
PORT=3000
DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=sua_chave_secreta
```

4. (Opcional) Use o Docker para subir o PostgreSQL:

```bash
docker-compose up -d
```

5. Inicie o servidor:

```bash
npm start
```

## Endpoints Principais

### Autenticação

* `POST /api/users/register` - Cadastro
* `POST /api/users/login` - Login

### Tarefas (To-Do)

* `GET /api/todos` - Lista tarefas (com token)
* `POST /api/todos` - Cria tarefa
* `PUT /api/todos/:id` - Atualiza tarefa
* `DELETE /api/todos/:id` - Deleta tarefa

## Deploy na Vercel

O arquivo `vercel.json` está configurado para direcionar o ponto de entrada do backend para `server.js`.


