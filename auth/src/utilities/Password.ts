import { promisify } from 'util';
import { scrypt, randomBytes, BinaryLike } from 'crypto';

export class Password {
  private static scryptAsync: (
    arg1: BinaryLike,
    arg2: BinaryLike,
    arg3: number
  ) => Promise<Buffer> = promisify(scrypt);

  public static async hashAsync(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buffer = await this.scryptAsync(password, salt, 64);
    return `${buffer.toString('hex')}.${salt}`;
  }

  public static async compare(
    storedPassword: string,
    suppliedPassword: string
  ) {
    const [hashedPassword, salt] = storedPassword.split('.');

    const buffer = await this.scryptAsync(suppliedPassword, salt, 64);
    return buffer.toString('hex') === hashedPassword;
  }
}
