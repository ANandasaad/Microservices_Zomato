import { OtpStatus, User } from "@prisma/client";
import { CreateUserDto } from "../dtos/createUserDtos";
import { IAuthService } from "../interfaces/IAuthService";
import { IUserRepository } from "../interfaces/IUserRepository";
import { BadRequestError } from "../utils/error";
import { VerifyPhoneOtp } from "../dtos/verifyPhoneOtp";
import { verifyOtp } from "../utils/sendOtp";
import { SignUpWithEmailDtos, SocialSignupDtos } from "../dtos/signupDtos";
import { generateToken } from "../utils/generateToken";
import { ResendOtp, ResendType } from "../dtos/resendOtp";
import { generateOtp } from "../utils/generateOtp";
import { LoginWithEmailDtos, OtpDataDtos } from "../dtos/LoginDtos";

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
  async registerUserByPhoneOrLogin(userData: CreateUserDto): Promise<User> {
    try {
      if (!userData.phone) {
        throw new BadRequestError("Phone number is required");
      }
      const existingUser = await this.userRepository.findByPhone(
        userData.phone
      );
      let user;
      if (existingUser) {
        user = await this.userRepository.loginByPhone(existingUser);
      } else {
        user = await this.userRepository.createUser(userData);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async verifyPhoneOtp(input: VerifyPhoneOtp): Promise<any> {
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
      const payload = {
        userId: existingUser.id,
      };
      const token = generateToken(payload);

      return {
        token,
        existingUser,
      };
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
  async resendOtp(userData: ResendOtp): Promise<any> {
    try {
      const userExist = await this.userRepository.findByEmail(
        userData.email as string
      );
      if (!userExist) {
        throw new BadRequestError("User does not exist");
      }
      if (userExist.isEmailVerified) {
        throw new BadRequestError("User already verified");
      }
      if (userExist?.Otp) {
        if (userExist.Otp.lockUntil && userExist.Otp.lockUntil > new Date()) {
          throw new BadRequestError(
            `Resend request attempt exceeded the maximum limit, Try again later in 10 mins`
          );
        }

        const userOtp = generateOtp();

        let newAttemptCount = (userExist.Otp?.attemptCount || 0) + 1;
        if (userExist.Otp.lockUntil) {
          newAttemptCount = 0;
        }
        const payload: ResendType = {
          id: userExist.Otp?.id,
          otp: String(userOtp),
          attemptCount: newAttemptCount,
          lockUntil:
            newAttemptCount >= 3 ? new Date(Date.now() + 10 * 60 * 1000) : null,
        };

        await this.userRepository.updateOtp(payload);
      }

      return {};
    } catch (error) {
      throw error;
    }
  }

  async loginWithEmail(userData: LoginWithEmailDtos): Promise<any> {
    try {
      const { email, otp, OtpType } = userData;
      const userExist = await this.userRepository.findByEmail(email as string);
      if (!userExist) {
        throw new BadRequestError("User not found");
      }
      const otpData: OtpDataDtos = {
        userId: userExist?.id,
        OtpType: OtpType,
      };
      const userOtp = await this.userRepository.findByOtpById(otpData);
      if (userOtp.expiresAt < new Date()) {
        throw new BadRequestError("Otp Expired");
      }
      if (userOtp.otp !== otp) {
        if (
          userExist.accountLockedUntil &&
          userExist.accountLockedUntil > new Date()
        ) {
          throw new BadRequestError("Account is Locked for 10 minutes");
        }
        let newAttemptCount = (userExist.failedLoginAttemptCount || 0) + 1;

        if (userExist.accountLockedUntil) {
          newAttemptCount = 0;
        }
        const payload = {
          id: userExist.id,
          failedLoginAttemptCount: newAttemptCount,
        };
        await this.userRepository.update(payload);
      }
    } catch (error) {
      throw error;
    }
  }
}
