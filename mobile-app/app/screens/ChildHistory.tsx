import React, { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { Header } from '../components/Header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, ChatData } from '../types/type';
import { ChildHistoryComponent } from "../components/ChildHistoryComponent";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useBackendAPI } from '../hooks/useBackendAPI';
import { useSelector } from 'react-redux'
import { selectAuth } from '../slices/authSlices';
import { FloatingButton } from '../components/FloatingActionButton';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "ChildHistory">;
}

export const ChildHistory = ({ navigation }: Props) => {
  const user = useSelector(selectAuth);

  const [searchValue, setSearchValue] = useState<string>('');
  const [storageData, setStorageData] = useState<ChatData[]>([]);
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const { fetchChatHistoryFromBackend } = useBackendAPI();

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
  }, []);

  const SortAndFilterChatData = storageData
    .filter(item => item.question.includes(searchValue) || item.answer.includes(searchValue))
    .sort((a, b) => {
      if (isToggled) {
        return new Date(a.datetime) > new Date(b.datetime) ? 1 : -1;
      } else {
        return new Date(a.datetime) < new Date(b.datetime) ? 1 : -1;
      }
    });

  return (
    <View className='flex-1 bg-primary items-center w-full h-full'>
      <Header navigation={navigation} currentScreen="ChildHistory" />

      <Input
        placeholder="検索"
        placeholderTextColor={"black"}
        value={searchValue}
        onChangeText={setSearchValue}
        containerStyle={{
          width: '80%',
          height: "5%",
          marginTop: 50,
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

      <View className='w-full h-3/5 items-center overflow-y-scroll'>
        {SortAndFilterChatData.map((item: ChatData) => (
          <ChildHistoryComponent
            key={item.datetime.toString()}
            datetime={item.datetime}
            question={item.question}
            answer={item.answer}
            emoji={item.emoji}
          />
        ))}
      </View>

      <Pressable
        className='absolute top-48 right-5'
        onPress={() => { setIsToggled(!isToggled) }}>
        <FontAwesome5 name={isToggled ? ("sort-amount-up-alt") : ("sort-amount-down")} size={24} color="black" />
      </Pressable>
      <View style={styles.floatingButtonContainer}>
        <FloatingButton />
      </View>
      </View>
  );
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBF0E9',
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});