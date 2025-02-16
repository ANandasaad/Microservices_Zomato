import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 4000,

  rabbit_url: process.env.RABBITMQ_URL,
  twilio_account_sid: process.env.TWILIO_ACCOUNT_SID,
  twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
  twilio_PhoneNumber: process.env.TWILIO_PHONE_NUMBER,
  twilio_Service_sid: process.env.TWILIO_SERVICE_SID,
};
