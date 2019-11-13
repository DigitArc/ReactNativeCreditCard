import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from "expo-font";
import CreditCard from "./components/CreditCard";

export default function App() {
  const [appLoaded, setAppLoaded] = React.useState(false);
  React.useEffect(() => {
    Font.loadAsync({
      "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
      "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
      "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
      "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
      "Roboto-Mono": require("./assets/fonts/RobotoMono-Regular.ttf")
    }).then(() => setAppLoaded(true));
  }, []);

  return appLoaded && <CreditCard />;
}