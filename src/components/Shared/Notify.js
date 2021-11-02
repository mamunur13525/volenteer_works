import { NotificationManager } from "react-notifications";

export const createNotification = (type,message1,message2) => {
  switch (type) {
    case "info":
      console.log("click info");
      NotificationManager.info(message2,message1,2000);
      break;
    case "success":
      NotificationManager.success(message2,message1,2000);
      break;
    case "warning":
      NotificationManager.warning(message2,message1,2000);
      break;
    case "error":
      NotificationManager.error(message2,message1,2000);
      break;
    default:
      break;
  }
};
