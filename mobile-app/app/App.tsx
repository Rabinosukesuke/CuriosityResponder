import React, { useEffect, useState } from 'react';
import { RouteNavigator } from './navigation/RouteNavigator';
import { Provider } from "react-redux";
import { store } from './store';
import { NativeWindStyleSheet } from "nativewind";
import * as Font from 'expo-font';
import { Yellowtail_400Regular } from '@expo-google-fonts/dev';

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Yellowtail_400Regular,
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <RouteNavigator />
    </Provider>
  );
}
