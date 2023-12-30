import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { RouteNavigator } from './navigations/RouteNavigator';
import { Provider } from "react-redux";
import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <RouteNavigator />
    </Provider>
  );
}
