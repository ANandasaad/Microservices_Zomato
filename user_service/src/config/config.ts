import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  twilio_account_sid: process.env.TWILIO_ACCOUNT_SID,
  twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
  twilio_PhoneNumber: process.env.TWILIO_PHONE_NUMBER,
  twilio_Service_sid: process.env.TWILIO_SERVICE_SID,
};
