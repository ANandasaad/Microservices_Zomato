import { OtpStatus, User } from "@prisma/client";
import { CreateUserDto } from "../dtos/createUserDtos";
import { IAuthService } from "../interfaces/IAuthService";
import { IUserRepository } from "../interfaces/IUserRepository";
import { BadRequestError } from "../utils/error";
import { VerifyPhoneOtp } from "../dtos/verifyPhoneOtp";
import { verifyOtp } from "../utils/sendOtp";
import { SignUpWithEmailDtos, SocialSignupDtos } from "../dtos/signupDtos";

export class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {}

  async register(userData: CreateUserDto): Promise<User> {
    if (!userData.email) {
      throw new BadRequestError("Email is required");
    }
    const existingUser = await this.userRepository.findByPhone(userData.email);

    if (existingUser) {
      throw new BadRequestError("User already exists");
    }

    const user = await this.userRepository.createUser(userData);
    return user;
  }
  async registerUserByPhone(userData: CreateUserDto): Promise<User> {
    try {
      if (!userData.phone) {
        throw new BadRequestError("Phone number is required");
      }
      const existingUser = await this.userRepository.findByPhone(
        userData.phone
      );
      if (existingUser) {
        throw new BadRequestError("User already exists");
      }
      const user = await this.userRepository.createUser(userData);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async verifyPhoneOtp(input: VerifyPhoneOtp): Promise<string> {
    try {
      if (!input.phone) {
        throw new BadRequestError("Phone number is required");
      }
      const existingUser = await this.userRepository.findByPhone(input.phone);
      if (!existingUser) {
        throw new BadRequestError("User does not exist");
      }

      const isOtpVerified = await verifyOtp(
        Number(input.phone),
        String(input.otp)
      );
      if (!isOtpVerified) {
        throw new BadRequestError("Invalid OTP");
      }

      await this.userRepository.updatePhoneOtpStatus({
        userId: existingUser.id,
        status: isOtpVerified ? OtpStatus.verified : OtpStatus.pending,
      });

      return "OTP verified successfully";
    } catch (error) {
      throw error;
    }
  }

  async GoogleSignup(userData: SocialSignupDtos): Promise<any> {
    try {
      const user = await this.userRepository.GoogleSignup(userData);
      return user;
    } catch (error) {
      throw error;
    }
  }
  async SignUpWithEmail(userData: SignUpWithEmailDtos): Promise<any> {
    try {
      const user = await this.userRepository.SignUpWithEmail(userData);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
