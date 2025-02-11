import {
  AuthProvider,
  OtpStatus,
  OtpType,
  PrismaClient,
  User,
} from "@prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";
import { CreateUserDto } from "../dtos/createUserDtos";
import { sendOtpToPhone } from "../utils/sendOtp";
import { UpdatePhoneOtpStatus } from "../dtos/verifyPhoneOtp";
import { BadRequestError, NotFoundError } from "../utils/error";
import { SignUpWithEmailDtos, SocialSignupDtos } from "../dtos/signupDtos";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import config from "../config/config";
import { generateOtp } from "../utils/generateOtp";

const client = new OAuth2Client(config.web_client_id);
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
  async loginByPhone(user: any): Promise<any> {
    try {
      await sendOtpToPhone(Number(user?.phone));
      const userOtpExists = await this.prisma.user.findUnique({
        where: {
          id: user?.id,
        },
        include: {
          Otp: true,
        },
      });
      if (userOtpExists?.Otp) {
        await this.prisma.otp.update({
          where: {
            id: userOtpExists?.Otp.id,
          },
          data: {
            userId: user.id,
            otpType: OtpType.PHONE_VERIFICATION,
          },
        });
      } else {
        await this.prisma.otp.create({
          data: {
            userId: user.id,
            otpType: OtpType.PHONE_VERIFICATION,
          },
        });
      }

      return user;
    } catch (error) {
      throw error;
    }
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

  async GoogleSignup(user: SocialSignupDtos): Promise<any> {
    const { idToken } = user;
    return this.prisma.$transaction(async (tx) => {
      try {
        const ticket = await client.verifyIdToken({
          idToken: String(idToken),
          audience: [config.google_client_id ?? "", config.web_client_id ?? ""],
        });
        const payload = ticket.getPayload();
        const {
          sub: providerId,
          email,
          name: firstName,
          picture: profileImage,
        } = payload as TokenPayload;
        const isSocialUser = await tx.socialProvider.findUnique({
          where: {
            providerID: providerId,
          },
        });
        if (isSocialUser) {
          throw new BadRequestError("Social user already exists");
        }

        const userCreate = await tx.user.create({
          data: {
            email: email,
            firstName: firstName,
            profileImage: profileImage,
            isEmailVerified: true,
          },
        });

        await tx.customerProfile.create({
          data: {
            userId: userCreate.id,
          },
        });
        await tx.socialProvider.create({
          data: {
            userId: userCreate.id,
            providerName: AuthProvider.GOOGLE,
            providerID: providerId,
          },
        });
        const result = await tx.user.findUnique({
          where: {
            id: userCreate.id,
          },
          include: {
            CustomerProfile: true,
            SocialProvider: true,
          },
        });
        return result;
      } catch (error) {
        throw error;
      }
    });
  }
  async SignUpWithEmail(userData: SignUpWithEmailDtos): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      try {
        const { email, firstName, lastName, dietaryPreferences } = userData;
        const userVerified = await tx.user.findUnique({
          where: {
            email: email,
            isEmailVerified: true,
          },
        });
        if (userVerified) {
          throw new BadRequestError("User is already verified");
        }

        const userCreate = await tx.user.upsert({
          where: {
            email: email,
          },
          create: {
            email: email,
            firstName: firstName,
            lastName: lastName,
          },
          update: {
            email: email,
            firstName: firstName,
            lastName: lastName,
          },
          include: {
            Otp: {
              select: {
                id: true,
              },
            },
          },
        });

        await tx.customerProfile.upsert({
          where: {
            userId: userCreate.id,
          },
          create: {
            userId: userCreate.id,
            dietaryPreferences: dietaryPreferences,
          },
          update: {
            userId: userCreate.id,
            dietaryPreferences: dietaryPreferences,
          },
        });

        const userOtp = generateOtp();
        if (userCreate?.Otp) {
          await tx.otp.update({
            where: {
              id: userCreate.Otp?.id,
            },
            data: {
              userId: userCreate.id,
              expiresAt: new Date(Date.now() + 10 * 60 * 1000),
              otpType: OtpType.EMAIL_VERIFICATION,
              otp: String(userOtp),
            },
          });
        } else {
          await tx.otp.create({
            data: {
              userId: userCreate?.id,
              // expiration time 10 minutes
              expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now,
              otp: String(userOtp),
              otpType: OtpType.EMAIL_VERIFICATION,
            },
          });
        }

        const result = await tx.user.findUnique({
          where: {
            id: userCreate.id,
          },
          include: {
            CustomerProfile: true,
          },
        });
        return result;
      } catch (error) {
        throw error;
      }
    });
  }
}
