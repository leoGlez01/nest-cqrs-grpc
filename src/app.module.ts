import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserGrpcController } from './infrastructure/presenters/user.controller';
import { UserService } from './application/services/user.service';
import { UserPrismaService } from './infrastructure/prisma/prisma.service';
import { UserPrismaRepository } from './infrastructure/adapters/user.repository.prisma';
import { CreateUserHandler } from './application/commands/handlers/create-user.handler';
import { GetUserHandler } from './application/queries/handlers/get-user.handler';

const CommandHandlers = [CreateUserHandler];
const QueryHandlers = [GetUserHandler];

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '../src/infrastructure/_proto/user.proto'),
          url: '0.0.0.0:50051',
        },
      },
    ]),
  ],
  controllers: [UserGrpcController],
  providers: [
    UserService,
    UserPrismaService,
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class AppModule {}
