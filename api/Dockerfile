# Etapa de build: usando Node.js com Alpine para uma imagem mais leve
FROM node:18-alpine AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do package.json e pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instale o pnpm globalmente e as dependências do projeto
RUN npm install -g pnpm && pnpm install

# Copie todos os arquivos do projeto
COPY . .

# Gere os arquivos Prisma
COPY prisma ./prisma/
RUN pnpm prisma generate

# Execute o build da aplicação
RUN pnpm run build

# Etapa de produção: imagem final para executar a aplicação
FROM node:18-alpine AS production

# Instale o pnpm globalmente na imagem de produção
RUN npm install -g pnpm

# Defina o diretório de trabalho
WORKDIR /app

# Copie o script wait-for-it.sh para o contêiner
COPY wait-for-it.sh ./wait-for-it.sh

# Torne o script executável
RUN chmod +x wait-for-it.sh

# Copie as dependências do pnpm e o build da etapa anterior
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./

# Exponha a porta da API
EXPOSE 3333

# Defina a variável de ambiente para produção
ENV NODE_ENV=production

# Comando para rodar a aplicação com o wait-for-it
CMD ["pnpm", "start"]
