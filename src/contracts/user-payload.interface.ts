import { UserId } from '../domain/value-objects/user-id.vo';

export interface UserPayload {
  name: string;
  id?: UserId;
}
