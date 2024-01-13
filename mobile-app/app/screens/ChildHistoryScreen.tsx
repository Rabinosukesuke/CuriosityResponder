import React, { useState, useEffect } from 'react';
import { View, Pressable } from 'react-native';
import { Input } from 'react-native-elements';
import { TapBar } from '../components/TapBar';
import { Header } from '../components/Header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, ChatRecord } from '../types/type';
import { ChildHistoryComponent } from "../components/ChildHistoryComponent";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useChatStorage } from '../hooks/useChatStorage';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "ChildHistoryScreen">;
}

export const ChildHistoryScreen = ({ navigation }: Props) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [storageData, setStorageData] = useState<ChatRecord[]>([]);
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const { fetchAllChatFromStorage } = useChatStorage();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllChatFromStorage();
      setStorageData(data);
    };
    fetchData();
  }, []);

  const SortAndFilterChatData = storageData
    .filter(item => item.value.question.includes(searchValue) || item.value.answer.includes(searchValue))
    .sort((a, b) => {
      if (isToggled) {
        return new Date(a.value.timestamp) > new Date(b.value.timestamp) ? 1 : -1;
      } else {
        return new Date(a.value.timestamp) < new Date(b.value.timestamp) ? 1 : -1;
      }
    });

  return (
    <View className='flex-1 bg-primary items-center w-full h-full'>
      <Header navigation={navigation} BackScreenName={'ChildChatScreen'} />

      <Input
        placeholder="検索"
        placeholderTextColor={"black"}
        value={searchValue}
        onChangeText={setSearchValue}
        containerStyle={{
          width: '80%',
          height: "5%",
          marginTop: -14,
          justifyContent: 'center',
        }}
        inputContainerStyle={{
          height: "100%",
          backgroundColor: 'white',
          borderRadius: 20,
          borderColor: 'black',
          borderWidth: 1,
        }}
        inputStyle={{ paddingLeft: 5 }}
        leftIcon={<FontAwesome name="search" size={20} color="black" />}
        leftIconContainerStyle={{ marginLeft: 10 }}
      />

      <View className='w-full h-3/5 items-center'>
        {SortAndFilterChatData.map((item: ChatRecord, index: number) => (
          <ChildHistoryComponent
            key={index}
            timestamp={item.value.timestamp}
            question={item.value.question}
            answer={item.value.answer}
            emoji={item.value.emoji}
          />
        ))}
      </View>

      <Pressable
        className='absolute top-48 right-5'
        onPress={() => { setIsToggled(!isToggled) }}>
        <FontAwesome5 name={isToggled ? ("sort-amount-up-alt") : ("sort-amount-down")} size={24} color="black" />
      </Pressable>

      <TapBar />
    </View>
  );
};
