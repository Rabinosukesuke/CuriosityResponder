import { View, Text, FlatList, Pressable, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList, ChatData, DrawerParamList } from '../types/type';
import { Header } from '../components/Header'
import { FloatingButton } from '../components/FloatingActionButton';
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
    console.log("function")

    return dateWithDayOfWeekList.reverse();
}

export const DailyHistory = ({ navigation }: Props) => {
    const user = useSelector(selectAuth);

    const dayOfWeekList = ["日", "月", "火", "水", "木", "金", "土"];
    const nowMonth = new Date().getMonth() + 1;
    const nowDay = new Date().getDate();

    const [selectedDate, setSelectedDate] = useState<number>(0);
    const [storageData, setStorageData] = useState<ChatData[]>([]);
    const [isToggled, setIsToggled] = useState<boolean>(false);

    const dateWithDayOfWeekList = getDaysFromNowToLastMonth();
    const drawNavigation = useNavigation<DrawerNavigationProp<DrawerParamList, "質問カレンダー">>();

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
        setSelectedDate(lastIndex);
        fetchData(lastIndex);
        console.log("useEffect")
    }, []);

    const SortChatData = storageData
        .sort((a, b) => {
            if (isToggled) {
                return new Date(a.datetime) > new Date(b.datetime) ? 1 : -1;
            } else {
                return new Date(a.datetime) < new Date(b.datetime) ? 1 : -1;
            }
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

            {/* <View style={styles.floatingButtonContainer}>
                <FloatingButton />
            </View> */}
        </View>
    )
}
const styles = StyleSheet.create({

    floatingButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});
