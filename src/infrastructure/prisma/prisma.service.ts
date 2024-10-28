import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserPrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(UserPrismaService.name);
  constructor() {
    super();
  }
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      this.logger.error('Prisma connection error', error);
    }
  }
}
