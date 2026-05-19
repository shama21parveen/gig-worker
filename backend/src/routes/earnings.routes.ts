import { Router } from 'express';
import { createExpense, getEarningsDataset, getUpcomingPayout } from '../controllers/earnings.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';
import { validate } from '../middlewares/validate.middleware';
import { asyncHandler } from '../utils/async-handler';
import { createExpenseSchema, earningsDatasetSchema, payoutSchema } from '../validators/earnings.validator';

const router = Router();

router.get('/dataset', requireAuth, authorize('worker'), validate(earningsDatasetSchema), asyncHandler(getEarningsDataset));
router.post('/expenses', requireAuth, authorize('worker'), validate(createExpenseSchema), asyncHandler(createExpense));
router.get('/upcoming-payout', requireAuth, authorize('worker'), validate(payoutSchema), asyncHandler(getUpcomingPayout));

export { router as earningsRoutes };
