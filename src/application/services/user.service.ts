import { UserRepository } from '../ports/user.repository';
import { UserPayload } from '../../contracts/user-payload.interface';
import { User } from '../../domain/entities/user.entity';
import { CreateUserCommand } from '../commands/create-user.command';
import { UserId } from '../../domain/value-objects/user-id.vo';
import { CommandBus } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async createUser(user: UserPayload): Promise<void> {
    await this.commandBus.execute(new CreateUserCommand(user));
  }

  async getUserById(id: UserId): Promise<User | null> {
    return await this.userRepository.findById(id.id);
  }
}
