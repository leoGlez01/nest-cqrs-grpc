import { UserPayload } from 'src/contracts/user-payload.interface';
import { UserId } from '../value-objects/user-id.vo';

export class User {
  constructor(
    public readonly name: string,
    public readonly id?: UserId,
  ) {}
  static create(payload: UserPayload): User {
    return new User(payload.name, payload.id);
  }
}
