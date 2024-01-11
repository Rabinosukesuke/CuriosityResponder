import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import TapBar from '../components/TapBar';
import { Header } from '../components/Header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';
import { ChildHistoryComponent } from "../components/ChildHistoryComponent";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageData } from '../types/type';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';

// ダミーの投稿データ
const posts = [
  { id: '1', title: 'First Post', category: 'Tech' },
  { id: '2', title: 'Second Post', category: 'Travel' },
  // ... 他の投稿データ
];

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "ChildHistoryScreen">;
}

export const ChildHistoryScreen = ({ navigation }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [showPosts, setShowPosts] = useState(posts);
  const [storageData, setStorageData] = useState<{ key: string, value: StorageData }[]>([]);



  const getAllData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const numOnlyKeys = keys.filter((key) => !Number.isNaN(Number(key)));
    const values = await AsyncStorage.multiGet(numOnlyKeys);
    console.log(values);

    const storageData = []
    for (let i = 0; i < values.length; i++) {
      if (values[i][1] !== null) {
        const jsonObject = JSON.parse(values[i][1] as string);
        const data = {
          key: values[i][0],
          value: jsonObject["rawData"]
        }
        storageData.push(data);
      }
    }
    setStorageData(storageData);
    console.log(storageData);
  }

  useEffect(() => {
    getAllData();
  }, []);

  // 検索欄への入力値での絞り込み
  const search = (value: string) => {
    setSearchValue(value);

    // 検索欄への入力が空の場合は全ての投稿を表示
    if (value === '') {
      setShowPosts(posts);
      return;
    }

    const searchedPosts = posts.filter(
      (post) =>
        Object.values(post).filter(
          (item) =>
            item !== undefined &&
            item !== null &&
            item.toLowerCase().includes(value.toLowerCase())
        ).length > 0
    );

    setShowPosts(searchedPosts);
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} BackScreenName={'Home'} />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchValue}
          onChangeText={search}
        />
      </View>
      <View className='w-full h-3/5 items-center'>
        {storageData.map((item: { key: string, value: StorageData },) => (
          <ChildHistoryComponent
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBF0E9',
  },
  searchContainer: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  searchInput: {
    fontSize: 16,
  },
  postContainer: {
    marginHorizontal: 16,
    marginTop: 10,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
