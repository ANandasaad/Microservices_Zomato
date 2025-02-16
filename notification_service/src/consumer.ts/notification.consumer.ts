import { createRabbitMQConnection } from "../config/rabbitmq";
import { NotificationService } from "../services/notificaton.service";
import { EventType } from "../utils/rabbitEvent.type";

export const consumeNotificationEvent = async () => {
  const { connection, channel, EXCHANGE_NAME } =
    await createRabbitMQConnection();

  const QUEUE_NAME = "notification_queue";
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  // Bind queue to the exchange for specific types of notifications

  Object.values(EventType).forEach(async (eventType) => {
    await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, eventType);
  });

  console.log(`[*] Waiting for messages in ${QUEUE_NAME}`);

  channel.consume(QUEUE_NAME, async (msg) => {
    try {
      if (msg) {
        const notificationData = JSON.parse(msg.content.toString());
        console.log(notificationData, "message");
        switch (notificationData.event) {
          case EventType.SEND_OTP:
            const notificationService = new NotificationService();
            notificationService.sendSmsNotification(notificationData);
            break;

          default:
            console.log("Unknown event: " + notificationData.event);
            break;
        }

        channel.ack(msg);
      }
    } catch (error) {
      throw error;
    }
  });
};
