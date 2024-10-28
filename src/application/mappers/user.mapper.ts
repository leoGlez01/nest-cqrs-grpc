import { Prisma, User as PrismaUser } from '@prisma/client';
import { User } from '../../domain/entities/user.entity';

export class UserMapper {
  static toPersistence(user: User): Prisma.UserCreateInput {
    return {
      name: user.name,
    };
  }
  static toDomain(prismaUser: PrismaUser): User {
    return new User(prismaUser.name);
  }
}
