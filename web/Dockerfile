# Etapa de build: usando Node.js com Alpine para uma imagem mais leve
FROM node:18-alpine AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie apenas os arquivos necessários para instalar as dependências
COPY package.json pnpm-lock.yaml ./

# Instale o pnpm globalmente e as dependências do projeto
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copie o restante dos arquivos do projeto
COPY . .

# Execute o build da aplicação
RUN pnpm run build

# Etapa de produção: usando uma imagem mais enxuta para servir a aplicação
FROM node:18-alpine AS production

# Instale o servidor HTTP `serve` apenas na imagem de produção
RUN npm install -g serve

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do build da etapa anterior para a imagem de produção
COPY --from=build /app/dist ./dist

# Exponha a porta para o servidor
EXPOSE 3000

# Comando para rodar a aplicação em modo de produção
CMD ["serve", "-s", "dist"]
