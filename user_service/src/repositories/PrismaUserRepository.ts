import {
  AuthProvider,
  OtpStatus,
  OtpType,
  PrismaClient,
  User,
} from "@prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";
import { CreateUserDto } from "../dtos/createUserDtos";
import { generateOtp } from "../utils/generateOtp";
import { sendOtpToPhone } from "../utils/sendOtp";
import { UpdatePhoneOtpStatus } from "../dtos/verifyPhoneOtp";
import { NotFoundError } from "../utils/error";

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
    return this.prisma.$transaction(async (tx) => {
      try {
        const userCreated = await tx.user.create({
          data: {
            phone: user.phone,
            provider: AuthProvider.PHONE,
          },
        });
        await tx.customerProfile.create({
          data: {
            userId: userCreated?.id,
          },
        });

        await sendOtpToPhone(Number(user?.phone));
        await tx.otp.create({
          data: {
            userId: userCreated?.id,
            otpType: OtpType.PHONE_VERIFICATION,
          },
        });
        return userCreated;
      } catch (error) {
        throw error;
      }
    });
  }

  async updatePhoneOtpStatus(user: UpdatePhoneOtpStatus): Promise<string> {
    return this.prisma.$transaction(async (tx) => {
      try {
        const otp = await this.prisma.otp.findUnique({
          where: {
            userId: user.userId,
          },
        });
        if (!otp) {
          throw new NotFoundError(`User ${user.userId} does not exist`);
        }

        await this.prisma.otp.update({
          where: {
            userId: user.userId,
          },
          data: {
            status: user.status as OtpStatus,
          },
        });

        if (user.status === OtpStatus.verified) {
          await this.prisma.user.update({
            where: {
              id: user.userId,
            },
            data: {
              isPhoneVerified: true,
            },
          });

          await this.prisma.otp.delete({
            where: {
              userId: user.userId,
            },
          });
        }

        return "OTP status updated successfully";
      } catch (error) {
        throw error;
      }
    });
  }
}
