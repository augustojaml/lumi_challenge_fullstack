
# Projeto Lumi Challenge Fullstack

Este repositório contém a aplicação completa do desafio Lumi Challenge, composta por uma API e um frontend web. A finalidade do projeto é permitir o upload de arquivos PDF, extrair informações destes arquivos e armazená-las para consultas futuras, além de gerar relatórios e gráficos a partir dos dados extraídos.

## Meu Projeto

Este projeto inclui funcionalidades de login, dashboard, gerenciamento de clientes e uploads. Abaixo estão algumas capturas de tela das principais funcionalidades:

### Login
![Descrição da imagem](/img-login.PNG)

### Dashboard
![Descrição da imagem](/img-dash.PNG)

### Uploads
![Descrição da imagem](/img-up1.PNG)
![Descrição da imagem](/img-up2.PNG)
![Descrição da imagem](/img-up3.PNG)

### Clientes
![Descrição da imagem](/img-cli1.PNG)
![Descrição da imagem](/img-cli2.PNG)

## Pré-requisitos

- Docker
- Docker Compose
- PostgreSQL (instância local ou container Docker)

## Tecnologias Utilizadas

### API
A API foi construída utilizando as seguintes bibliotecas e ferramentas:
- `@fastify/cors`: Suporte a CORS para Fastify.
- `@fastify/jwt`: Autenticação JWT para Fastify.
- `@fastify/multipart`: Manipulação de arquivos multipart.
- `@prisma/client`: ORM Prisma para interagir com o banco de dados.
- `bcryptjs`: Criptografia de senhas.
- `dotenv`: Carregamento de variáveis de ambiente.
- `fastify`: Framework web para Node.js.
- `pdf-parse`: Análise e extração de conteúdo de arquivos PDF.
- `uuid`: Geração de identificadores únicos.
- `zod`: Validação de dados.

### Web
O frontend foi desenvolvido com React e utiliza as seguintes bibliotecas:
- `@radix-ui/react-accordion`: Componente de acordeão.
- `@radix-ui/react-dialog`: Componente de diálogo.
- `@radix-ui/react-dropdown-menu`: Menu suspenso.
- `@tanstack/react-query`: Gerenciamento de estado de dados.
- `axios`: Requisições HTTP.
- `chart.js`: Criação de gráficos.
- `lucide-react`: Ícones para React.
- `react`: Biblioteca para construção de interfaces de usuário.
- `react-chartjs-2`: Integração do Chart.js com React.
- `react-router-dom`: Roteamento para React.
- `zod`: Validação de dados.
- `zustand`: Gerenciamento de estado.

## Executando o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/augustojaml/lumi_challenge_fullstack.git
   ```

2. Certifique-se de que tenha uma instância do PostgreSQL rodando ou instalada na máquina, ou utilize um container Docker para isso.

3. Acesse a pasta `api` e crie um arquivo `.env` com as seguintes informações:
   ```env
   NODE_ENV=dev
   PORT=3000
   JWT_SECRET=mudar_123
   DATABASE_URL=postgresql://<user>:<password>@localhost:5432/lumi_challenge_db?schema=public
   ```
   - Substitua `<user>` pelo seu usuário do banco de dados e `<password>` pela senha do banco de dados.

4. Instale as dependências da API e execute as migrações e seeds do banco de dados:
   ```bash
   yarn install
   yarn prisma:migrate
   yarn prisma:seed
   yarn dev
   ```

5. Acesse a pasta `web` e instale as dependências:
   ```bash
   yarn install
   ```

6. Inicie o frontend:
   ```bash
   yarn dev
   ```

7. Acesse a aplicação no navegador em [http://localhost:3000](http://localhost:3000) e faça login com as credenciais:
   ```
   user: augusto@email.com
   senha: 123456
   ```

   O projeto também pode ser acessado em [https://invoices.augustojaml.work](https://invoices.augustojaml.work). Será necessário digitar o usuário: `augusto@email.com` e senha: `123456`.

## Executando o Projeto com Docker e Docker Compose

Também é possível rodar o projeto utilizando Docker e Docker Compose. Para isso:

1. Clone o repositório:
   ```bash
   git clone https://github.com/augustojaml/lumi_challenge_fullstack.git
   ```

2. Certifique-se de que Docker e Docker Compose estejam instalados.

3. No diretório do projeto, digite:
   ```bash
   docker-compose up -d
   ```

4. Acesse o projeto em [http://localhost:3000](http://localhost:3000).

A API estará disponível na porta `3333` e o banco de dados PostgreSQL será iniciado automaticamente como parte do ambiente Docker.

## Equipe de Desenvolvimento

Este projeto foi desenvolvido seguindo as melhores práticas de desenvolvimento, garantindo um ambiente de trabalho colaborativo e eficaz. A configuração do Docker e Docker Compose permite que a equipe possa rapidamente configurar e testar o ambiente localmente, facilitando o processo de CI/CD e a integração contínua entre backend e frontend.

## Comandos Úteis

- **Subir o ambiente**: `docker-compose up -d`
- **Derrubar o ambiente**: `docker-compose down`
- **Verificar os logs**: `docker-compose logs -f`
- **Executar migrações Prisma**: `docker-compose exec api npx prisma migrate deploy`

## Estrutura do Projeto

- `api/`: Contém a API desenvolvida em Node.js com Fastify.
- `web/`: Contém a aplicação frontend desenvolvida em React.
- `docker-compose.yml`: Arquivo de configuração do Docker Compose para orquestrar os serviços.

## Autor

Feito com :purple_heart: by [Augusto Monteiro](https://github.com/augustojaml)

[![Linkedin Badge](https://img.shields.io/badge/-Augusto%20Monteiro-6E40C9?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/augustojaml)](https://www.linkedin.com/in/augustojaml)
[![Gmail Badge](https://img.shields.io/badge/-jamonteirolima@gmail.com-6E40C9?style=flat-square&logo=Gmail&logoColor=white&link=mailto:jamonteirolima@gmail.com)](mailto:jamonteirolima@gmail.com)


## Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais informações.
