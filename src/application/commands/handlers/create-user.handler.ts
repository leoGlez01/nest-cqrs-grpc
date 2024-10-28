import { CreateUserCommand } from '../create-user.command';
import { UserRepository } from '../../ports/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const { user } = command;
    const userToPersist = User.create(user);
    await this.userRepository.save(userToPersist);
  }
}
