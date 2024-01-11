import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import TapBar from '../components/TapBar';
import { Header } from '../components/Header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';
import { ChildHistoryComponent } from "../components/ChildHistoryComponent";

// ダミーの投稿データ
const posts = [
  { id: '1', title: 'First Post', category: 'Tech' },
  { id: '2', title: 'Second Post', category: 'Travel' },
  // ... 他の投稿データ
];

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "ChildChatScreen">;
}

const ChildChatScreen = ({ navigation }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [showPosts, setShowPosts] = useState(posts);

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
      {/* ヘッダーコンポーネント */}
      <Header navigation={navigation} BackScreenName={'Home'} />

      {/* フリーキーワード検索フォーム */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchValue}
          onChangeText={search}
        />
        {/* <ChildHistoryComponent /> */}
      </View>

      {/* 検索結果を表示するリスト */}
      <FlatList
        data={showPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text>{item.title}</Text>
            <Text>Category: {item.category}</Text>
          </View>
        )}
      />

      {/* タブバーコンポーネント */}
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

export default ChildChatScreen;
