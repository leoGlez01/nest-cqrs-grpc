import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from 'src/application/services/user.service';
import { UserId } from 'src/domain/value-objects/user-id.vo';

@Controller()
export class UserGrpcController {
  private readonly logger = new Logger(UserGrpcController.name);

  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'GetUser')
  async getUser(data: { id: string }) {
    this.logger.log(`GetUser called with id: ${data.id}`);
    const user = await this.userService.getUserById(new UserId(data.id));
    return { user };
  }

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(data: { name: string }) {
    this.logger.log(`CreateUser called with name: ${data.name}`);
    await this.userService.createUser({ name: data.name });
    return {};
  }
}
