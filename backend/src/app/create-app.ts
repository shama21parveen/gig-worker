import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { env } from '../config/env';
import { errorMiddleware } from '../middlewares/error.middleware';
import { notFoundMiddleware } from '../middlewares/not-found.middleware';
import { apiRouter } from '../routes';

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.corsOrigin,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

  app.get('/', (_req, res) => {
    res.json({
      success: true,
      message: 'Gig Worker Safety + Earnings OS backend is running',
    });
  });

  app.use(env.apiPrefix, apiRouter);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
