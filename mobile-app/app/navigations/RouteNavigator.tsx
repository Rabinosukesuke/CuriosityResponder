import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../screens/HomeScreen'
import { SignInScreen } from '../screens/SignInScreen'
import { SignUpScreen } from '../screens/SignUpScreen'
import { ParentLoginScreen } from '../screens/ParentLoginScreen'

const Stack = createNativeStackNavigator();

export const RouteNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#95E1D3',
                    },
                    headerTitleAlign: 'center',
                }}
            >
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='SignIn' component={SignInScreen} />
                <Stack.Screen name='SignUp' component={SignUpScreen} />
                <Stack.Screen name='ParentLogin' component={ParentLoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}