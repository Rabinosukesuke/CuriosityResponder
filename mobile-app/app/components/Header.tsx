import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';

type BackScreenName = keyof RootStackParamList

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, BackScreenName> | null;
    BackScreenName: BackScreenName | null;
}

export const Header = ({ navigation, BackScreenName }: Props) => {

    return (
        <View className='h-1/5 w-full flex flex-row'>
            <View className='w-1/5 h-full items-center justify-center'>
                {BackScreenName && navigation ? (
                    <Pressable
                        onPress={() => {
                            navigation.navigate(BackScreenName)
                        }}
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
