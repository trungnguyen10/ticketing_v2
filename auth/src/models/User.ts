import { model, Schema, Model, Document } from 'mongoose';
import { Password } from '../utilities/Password';

interface IUser {
  email: string;
  password: string;
}

interface UserModel extends Model<UserDocument> {
  build(userProperties: IUser): UserDocument;
}

interface UserDocument extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.statics.build = (user: IUser) => new User(user);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const newHashedPassword = await Password.hashAsync(this.get('password'));
    this.set('password', newHashedPassword);
  }
  next();
});

const User = model<UserDocument, UserModel>('User', userSchema);

export { User };
