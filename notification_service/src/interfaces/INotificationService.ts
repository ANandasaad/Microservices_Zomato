export interface INotificationService {
  sendSmsNotification(data: any): Promise<void>;
}
