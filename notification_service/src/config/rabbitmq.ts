import amqp from "amqplib";
import config from "./index";
import { ExchangeName } from "../utils/rabbitEvent.type";

export const createRabbitMQConnection = async () => {
  try {
    const connection = await amqp.connect(
      String(config.rabbit_url) || "amqp://localhost"
    );
    const channel = await connection.createChannel();

    // Declare an Exchange
    const EXCHANGE_NAME = ExchangeName.NOTIFICATION;
    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });

    return { connection, channel, EXCHANGE_NAME };
  } catch (error) {
    throw error;
  }
};
