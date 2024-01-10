import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type RootStackParamList } from '../types/type';
import { HomeScreen } from '../screens/HomeScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { ParentLoginScreen } from '../screens/ParentLoginScreen';
import ChildChatScreen from '../screens/ChildChatScreen';
import MediaInputScreen from '../screens/MediaInputScreen';
import ChildHistoryScreen from '../screens/ChildHistoryScreen';
import { useFonts, Yellowtail_400Regular } from '@expo-google-fonts/dev';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RouteNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='SignIn' component={SignInScreen} />
                <Stack.Screen name='ChildChatScreen' component={ChildChatScreen} />
                <Stack.Screen name='MediaInputScreen' component={MediaInputScreen} />
                <Stack.Screen name='SignUp' component={SignUpScreen} />
                <Stack.Screen name='ParentLogin' component={ParentLoginScreen} />
                <Stack.Screen name='ChildHistoryScreen' component={ChildHistoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}