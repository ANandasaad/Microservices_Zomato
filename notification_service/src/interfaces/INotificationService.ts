export interface INotificationService {
  sendSmsNotification(data: any): Promise<void>;
  sendEmailNotification(data: any): Promise<void>;
}
