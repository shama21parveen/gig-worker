import type { Request, Response } from 'express';
import { earningsService } from '../services/earnings.service';
import { sendSuccess } from '../utils/api-response';

export async function getEarningsDataset(req: Request, res: Response) {
  const result = await earningsService.getDataset(req.user!.userId, req.query.view as any);

  return sendSuccess(res, {
    message: 'Earnings dataset fetched successfully',
    data: result,
  });
}

export async function createExpense(req: Request, res: Response) {
  const result = await earningsService.createExpense(req.user!.userId, req.body);

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Expense entry created successfully',
    data: result,
  });
}

export async function getUpcomingPayout(req: Request, res: Response) {
  const result = await earningsService.getUpcomingPayout(req.user!.userId);

  return sendSuccess(res, {
    message: 'Upcoming payout fetched successfully',
    data: result,
  });
}
