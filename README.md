# Passo a Passo

Inicia projeto Nest - npx @nestjs/cli new loja

* Criação de DTO para validar informações

1º Instala class-validator - yarn add class-validator class-transformer
2º Adicionar 'app.useGlobalPipes();' ao arquivo main
3º UUID - yarn add uuid
4º Criar arquivos Docker
5º docker compose up --build ou d
  docker compose down
6º TypeOrm - yarn add @nestjs/typeorm typeorm pg
 yarn add class-validator
 yarn add class-transformer
 yarn add cpf-cnpj-validator
7º Pasta Config para o DB

* Conectando TypeOrm no Db
8º Para usar .env yarn add @nestjs/config

OBS: Dá pra criar um usuário inteiro com o comando: 
  nest g res 'module-name' ou yarn nest g res users
  Criei users como teste
