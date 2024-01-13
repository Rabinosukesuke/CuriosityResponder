import React, { useEffect } from 'react';
import { RouteNavigator } from './navigations/RouteNavigator';
import { Provider } from "react-redux";
import { store } from './store';
import { NativeWindStyleSheet } from "nativewind";
import { useChatStorage } from './hooks/useChatStorage';

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const { initChatStorage } = useChatStorage();

  useEffect(() => {
    initChatStorage();
  }, []);

  return (
    <Provider store={store}>
      <RouteNavigator />
    </Provider>
  );
}
