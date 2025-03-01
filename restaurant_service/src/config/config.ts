import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 4002,
  databaseUrl: process.env.DATABASE_URL,
  rabbit_url: process.env.RABBITMQ_URL,
};
