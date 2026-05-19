import { Schema, Types, model, type InferSchemaType } from 'mongoose';

const payoutSchema = new Schema(
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
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    scheduledFor: {
      type: Date,
      required: true,
      index: true,
    },
    cycle: {
      type: {
        en: { type: String, required: true, trim: true },
        hi: { type: String, default: '', trim: true },
      },
      required: true,
    },
    status: {
      type: String,
      enum: ['scheduled', 'processing', 'paid'],
      default: 'scheduled',
    },
  },
  {
    timestamps: true,
  },
);

payoutSchema.index({ userId: 1, scheduledFor: 1 });

export type PayoutDocument = InferSchemaType<typeof payoutSchema> & {
  userId: Types.ObjectId;
  workerId: Types.ObjectId;
};

export const PayoutModel = model<PayoutDocument>('Payout', payoutSchema);
