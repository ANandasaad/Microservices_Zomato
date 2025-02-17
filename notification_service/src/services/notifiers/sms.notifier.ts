import config from "../../config";
import { client } from "../../config/Twilio";
import { ISmsNotification } from "../../interfaces/INotification";

export class SmsNotifier implements ISmsNotification {
  async sendSmsNotification(data: any): Promise<void> {
    try {
      console.log("Sending notification", data?.data?.phone);
      await client.verify.v2
        .services(String(config.twilio_Service_sid))
        .verifications.create({ to: `+${data?.data?.phone}`, channel: "sms" })
        .then((verification) => console.log(verification));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
