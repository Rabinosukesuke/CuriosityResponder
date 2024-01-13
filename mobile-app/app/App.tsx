import React, { useEffect } from 'react';
import { RouteNavigator } from './navigation/RouteNavigator';
import { Provider } from "react-redux";
import { store } from './store';
import { NativeWindStyleSheet } from "nativewind";
import { useChatStorage } from './hooks/useChatStorage';

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const { initChatDataInStorage } = useChatStorage();

  useEffect(() => {
    initChatDataInStorage();
  }, []);

  return (
    <Provider store={store}>
      <RouteNavigator />
    </Provider>
  );
}
