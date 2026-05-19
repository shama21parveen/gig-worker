import { WorkerModel } from '../models/worker.model';

export const workerRepository = {
  findByUserId: (userId: string) => WorkerModel.findOne({ userId }),
  findByUserIdWithUser: (userId: string) => WorkerModel.findOne({ userId }).populate('userId'),
  create: (payload: ConstructorParameters<typeof WorkerModel>[0]) => WorkerModel.create(payload),
};
