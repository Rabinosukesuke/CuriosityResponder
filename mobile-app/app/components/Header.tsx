import { View, Text, Pressable } from 'react-native'
import React, { memo } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';

type Props = {
    navigation: NativeStackNavigationProp<
        RootStackParamList,
        keyof RootStackParamList
    > | null;
    isBackButton: boolean;
}

const MemoHeader = ({ navigation, isBackButton }: Props) => {
    return (
        <View className='h-1/5 w-full flex flex-row bg-secondary'>
            <View className='w-1/5 h-full items-center justify-end'>
                {isBackButton && navigation ? (
                    <Pressable
                        className='pb-5 pt-5'
                        onPress={() => { navigation.goBack(); }}
                    >
                        <AntDesign name="arrowleft" size={32} color="black" />
                    </Pressable>
                ) :
                    (null)
                }
            </View>
            <View className='w-3/5 h-full flex-1 items-center justify-center'>
                <Text className='font-yellowtail text-3xl text-white'>Discoveries</Text>
            </View>
            <View className='w-1/5 h-full'></View>
        </View>
    )
}

export const Header = memo(MemoHeader);