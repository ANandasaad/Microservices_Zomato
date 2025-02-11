import config from "../config/config";
import { client } from "./Twilio";

export const sendOtpToPhone = async (phone: number) => {
  try {
    await client.verify.v2
      .services(String(config.twilio_Service_sid))
      .verifications.create({ to: `+91${phone}`, channel: "sms" })
      .then((verification) => console.log(verification));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyOtp = async (phone: number, otp: string) => {
  try {
    const response = await client.verify.v2
      .services(String(config.twilio_Service_sid))
      .verificationChecks.create({ to: `+91${phone}`, code: otp });

    console.log("OTP Verification Status:", response.status); // 'approved' if correct
    return response.status === "approved";
  } catch (error) {
    console.error("OTP Verification Failed:", error);
    return false;
  }
};
