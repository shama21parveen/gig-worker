import type { Request, Response } from 'express';
import { workerService } from '../services/worker.service';
import { sendSuccess } from '../utils/api-response';

export async function getMyWorkerProfile(req: Request, res: Response) {
  const result = await workerService.getMyProfile(req.user!.userId);

  return sendSuccess(res, {
    message: 'Worker profile fetched successfully',
    data: result,
  });
}

export async function updateMyWorkerProfile(req: Request, res: Response) {
  const result = await workerService.updateMyProfile(req.user!.userId, req.body);

  return sendSuccess(res, {
    message: 'Worker profile updated successfully',
    data: result,
  });
}
