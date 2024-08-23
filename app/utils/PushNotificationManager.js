import React, { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import * as PushNotification from "react-native-push-notification";
import RNPermissions, {
  PERMISSIONS,
  RESULTS,
  checkNotifications,
} from "react-native-permissions";

const PUSH_NOTIFICATION_CHANNEL_ID = "SAMPLE_FOODHUB";

export const showLocalNotification = (notificationData) => {
  PushNotification.localNotification(notificationData);
};

export const createPushNotificationChannel = (channel, channelId) => {
  PushNotification.channelExists(channelId, function (exists) {
    if (!exists) {
      PushNotification.createChannel({
        channelId: channelId,
        channelName: channel,
        importance: 4,
        vibrate: true,
        vibration: 4000,
        invokeApp: false,
      });
    }
  });
};

const requestNotificationPermission = async () => {
  try {
    const checkPermission = await checkNotifications();
    if (checkPermission) {
      const result = await RNPermissions.request(
        PERMISSIONS.ANDROID.POST_NOTIFICATIONS
      );

      return result === RESULTS.BLOCKED;
    }
    return false;
  } catch (e) {
    return true;
  }
};

const PushNotificationManager = () => {
  useEffect(() => {
    requestToken();
    displayNotificationInForeground();
    createPushNotificationChannel("FOODHUB", PUSH_NOTIFICATION_CHANNEL_ID);
  }, []);

  const requestToken = async () => {
    await messaging().hasPermission();
    await messaging().requestPermission();
    await requestNotificationPermission();
    getToken();
  };

  const getToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    await messaging()
      .getToken()
      .then((fcmToken) => {
        console.log("fcmToken", fcmToken);
      });
  };

  const parseDataFromRemoteMessage = (remoteMessage) => {
    if (remoteMessage) {
      const notificationData = {
        title: "",
        message: "",
        data: null,
        vibrate: true,
        channelId: PUSH_NOTIFICATION_CHANNEL_ID,
      };

      if (remoteMessage.notification) {
        notificationData.title = remoteMessage.notification.title ?? "";
        notificationData.message = remoteMessage.notification.body ?? "";
      }
      notificationData.data = remoteMessage.data ?? {};

      if (remoteMessage?.notification?.android?.channelId) {
        notificationData.channelId =
          remoteMessage.notification.android.channelId;
      }

      return notificationData;
    }
  };

  const displayNotificationInForeground = () => {
    messaging().onMessage(async (remoteMessage) => {
      const notificationData = parseDataFromRemoteMessage(remoteMessage);
      showLocalNotification(notificationData);
    });
  };

  return <></>;
};

export default PushNotificationManager;
