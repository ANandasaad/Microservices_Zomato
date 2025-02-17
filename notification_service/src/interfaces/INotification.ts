export interface ISmsNotification {
  sendSmsNotification(data: any): Promise<void>;
}

export interface IEmailNotification {
  sendEmailNotification(data: any): Promise<void>;
}
