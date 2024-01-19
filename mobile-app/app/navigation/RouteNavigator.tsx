import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { type RootStackParamList } from '../types/type';
import { Home } from '../screens/Home';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { ParentLogin } from '../screens/ParentLogin';
import { ChildChat } from '../screens/ChildChat';
import { MediaInput } from '../screens/MediaInput';
import { ChildHistory } from '../screens/ChildHistory';
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

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
        <RootStack.Screen name='Splash' component={Splash} />
        <RootStack.Screen name='Home' component={Home} />
        <RootStack.Screen name='SignIn' component={SignIn} />
        <RootStack.Screen name='SignUp' component={SignUp} />
        <RootStack.Screen name='ParentLogin' component={ParentLogin} />
        <RootStack.Screen name='ChildChat' component={ChildChat} />
        <RootStack.Screen name='MediaInput' component={MediaInput} />
        <RootStack.Screen name='ChildHistory' component={ChildHistory} />
        <RootStack.Screen name='Settings' component={Settings} />
        <RootStack.Screen name="Intro01" component={Intro01} />
        <RootStack.Screen name="Intro02" component={Intro02} />
        <RootStack.Screen name="Intro03" component={Intro03} />
        <RootStack.Screen name="Intro04" component={Intro04} />
        <RootStack.Screen name="Intro05" component={Intro05} />
        <RootStack.Screen name="Intro06" component={Intro06} />
        <RootStack.Screen name="Intro07" component={Intro07} />
        <RootStack.Screen name="Intro08" component={Intro08} />
        <RootStack.Screen name="LineChart" component={LineChart} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};