import { User } from "@prisma/client";

export interface ITokenService {
  verify(token: string): Promise<User>;
}
