import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';
import { useFonts, Yellowtail_400Regular } from '@expo-google-fonts/dev';

type RouteParamKey = keyof RootStackParamList

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, RouteParamKey> | null;
    BackScreenName: RouteParamKey | null;
}

export const Header = ({ navigation, BackScreenName }: Props) => {

    const [fontsLoaded] = useFonts({
        Yellowtail_400Regular,
    });
    if (!fontsLoaded) {
        return null;
    }

    return (
        <View className='h-1/5 w-full flex flex-row bg-secondary'>
            <View className='w-1/5 h-full items-center justify-end'>
                {BackScreenName && navigation ? (
                    <Pressable
                        className='pb-5 pt-5'
                        onPress={() => { navigation.navigate(BackScreenName) }}
                    >
                        <AntDesign name="arrowleft" size={32} color="black" />
                    </Pressable>
                ) :
                    (null)
                }
            </View>
            <View className='w-3/5 h-full flex-1 items-center justify-center'>
                <Text style={styles.Text}>Discoveries</Text>
            </View>
            <View className='w-1/5 h-full'></View>
        </View>
    )
}

const styles = StyleSheet.create({
    Text: {
        fontFamily: 'Yellowtail_400Regular',
        fontSize: 30,
        color: '#FFFFFF',
    }
})
