import {
  IEmailNotification,
  ISmsNotification,
} from "../interfaces/INotification";
import { SmsEmailNotifier } from "../services/notifiers/email.notifier";
import { SmsNotifier } from "../services/notifiers/sms.notifier";
import { EventType } from "../utils/rabbitEvent.type";

export class NotifierProvider {
  static getNotifier(dataSms: any): ISmsNotification | IEmailNotification {
    const { event, data } = dataSms;
    switch (event) {
      case EventType.SEND_OTP:
        return new SmsNotifier();
      case EventType.EMAIL:
        return new SmsEmailNotifier();

      default:
        throw new Error(`Notifier type '${event}' is not supported.`);
    }
  }
}
