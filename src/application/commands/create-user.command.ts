import { UserPayload } from 'src/contracts/user-payload.interface';

export class CreateUserCommand {
  constructor(public readonly user: UserPayload) {}
}
