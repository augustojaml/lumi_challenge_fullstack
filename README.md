
# Projeto Lumi Challenge Fullstack

Este repositório contém a aplicação completa do desafio Lumi Challenge, composta por uma API e um frontend web. Para executar este projeto, é necessário ter **Docker** e **Docker Compose** instalados em sua máquina.

## Pré-requisitos

- Docker
- Docker Compose

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
   cd lumi_challenge_fullstack
   ```

2. Suba os containers com Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Acesse o frontend pelo navegador em: [http://localhost:3000](http://localhost:3000)

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

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Para isso:
1. Faça um fork do projeto.
2. Crie uma branch com sua feature: `git checkout -b minha-feature`.
3. Faça commit das suas alterações: `git commit -m 'Adiciona minha feature'`.
4. Faça push para a branch: `git push origin minha-feature`.
5. Abra um Pull Request.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais informações.
