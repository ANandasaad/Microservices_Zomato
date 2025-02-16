import app from "./app";
import config from "./config";
import { consumeNotificationEvent } from "./consumer.ts/notification.consumer";

const PORT = config.port || 4000;

consumeNotificationEvent().catch((error) => {
  console.log("Error", error);
});
app.listen(PORT, () => {
  console.log("Notification server listening on port", PORT);
});
