import React, { useEffect } from 'react';
import { RouteNavigator } from './navigations/RouteNavigator';
import { Provider } from "react-redux";
import { store } from './store';
import { NativeWindStyleSheet } from "nativewind";
import { storage } from './strage';
import { initialStorageData } from "./initialStrageData"

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {

  useEffect(() => {
    const initializeStorage = async () => {
      for (let i = 0; i < initialStorageData.length; i++) {
        await storage.save({
          key: i.toString(),
          data: initialStorageData[i],
          expires: null,
        });
      }
    };
    const fetchData = async () => {
      const data = await storage.load({
        key: '0',
      });
      console.log(data);
    };

    initializeStorage();
    fetchData();
  }, []);



  return (
    <Provider store={store}>
      <RouteNavigator />
    </Provider>
  );
}
