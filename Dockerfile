# Usar uma imagem oficial do Node.js
FROM node:22

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar o package.json e yarn.lock (se existir) antes de instalar as dependências
COPY package*.json ./

# Instalar as dependências
RUN yarn install

# Copiar o restante do código-fonte
COPY . .

# Construir o projeto (se necessário)
RUN yarn build

# Definir o comando padrão para rodar a aplicação
CMD ["yarn", "run", "dev"]
