import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';
import { Header } from '../components/Header'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "DailyHistory">;
}

type DateWithDayOfWeek = {
    datetime: Date
    month: number
    day: number
    dayOfWeek: number
}

export const DailyHistory = ({ navigation }: Props) => {
    const dayOfWeekList = ["日", "月", "火", "水", "木", "金", "土"];
    const nowMonth = new Date().getMonth() + 1;
    const nowDay = new Date().getDate();
    
    const getDaysFromNowToLastMonth = (): DateWithDayOfWeek[] => {
        const today = new Date();
        const lastMonth = new Date();
        lastMonth.setMonth(today.getMonth() - 1);

        const dateWithDayOfWeekList = [];
        while (today >= lastMonth) {
            const dateWithDayOfWeek: DateWithDayOfWeek = {
                datetime: new Date(today),
                month: today.getMonth() + 1,
                day: today.getDate(),
                dayOfWeek: today.getDay()
            }
            dateWithDayOfWeekList.push(dateWithDayOfWeek);
            today.setDate(today.getDate() - 1);
        }

        return dateWithDayOfWeekList.reverse();
    }
    const dateWithDayOfWeekList = getDaysFromNowToLastMonth();

    useEffect(() => {
        setSelectedDate(dateWithDayOfWeekList.length - 1);
    }, [dateWithDayOfWeekList]);

    const [selectedDate, setSelectedDate] = useState<number>(0);

    const renderDateWithDayOfWeek = ({ item, index }: { item: DateWithDayOfWeek, index: number }) => (
        <Pressable
            className='flex-1 items-center justify-center w-12 mx-1 my-5 '
            onPress={() => {
                console.log("pressed", item.day)
                setSelectedDate(index)
            }}
        >
            {index == selectedDate ? (
                item.month === nowMonth && item.day == nowDay ? (
                    <View className='items-center'>
                        <View className='w-5 h-5 items-center justify-center bg-blue-400 rounded-full'>
                            <Text >{dayOfWeekList[item.dayOfWeek]}</Text>
                        </View>
                        <Text >{item.day}</Text>
                    </View>
                ) : (
                    <View className='items-center'>
                        <View className='w-5 h-5 items-center justify-center '>
                            <Text >{dayOfWeekList[item.dayOfWeek]}</Text>
                        </View>
                        <Text >{item.day}</Text>
                    </View>
                )
            ) : (
                item.month === nowMonth && item.day == nowDay ? (
                    <View className='items-center'>
                        <View className='w-5 h-5 items-center justify-center bg-blue-400 rounded-full'>
                            <Text className='text-gray-400' >{dayOfWeekList[item.dayOfWeek]}</Text>
                        </View>
                        <Text className='text-gray-400'>{item.day}</Text>
                    </View>
                ) : (
                    <View className='items-center'>
                        <View className='w-5 h-5 items-center justify-center '>
                            <Text className='text-gray-400'>{dayOfWeekList[item.dayOfWeek]}</Text>
                        </View>
                        <Text className='text-gray-400'>{item.day}</Text>
                    </View>
                )
            )}
        </Pressable >
    )

    return (
        <View className='bg-primary flex-1'>
            <Header navigation={navigation} currentScreen='null' />

            <View className='h-30'>
                <FlatList
                    data={dateWithDayOfWeekList}
                    renderItem={renderDateWithDayOfWeek}
                    keyExtractor={(item) => item.datetime.toString()}
                    horizontal
                    initialScrollIndex={dateWithDayOfWeekList.length >= 1 ? dateWithDayOfWeekList.length - 1 : 0}
                    getItemLayout={(data, index) => (
                        { length: 56, offset: 56 * index, index }
                    )}
                />
            </View>

        </View>
    )
}
