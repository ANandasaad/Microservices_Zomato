import { IEmailNotification } from "../../interfaces/INotification";
import { SignUpWithEmail } from "../../messaging/signup.mail";

export class SmsEmailNotifier implements IEmailNotification {
  async sendEmailNotification(data: any): Promise<void> {
    try {
      await SignUpWithEmail(data);
    } catch (error) {
      throw error;
    }
  }
}
