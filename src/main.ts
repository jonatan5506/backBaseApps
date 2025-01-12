import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //transforma json em objeto
      whitelist: true, //Ignora as informações que estão no json e não estão no DTO
      forbidNonWhitelisted: true, //Gera erro caso o json não tenha algum atributo que esteja no DTO
    }),
  );

  //Faz o class-validator resolver as depências igual ao Nest
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
