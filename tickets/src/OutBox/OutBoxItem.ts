import { model, Schema } from 'mongoose';

interface IOutBoxItem {
  topic: string;
  payload: object;
  publishedAt?: Date;
}

const outBoxSchema = new Schema<IOutBoxItem>({
  topic: { type: String, required: true },
  payload: { type: Object, required: true },
  publishedAt: { type: Date, required: false },
});

export const OutBoxItem = model<IOutBoxItem>('OutBoxItem', outBoxSchema);
