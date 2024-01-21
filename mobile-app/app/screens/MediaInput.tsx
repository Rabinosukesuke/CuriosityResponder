import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBackendAPI } from '../hooks/useBackendAPI';
import { useSelector } from 'react-redux'
import { selectAuth } from '../slices/authSlices';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, ChatData, DrawerParamList } from '../types/type';
import { useOpenAIAPI } from '../hooks/useOpenAIAPI';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "MediaInput">
};

export const MediaInput = ({ navigation }: Props) => {
  const user = useSelector(selectAuth);

  const drawNavigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const [inputText, setInputText] = useState<string>('');
  const inputRef = useRef<TextInput>(null);

  const { storeChatHistoryToBackend } = useBackendAPI();
  const { sendToGPT } = useOpenAIAPI();

  useEffect(() => {
    // キーボード表示
    inputRef.current?.focus();
  }, []);

  const submitQuestion = async (question: string) => {
    if (user == null) {
      navigation.navigate("Home");
    } else if (question == '') {
      return;
    } else {
      const answer = await sendToGPT(question);
      const datetime_now = new Date();
      const data: ChatData = {
        question: question,
        answer: answer,
        datetime: datetime_now,
        emoji: "normal"
      };
      await storeChatHistoryToBackend(user.uid, data);
      drawNavigation.navigate("おしゃべりタイムライン", {
        question: question,
        response: answer,
        datetime: datetime_now.toISOString(),
      });
    }
  }

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
        onPress={() => { submitQuestion(inputText) }}
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