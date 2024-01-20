import React from 'react';
import { NavigationContainer, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { DrawerParamList, RootStackParamList } from '../types/type';
import { Home } from '../screens/Home';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { ParentLogin } from '../screens/ParentLogin';
import { MediaInput } from '../screens/MediaInput';
import { Game } from '../screens/Game';
import { Settings } from '../screens/Settings';
import { Splash } from '../screens/Splash';
import { Intro01 } from "../screens/Intro01";
import { Intro02 } from "../screens/Intro02";
import { Intro03 } from "../screens/Intro03";
import { Intro04 } from "../screens/Intro04";
import { Intro05 } from "../screens/Intro05";
import { Intro06 } from "../screens/Intro06";
import { Intro07 } from "../screens/Intro07";
import { Intro08 } from "../screens/Intro08";
import { LineChart } from "../screens/LineChart";
import { DailyHistory } from '../screens/DailyHistory';
import { ChildCombined } from "../screens/ChildCombined";
import { CharacterSettings } from "../screens/CharacterSettings";
import { DrawerNavigationProp, createDrawerNavigator } from '@react-navigation/drawer';


const RootStack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type DrawerStackScreenProps<T extends keyof DrawerParamList> =
  DrawerNavigationProp<DrawerParamList, T>;

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
        <RootStack.Screen name='Splash' component={Splash} />
        <RootStack.Screen name='Home' component={Home} />
        <RootStack.Screen name='SignIn' component={SignIn} />
        <RootStack.Screen name='SignUp' component={SignUp} />
        <RootStack.Screen name='ParentLogin' component={ParentLogin} />
        <RootStack.Screen name='MediaInput' component={MediaInput} />
        <RootStack.Screen name="Intro01" component={Intro01} />
        <RootStack.Screen name="Intro02" component={Intro02} />
        <RootStack.Screen name="Intro03" component={Intro03} />
        <RootStack.Screen name="Intro04" component={Intro04} />
        <RootStack.Screen name="Intro05" component={Intro05} />
        <RootStack.Screen name="Intro06" component={Intro06} />
        <RootStack.Screen name="Intro07" component={Intro07} />
        <RootStack.Screen name="Intro08" component={Intro08} />
        <RootStack.Screen name="LineChart" component={LineChart} />
        <RootStack.Screen name="Drawer" component={DrawerNavigation} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const ChildCombinedWrapper = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList, "ChildCombined">>();
  const route = useRoute<RouteProp<DrawerParamList, 'ChildCombined'>>();
  return <ChildCombined navigation={navigation} route={route} />;
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName='DailyHistory'>
      <Drawer.Screen name="ChildCombined" component={ChildCombinedWrapper} />
      <Drawer.Screen name="DailyHistory" component={DailyHistory} />
      <Drawer.Screen name="Game" component={Game} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="CharacterSettings" component={CharacterSettings} />
    </Drawer.Navigator>
  )
}