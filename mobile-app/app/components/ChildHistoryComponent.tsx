import { View, Text } from 'react-native'
import React from 'react'
import { StorageData } from '../types/type'
import { MaterialCommunityIcons } from '@expo/vector-icons';


export const ChildHistoryComponent = (data: StorageData) => {
    return (
        <View className='w-11/12 h-1/6 flex-row items-center'>
            {data.emoji === 'happy' ? (
                <MaterialCommunityIcons name="emoticon-happy" size={72} />
            ) : data.emoji === 'sad' ? (
                <MaterialCommunityIcons name="emoticon-sad" size={72} />
            ) : (
                <MaterialCommunityIcons name="emoticon-neutral" size={72} />
            )}
            <View className=''>
                <Text className='text-base font-bold'>どうしてそらは青いの?</Text>
                <Text className='text-sm font-normal'>質問してくれてありがとう</Text>
            </View>

        </View>
    )
}