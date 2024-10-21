# Use a imagem do Node.js com Alpine para uma versão mais leve
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do package.json e pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instale o pnpm globalmente e as dependências do projeto
RUN npm install -g pnpm && pnpm install

# Copie os arquivos da pasta prisma para a pasta prisma do container
COPY prisma ./prisma/

# Copie todos os arquivos do projeto
COPY . .

# Gere os arquivos Prisma
RUN pnpm prisma generate

# Execute o build da aplicação
RUN pnpm run build

# Exponha a porta da API
EXPOSE 3333

# Comando para rodar a aplicação e executar o seed antes de iniciar o servidor
CMD ["sh", "-c", "pnpm start"]
