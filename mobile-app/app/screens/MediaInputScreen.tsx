import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OPENAI_API_KEY } from '@env';
import axios from 'axios';
import {promptPrefix} from '../PromptConfig'; 

type Props = {
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params: { question: string; response: string }) => void;
  };
};

export const MediaInputScreen = ({ navigation }: Props) => {
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const sendToGPT = async () => {
    try {
      // プロンプトの組み合わせ
      const prompt = `${promptPrefix} ${inputText}`;
  
      // APIリクエストのボディを設定
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo", // 使用するモデル
          messages: [
            {
              role: "system",
              content: prompt
            },
            {
              role: "user",
              content: inputText
            }
          ],
          max_tokens: 150
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          }
        }
      );
  
      // APIレスポンスの確認
      if (response.status !== 200) {
        console.error("API request failed with response:", response);
        navigation.navigate('ChildChatScreen', { question: inputText, response: 'リクエストに失敗しました。' });
        return;
      }
  
      // レスポンスがOKの場合、応答データでナビゲート
      const data = response.data;
      navigation.navigate('ChildChatScreen', { question: inputText, response: data.choices[0].message.content.trim() });
    } catch (error) {
      console.error('Error during API request', error);
      navigation.navigate('ChildChatScreen', { question: inputText, response: 'エラーが発生しました。' });
    }
  };
  
  useEffect(() => {
    // キーボード表示
    inputRef.current?.focus();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="例) どうして空は青いの？"
        placeholderTextColor="#999"
        onChangeText={setInputText}
        value={inputText}
      />
      <TouchableOpacity
        style={styles.sendButton}
        onPress={sendToGPT} 
      >
        <Text>送信</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#CBF0E9'
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  sendButton: {
    position: 'absolute',
    top: 60,
    right: 30,
  },
  input: {
    width: '90%',
    height: 40,
    marginTop: 60,
    marginLeft: 20,
    borderBottomWidth: 0, 
    color: 'black',
    paddingHorizontal: 10,
  }
});

