import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

const MediaInputScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>

      
      {/* チャットバブル */}
      <View style={styles.chatBubble}>
        <Text style={styles.chatText}>いまどうしてる？</Text>
      </View>
      
      {/* 画像サムネイル */}
      <Image 
        source={{ uri: 'path_to_your_image' }}
        style={styles.thumbnail}
      />
      
      {/* メディアアイコン */}
      <View style={styles.iconRow}>
        <FontAwesome5 name="microphone" size={24} color="white" />
        <FontAwesome5 name="camera" size={24} color="white" />
        <FontAwesome name="photo" size={24} color="white" />
        <Ionicons name="add-circle-outline" size={24} color="white" />
        {/* その他のアイコンをここに追加 */}
      </View>
      
      {/* テキスト入力エリア */}
      <TextInput 
        style={styles.textInput}
        placeholder="Aa"
        placeholderTextColor="#888"
      />
      
      {/* ここにキーボードを表示させる */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ここにスタイルを定義
  navBar: {
    // ナビゲーションバーのスタイル
  },
  timeText: {
    // 時刻テキストのスタイル
  },
  chatBubble: {
    // チャットバブルのスタイル
  },
  chatText: {
    // チャットテキストのスタイル
  },
  thumbnail: {
    // 画像サムネイルのスタイル
  },
  iconRow: {
    // アイコンの行のスタイル
  },
  textInput: {
    // テキスト入力のスタイル
  },
  // その他のスタイル
});

export default MediaInputScreen;
