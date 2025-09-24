import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});   // creating instance of app module
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT || 6001);
  console.log(`Server running on http://localhost:${process.env.PORT || 6001}`);  // 6001 ::default port for backend to run
}
bootstrap();
