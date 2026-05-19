import { createServer } from 'node:http';
import { createApp } from './app/create-app';
import { env } from './config/env';
import { connectDatabase } from './config/database';

async function bootstrap() {
  await connectDatabase();

  const app = createApp();
  const server = createServer(app);

  server.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend listening on http://localhost:${env.port}${env.apiPrefix}`);
  });
}

void bootstrap();
