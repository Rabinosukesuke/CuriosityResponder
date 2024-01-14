import { View, Text, Image, } from 'react-native'
import React, { memo } from 'react'
import { ChatData } from '../types/type'

const MemoChildHistoryComponent = (data: ChatData) => {
    return (
        <View className='w-11/12 h-1/6 flex-row items-center'>
            {data.emoji === 'happy' ? (
                <Image
                    source={require('../../app/assets/happy.png')}
                    className='w-20 h-20'
                />
            ) : data.emoji === 'sad' ? (
                <Image
                    source={require('../../app/assets/sad.png')}
                    className='w-20 h-20'
                />
            ) : (
                <Image
                    source={require('../../app/assets/normal.png')}
                    className='w-20 h-20'
                />
            )}
            <View className='w-8/12'>
                <Text className='text-base font-bold'>{data.question}</Text>
                <Text className='text-sm font-normal'>{data.answer}</Text>
                <View className='border border-customGray mt-2' />
            </View>
        </View>
    )
}

export const ChildHistoryComponent = memo(MemoChildHistoryComponent);