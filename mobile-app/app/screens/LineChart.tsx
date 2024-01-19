import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, ChatData } from '../types/type';
import { Header } from '../components/Header'
import { useSelector } from 'react-redux'
import { selectAuth } from '../slices/authSlices';
import { useBackendAPI } from '../hooks/useBackendAPI';
import { LineChart as LineChartTag } from "react-native-chart-kit";
import { Dimensions } from 'react-native';


type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "LineChart">;
}

export const LineChart = ({ navigation }: Props) => {
    const user = useSelector(selectAuth);

    const { fetchChatHistoryFromBackend } = useBackendAPI();

    const [storageData, setStorageData] = useState<ChatData[]>([]);

    const ONEWEEK = 7;
    const dayOfWeekList = ["日", "月", "火", "水", "木", "金", "土"];

    useEffect(() => {
        const fetchData = async () => {
            if (user == null) {
                console.log("user is null");
                navigation.navigate("Home");
            } else {
                const data = await fetchChatHistoryFromBackend(user.uid);
                setStorageData(data);
            }
        };
        fetchData();
        console.log(storageData.length);
    }, []);

    const datetime_now = new Date();

    const currentDate = Array.from({ length: ONEWEEK }, (_, i) => {
        const month: string = (datetime_now.getMonth() + 1).toString();
        const day: string = (datetime_now.getDate() - ONEWEEK + i + 1).toString();
        const dayOfWeek: string = dayOfWeekList[datetime_now.getDay() - ONEWEEK + i + 1];
        return `${month}/${day}${"\n"}${dayOfWeek}`
    });
    console.log(currentDate);

    const ChartData = Array.from({ length: 7 }, (_, i) => {
        const thisYear = new Date().getFullYear();
        let count = 0;
        storageData.forEach((item) => {
            const date = new Date(item.datetime);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            if (
                year == thisYear &&
                month == parseInt(currentDate[i].split("/")[0]) &&
                day == parseInt(currentDate[i].split("/")[1])

            ) count++;
        })
        return count;
    })
    console.log(ChartData);

    return (
        <View className='bg-primary flex-1 items-center'>
            <Header navigation={navigation} isBackButton={true} />

            <View className='h-1/12'></View>

            <LineChartTag
                data={{
                    labels: currentDate,
                    datasets: [{ data: ChartData }]
                }}
                width={Dimensions.get('window').width}
                height={400}
                yAxisLabel={""}
                yAxisSuffix={"回"}
                verticalLabelRotation={30}
                chartConfig={{
                    backgroundGradientFrom: "white",
                    backgroundGradientTo: "white",
                    decimalPlaces: 0,
                    barPercentage: 0.5,
                    color: (opacity = 1) => `rgba(9, 219, 181, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(9, 219, 181, ${opacity})`,
                    propsForVerticalLabels: {
                        fontSize: 14,
                        fontWeight: "bold",
                        fill: "black",
                    },
                    propsForHorizontalLabels: {
                        fontSize: 14,
                        fontWeight: "bold",
                        fill: "black",
                    },
                }}
                style={{
                    borderRadius: 16,
                }}
                bezier
            />

            <Text>あなたの総質問数は {storageData.length}回です</Text>
        </View>
    )
}
