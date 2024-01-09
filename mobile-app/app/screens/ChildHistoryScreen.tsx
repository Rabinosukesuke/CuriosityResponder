import { View, Text } from 'react-native'
import React from 'react'
import { Header } from '../components/Header';
import TopBar from '../components/TopBar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}

export const ChildHistoryScreen = ({ navigation }: Props) => {
    return (
        <View className='bg-primary flex-1'>
            <Header navigation={navigation} BackScreenName={"Home"} />
            <View className='h-4/6'>

            </View>
            <TopBar />
        </View>
    )
}
