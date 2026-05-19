import { Schema, Types, model, type InferSchemaType } from 'mongoose';
import { PLATFORM_NAMES } from '../constants/earnings.constants';

const earningsRecordSchema = new Schema(
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
    platform: {
      type: String,
      enum: PLATFORM_NAMES,
      required: true,
    },
    basePay: {
      type: Number,
      required: true,
      min: 0,
    },
    tips: {
      type: Number,
      default: 0,
      min: 0,
    },
    incentives: {
      type: Number,
      default: 0,
      min: 0,
    },
    deductions: {
      type: Number,
      default: 0,
      min: 0,
    },
    trips: {
      type: Number,
      default: 0,
      min: 0,
    },
    hours: {
      type: Number,
      default: 0,
      min: 0,
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

earningsRecordSchema.index({ userId: 1, occurredAt: -1 });

export type EarningsRecordDocument = InferSchemaType<typeof earningsRecordSchema> & {
  userId: Types.ObjectId;
  workerId: Types.ObjectId;
};

export const EarningsRecordModel = model<EarningsRecordDocument>(
  'EarningsRecord',
  earningsRecordSchema,
);
