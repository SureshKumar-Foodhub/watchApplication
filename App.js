import React from "react";
import Routes from "./app/navigation/Routes";
import PushNotificationManager from "./app/utils/PushNotificationManager";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();
const App = () => {
  return (
    <>
      <Routes />
    </>
  );
};
export default App;
