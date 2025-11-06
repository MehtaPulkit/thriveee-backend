// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let cachedHandler: any;

export default async function handler(req: any, res: any) {
  if (!cachedHandler) {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://www.thriveee.com.au',
      ],
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
    });

    await app.init();

    const server = app.getHttpAdapter().getInstance();
    cachedHandler = server.listeners('request')[0];
  }

  return cachedHandler(req, res);
}

/**
 * This runs only in local dev mode.
 * When you run `npm run start:dev`, it starts a normal Nest server.
 */
if (process.env.VERCEL !== '1') {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://www.thriveee.com.au',
      ],
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
    });

    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`🚀 Server running on http://localhost:${port}`);
  }
  bootstrap();
}
