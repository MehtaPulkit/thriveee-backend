import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverless from 'serverless-http';

let server;

async function createApp() {
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
  return app;
}

//
// ✅ LOCAL MODE (runs when you do npm run start)
//
if (process.env.VERCEL !== '1') {
  async function bootstrap() {
    const app = await createApp();
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Local server running on http://localhost:${port}`);
  }
  bootstrap();
}

//
// ✅ SERVERLESS MODE (runs on Vercel)
//
export default async function handler(req, res) {
  server = server ?? serverless((await createApp()).getHttpAdapter().getInstance());
  return server(req, res);
}
