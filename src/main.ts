import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  // 🔹 Global API prefix (recommended for production)
  app.setGlobalPrefix('api');

  // 🔹 Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unknown fields
      forbidNonWhitelisted: true, // throws error if unknown field exists
      transform: true, // auto-transform payloads
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // 🔹 CORS configuration
  const isProd = process.env.NODE_ENV === 'production';

  app.enableCors({
    origin: isProd
      ? ['https://www.thriveee.com.au']
      : ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  });

  const port = process.env.PORT || 3000;

  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}/api`);
}

bootstrap();
