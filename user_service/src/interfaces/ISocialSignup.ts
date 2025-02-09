import { $Enums } from "@prisma/client";

export interface ISocialSignup {
  id: number;
  email: string | null;
  phone: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  dateOfBirth: Date | null;
  vehicleType: string | null;
  CustomerProfile: {
    id: number;
    created_at: Date;
    updated_at: Date;
    userId: number;
    dietaryPreferences: string[];
  }[];
  SocialProvider: {
    id: number;
    created_at: Date;
    updated_at: Date;
    userId: number;
    providerName: $Enums.AuthProvider;
    providerID: string | null;
    lastLogin: Date;
  }[];
}
