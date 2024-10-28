import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../application/ports/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UserPrismaService } from '../prisma/prisma.service';
import { UserMapper } from '../../application/mappers/user.mapper';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: UserPrismaService) {}

  async save(user: User): Promise<void> {
    const data = UserMapper.toPersistence(user);
    await this.prisma.user.create({ data });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? UserMapper.toDomain(user) : null;
  }
}
