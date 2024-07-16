# Dashboard de Gestão de Clientes e Usuários

Este projeto é uma aplicação de dashboard desenvolvida em Angular 17 e TypeScript, utilizando os princípios de SOLID, clean code e clean architecture. A aplicação permite o gerenciamento de clientes e contratos, com funcionalidades de autenticação, listagem, adição, edição e remoção.

Esse projeto depende do backend: `git@github.com:gregoryderner/a-simple-solid-nodejs-api.git`

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```plain
src/
├── app/
│ ├── core/
│ │ ├── authentication/
│ │ ├── guards/
│ │ ├── interceptors/
│ │ ├── services/
│ │ └── core.module.ts
│ ├── shared/
│ │ ├── components/
│ │ ├── directives/
│ │ ├── pipes/
│ │ └── shared.module.ts
│ ├── features/
│ │ ├── login/
│ │ ├── clients/
│ │ ├── users/
│ │ └── features.module.ts
│ ├── app-routing.module.ts
│ ├── app.component.html
│ ├── app.component.ts
│ └── app.module.ts
```

## Funcionalidades

### Autenticação

- **Login:** Autenticação dos usuários para acessar o dashboard.
- **Guards:** Protege rotas que só podem ser acessadas por usuários autenticados.
- **Interceptor:** Adiciona o token de autenticação nas requisições HTTP.

### Gestão de Clientes

- **Listagem de Clientes:** Exibe uma lista de clientes com a possibilidade de aplicar filtros por status (Em Atraso, Pago, Cancelado, Dentro do Prazo).
- **Adicionar Cliente:** Formulário para adicionar um novo cliente.
- **Editar Cliente:** Formulário para editar um cliente existente.
- **Remover Cliente:** Função para remover um cliente.
- **Cancelar Contrato:** Permite cancelar contratos diretamente na listagem de clientes.

### Gestão de Usuários

- **Listagem de Usuários:** Exibe uma lista de usuários com as funcionalidades de adicionar, editar e remover usuários (Em desenvolvimento).

### Layout

- **Sidebar:** Barra lateral para navegação entre as telas do dashboard.
- **Header:** Barra superior com informações do usuário logado e opção de logout.
- **Conteúdo Central:** Área principal onde o conteúdo das diferentes telas é exibido.

## Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Angular CLI

### Passos para Instalação

1. Clone o repositório
2. Navegue até o diretório do projeto
3. Instale as dependências
4. Execute a aplicação
   1. ng serve

A aplicação estará disponível em `http://localhost:4200`.

### Configuração da API

A aplicação consome uma API para autenticação, gerenciamento de clientes e usuários. Certifique-se de que a API esteja em execução e configurada para as seguintes rotas:

- `http://localhost:3000/api/auth/login`
- `http://localhost:3000/api/users`
- `http://localhost:3000/api/clients`