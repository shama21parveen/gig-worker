import { Router } from 'express';
import { getMyWorkerProfile, updateMyWorkerProfile } from '../controllers/worker.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';
import { validate } from '../middlewares/validate.middleware';
import { asyncHandler } from '../utils/async-handler';
import { workerProfileGetSchema, workerProfileUpdateSchema } from '../validators/worker.validator';

const router = Router();

router.get('/me', requireAuth, authorize('worker'), validate(workerProfileGetSchema), asyncHandler(getMyWorkerProfile));
router.patch('/me', requireAuth, authorize('worker'), validate(workerProfileUpdateSchema), asyncHandler(updateMyWorkerProfile));

export { router as workerRoutes };
