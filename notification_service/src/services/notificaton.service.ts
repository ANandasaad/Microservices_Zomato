import { INotificationService } from "../interfaces/INotificationService";
import { NotifierProvider } from "../providers/notification.provider";

export class NotificationService implements INotificationService {
  async sendSmsNotification(data: any) {
    const notifier = NotifierProvider.getNotifier(data);
    if ("sendSmsNotification" in notifier) {
      notifier.sendSmsNotification(data);
    }
  }
  async sendEmailNotification(data: any): Promise<void> {
    const notifier = NotifierProvider.getNotifier(data);
    if ("sendEmailNotification" in notifier)
      notifier.sendEmailNotification(data);
  }
}
