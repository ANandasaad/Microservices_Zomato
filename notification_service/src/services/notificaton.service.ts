import { INotification } from "../interfaces/INotification";
import { INotificationService } from "../interfaces/INotificationService";
import { NotifierProvider } from "../providers/notification.provider";

export class NotificationService implements INotificationService {
  async sendSmsNotification(data: any) {
    const notifier = NotifierProvider.getNotifier(data);
    notifier.sendNotificationPhone(data);
  }
}
