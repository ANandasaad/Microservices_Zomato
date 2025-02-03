import { PrismaClient, User } from "@prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";
import { CreateUserDto } from "../dtos/createUserDtos";

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { phone },
    });
  }
  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: Partial<User>): Promise<User> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: user });
  }
}
