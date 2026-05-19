import { UserModel } from '../models/user.model';

export const userRepository = {
  findByPhone: (phone: string) => UserModel.findOne({ phone }),
  findById: (id: string) => UserModel.findById(id),
  create: (payload: ConstructorParameters<typeof UserModel>[0]) => UserModel.create(payload),
};
