import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { ParentLoginScreen } from '../screens/ParentLoginScreen';
import ChildChatScreen from '../screens/ChildChatScreen';
import MediaInputScreen from '../screens/MediaInputScreen';
import { useFonts, Yellowtail_400Regular } from '@expo-google-fonts/dev';

const Stack = createNativeStackNavigator();

export const RouteNavigator = () => {

    const [fontsLoaded] = useFonts({
        Yellowtail_400Regular,
    });

    if (!fontsLoaded) {
        return <Text>Font loading...</Text>
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#95E1D3',
                    },
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: 'Yellowtail_400Regular',
                        fontSize: 30,
                        color: '#FFFFFF',
                    },
                    headerTitle: 'Discoveries',
                    headerTintColor: '#FFFFFF', 
                }}
            >
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='SignIn' component={SignInScreen} />
                <Stack.Screen name='ChildChatScreen' component={ChildChatScreen} />
                <Stack.Screen name='MediaInputScreen' component={MediaInputScreen} />
                <Stack.Screen name='SignUp' component={SignUpScreen} />
                <Stack.Screen name='ParentLogin' component={ParentLoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}