import { Schema, Types, model, type InferSchemaType } from 'mongoose';
import { EXPENSE_CATEGORIES } from '../constants/earnings.constants';

const expenseRecordSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    workerId: {
      type: Schema.Types.ObjectId,
      ref: 'Worker',
      required: true,
      index: true,
    },
    label: {
      type: {
        en: { type: String, required: true, trim: true },
        hi: { type: String, default: '', trim: true },
      },
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      enum: EXPENSE_CATEGORIES,
      required: true,
    },
    occurredAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

expenseRecordSchema.index({ userId: 1, occurredAt: -1 });

export type ExpenseRecordDocument = InferSchemaType<typeof expenseRecordSchema> & {
  userId: Types.ObjectId;
  workerId: Types.ObjectId;
};

export const ExpenseRecordModel = model<ExpenseRecordDocument>('ExpenseRecord', expenseRecordSchema);
