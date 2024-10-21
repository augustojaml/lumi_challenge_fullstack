# Etapa de build: usando Node.js com Alpine para uma imagem mais leve
FROM node:18-alpine AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do package.json e do lockfile para aproveitar o cache do Docker
COPY package.json pnpm-lock.yaml ./

# Instale as dependências do projeto
RUN npm install -g pnpm && pnpm install

# Copie todos os arquivos do projeto
COPY . .

# Execute o build da aplicação
RUN pnpm run build

# Etapa de produção: usando uma imagem mais enxuta para servir a aplicação
FROM node:18-alpine AS production

# Instale o servidor HTTP `serve` apenas na imagem de produção
RUN npm install -g serve

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do build da etapa anterior
COPY --from=build /app/dist ./dist

# Exponha a porta para o servidor
EXPOSE 3000

# Comando para rodar a aplicação em modo de produção
CMD ["serve", "-s", "dist"]
