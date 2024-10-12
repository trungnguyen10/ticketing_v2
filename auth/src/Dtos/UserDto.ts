import { UserDocument } from '../models/User';

export class UserDto {
  id: string;
  email: string;
  constructor(userDoc: UserDocument) {
    this.id = userDoc._id!.toString();
    this.email = userDoc.email;
  }
}
