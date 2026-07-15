# # Build do Angular
# FROM node:20 AS build
# WORKDIR /cs_storage
# COPY . .
# RUN npm install -g @angular/cli

# RUN npm install

# CMD ["ng", "serve", "--host", "0.0.0.0"]

FROM node:20-alpine

WORKDIR /app

# Instala o Angular CLI globalmente
RUN npm install -g @angular/cli

# Copia os arquivos de dependências primeiro (otimiza cache do Docker)
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

EXPOSE 4200

# Inicializa o servidor ouvindo em todas as interfaces para o Docker conseguir expor a porta
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]