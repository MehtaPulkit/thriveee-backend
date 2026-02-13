import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverless from 'serverless-http';

let server;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });

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
  return serverless(expressApp);
}

export default async function handler(req, res) {
  server = server ?? (await bootstrap());
  return server(req, res);
}
