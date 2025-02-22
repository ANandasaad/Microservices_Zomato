import { PrismaClient, User } from "@prisma/client";
import { ITokenService } from "../interfaces/ITokenService";
import jwt, { JwtPayload } from "jsonwebtoken";
import { BadRequestError, NotFoundError } from "../utils/error";

export class JwtTokenService implements ITokenService {
  private prisma: PrismaClient;
  constructor(private readonly secret: string) {
    this.prisma = new PrismaClient();
  }

  async verify(token: string): Promise<User> {
    try {
      const decode = (await jwt.verify(token, this.secret)) as JwtPayload;

      if (!decode) {
        throw new BadRequestError("Decode failed");
      }
      const user = await this.prisma.user.findUnique({
        where: {
          id: decode.data?.userId,
        },
      });
      if (!user) {
        throw new NotFoundError("User not found");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
