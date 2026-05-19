import mongoose from 'mongoose';
import { APP_NAME } from '../constants/app.constants';
import { env } from '../config/env';

export const healthService = {
  getStatus: () => ({
    name: APP_NAME,
    environment: env.nodeEnv,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: {
      readyState: mongoose.connection.readyState,
    },
  }),
};
