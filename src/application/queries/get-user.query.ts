import { UserId } from '../../domain/value-objects/user-id.vo';

export class GetUserQuery {
  constructor(public readonly id: UserId) {}
}
