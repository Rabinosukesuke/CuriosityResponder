import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import TapBar from '../components/TapBar';
import { Header } from '../components/Header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';
import { ChildHistoryComponent } from "../components/ChildHistoryComponent";
import { ChatDataWithKey } from '../types/type';
import { FontAwesome } from '@expo/vector-icons';
import { useChatStorage } from '../hooks/useChatStorage';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "ChildHistoryScreen">;
}

export const ChildHistoryScreen = ({ navigation }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [storageData, setStorageData] = useState<ChatDataWithKey[]>([]);

  const { getAllChat } = useChatStorage();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllChat();
      setStorageData(data);
    };
    fetchData();
  }, []);

  return (
    <View className='flex-1 bg-primary items-center w-full h-full'>
      <Header navigation={navigation} BackScreenName={'ChildChatScreen'} />

      <Input
        placeholder="検索"
        placeholderTextColor={"#000000"}
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
        {storageData.map((item: ChatDataWithKey, index) => (
          <ChildHistoryComponent
            key={index}
            timestamp={item.value.timestamp}
            question={item.value.question}
            answer={item.value.answer}
            emoji={item.value.emoji}
          />
        ))}
      </View>

      <TapBar />
    </View>
  );
};
