import { INotification } from "../interfaces/INotification";
import { SmsNotifier } from "../services/notifiers/sms.notifier";

export class NotifierProvider {
  static getNotifier(type: string): INotification {
    switch (type) {
      case type:
        return new SmsNotifier();
      default:
        throw new Error(`Notifier type '${type}' is not supported.`);
    }
  }
}
