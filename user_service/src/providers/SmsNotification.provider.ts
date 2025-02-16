import { createRabbitMQConnection } from "../config/rabbitmq";
import { EventType } from "../utils/rabbitEvent.type";

export const publishSmsNotification = async (phone: number) => {
  try {
    const { EXCHANGE_NAME, channel, connection } =
      await createRabbitMQConnection();
    const notificationPayload = JSON.stringify({
      event: EventType.SEND_OTP,
      data: {
        phone: phone,
      },
    });
    channel.publish(
      EXCHANGE_NAME,
      EventType.SEND_OTP,
      Buffer.from(notificationPayload)
    );

    console.log("publishSmsNotification");
    await channel.close();
    await connection.close();
  } catch (error) {
    throw error;
  }
};
