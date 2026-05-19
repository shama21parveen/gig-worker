import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { earningsRoutes } from './earnings.routes';
import { healthRoutes } from './health.routes';
import { workerRoutes } from './worker.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/earnings', earningsRoutes);
router.use('/health', healthRoutes);
router.use('/workers', workerRoutes);

export { router as apiRouter };
