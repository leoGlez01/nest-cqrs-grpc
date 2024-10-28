import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: join(__dirname, '../src/infrastructure/_proto/user.proto'),
        url: '0.0.0.0:50051',
      },
    },
  );

  await app.listen();
  logger.log('Microservice is listening on 0.0.0.0:50051');
}
bootstrap();
