// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';

let cachedServer: Server;

export default async function handler(req: any, res: any) {
  if (!cachedServer) {
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

    const expressApp = app.getHttpAdapter().getInstance();
    cachedServer = expressApp;
  }

  // Delegate the request to the NestJS Express app
  return (cachedServer as any).handle(req, res);
}

// Local development (non-Vercel)
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
