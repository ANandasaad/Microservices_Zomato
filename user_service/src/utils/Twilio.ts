import twilio from "twilio";
import config from "../config/config";

export const client = twilio(
  config.twilio_account_sid,
  config.twilio_auth_token
);
