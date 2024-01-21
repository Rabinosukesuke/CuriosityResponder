import { View, Text, FlatList, Pressable, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList, ChatData, DrawerParamList } from '../types/type';
import { Header } from '../components/Header'
import { useSelector } from 'react-redux'
import { selectAuth } from '../slices/authSlices';
import { ChildHistoryComponent } from '../components/ChildHistoryComponent';
import { useBackendAPI } from '../hooks/useBackendAPI';
import { useNavigation } from '@react-navigation/native';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Drawer">;
}

type DateWithDayOfWeek = {
    datetime: Date
    month: number
    day: number
    dayOfWeek: number
}

const getDaysFromNowToLastMonth = (month: number): DateWithDayOfWeek[] => {
    const year = new Date().getFullYear();
    const date = new Date(year, month, 0);
    const daysInMonth = date.getDate();

    const dateWithDayOfWeekList = [];
    for (let i = 0; i < daysInMonth; i++) {
        const datetime = new Date(year, month, i + 1);
        const dayOfWeek = datetime.getDay();
        dateWithDayOfWeekList.push({
            datetime: datetime,
            month: month,
            day: i + 1,
            dayOfWeek: dayOfWeek,
        });
    }
    console.log(dateWithDayOfWeekList)
    return dateWithDayOfWeekList;
}

export const DailyHistory = ({ navigation }: Props) => {
    const drawNavigation = useNavigation<DrawerNavigationProp<DrawerParamList, "質問カレンダー">>();

    const user = useSelector(selectAuth);

    const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const dayOfWeekList = ["日", "月", "火", "水", "木", "金", "土"];
    const nowMonth = new Date().getMonth();
    const nowDay = new Date().getDate();

    const monthScrollView = useRef<ScrollView>(null);

    const [selectMonth, setSelectMonth] = useState<number>(0);
    const [selectedDate, setSelectedDate] = useState<number>(0);
    const [storageData, setStorageData] = useState<ChatData[]>([]);
    const [dateWithDayOfWeekList, setDateWithDayOfWeekList] = useState<DateWithDayOfWeek[]>([]);

    const { periodFetchChatHistoryFromBackend } = useBackendAPI();

    const lastIndex = dateWithDayOfWeekList.length - 1

    const fetchData = async (index: number) => {
        if (user == null) {
            console.log("user is null");
            navigation.navigate("Home");
        } else {
            const start = new Date(dateWithDayOfWeekList[index].datetime.setHours(0, 0, 0, 0));
            const end = new Date(dateWithDayOfWeekList[index].datetime.setHours(23, 59, 59, 999));
            const data = await periodFetchChatHistoryFromBackend(user.uid, start, end);
            setStorageData(data);
        }
    };

    useEffect(() => {
        const monthIndex = monthList.indexOf(nowMonth)
        setSelectMonth(monthIndex);
        if (monthScrollView.current) {
            monthScrollView.current.scrollTo({ x: 65 * monthIndex, y: 0, animated: false });
        }
        setSelectedDate(0);
        fetchData(0);
    }, []);

    useEffect(() => {
        setDateWithDayOfWeekList(getDaysFromNowToLastMonth(selectMonth));
        setSelectedDate(0);
    }, [selectMonth]);

    const SortChatData = storageData
        .sort((a, b) => {
            return new Date(a.datetime) > new Date(b.datetime) ? 1 : -1;
        });

    const renderDateWithDayOfWeek = ({ item, index }: { item: DateWithDayOfWeek, index: number }) => (
        <Pressable
            className='flex-1 items-center justify-center w-12 mx-1 my-5'
            onPress={async () => {
                console.log("pressed", item.day)
                setSelectedDate(index)
                await fetchData(index);
                console.log("fetchData", storageData)
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
            <Header navigation={null} />

            <View style={{ width: "100%", height: "3%" }}>
                <ScrollView
                    className="w-full h-full overflow-scroll"
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ref={monthScrollView}
                >
                    {monthList.map((item: number, index: number) => (
                        selectMonth == index ? (
                            <Pressable
                                key={index}
                                className='flex-1 items-center justify-center w-20 h-full mx-1 border rounded border-green-600'
                                onPress={() => { setSelectMonth(index) }}
                            >
                                <Text>{item}月</Text>
                            </Pressable>
                        ) : (
                            <Pressable
                                key={index}
                                className='flex-1 items-center justify-center w-20 h-full mx-1 border rounded border-green-100'
                                onPress={() => { setSelectMonth(index) }}
                            >
                                <Text className='text-gray-400'>{item}月</Text>
                            </Pressable>
                        )
                    ))}
                </ScrollView>
            </View>

            <View style={{ width: "100%", height: "10%" }}>
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

            <ScrollView
                style={{ width: "100%", paddingTop: "5%", overflow: "scroll" }}
            >
                {SortChatData.map((item: ChatData) => (
                    <Pressable
                        key={item.datetime.toString()}
                        onPress={() => {
                            drawNavigation.navigate("おしゃべりタイムライン", {
                                datetime: item.datetime.toISOString(),
                                question: item.question,
                                response: item.answer,
                                emoji: item.emoji,
                            });
                        }}
                    >
                        <ChildHistoryComponent
                            datetime={item.datetime}
                            question={item.question}
                            answer={item.answer}
                            emoji={item.emoji}
                        />
                    </Pressable>
                ))}
            </ScrollView>

        </View>
    )
}
