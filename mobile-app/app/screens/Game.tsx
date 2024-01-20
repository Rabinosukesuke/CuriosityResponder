import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { questions } from '../Gamedata';
import { useSelector } from 'react-redux';
import { selectAuth } from "../slices/authSlices";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';
import { Header } from '../components/Header';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Game">;
}

export const Game = ({ navigation }: Props) => {
  const user = useSelector(selectAuth);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);

  // アニメーション用の変数
  const fadeInText = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handleCheckAnswer = () => {
    if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setScore(score + 1);
      showSuccessAnimation();
    } else {
      // 不正解の場合、ここでアラートを表示
      Alert.alert('不正解', `正解は: ${currentQuestion.answer}`);
    }

    const nextQuestion = getNextQuestion();
    setCurrentQuestion(nextQuestion);
    setUserAnswer('');
  };

  const getNextQuestion = () => {
    const nextQuestion = questions.find(q => q.id > currentQuestion.id);
    return nextQuestion || questions[0];
  };

  const showSuccessAnimation = () => {
    fadeInText.value = withSpring(10, {duration: 2000}, () => {
      fadeInText.value = 0;
    });

    translateY.value = withSpring(-100, {duration: 2000}, () => {
      translateY.value = 0;
    });
  };

  // テキストのアニメーションスタイル
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeInText.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Header navigation={navigation} isBackButton={true} />
      <View style={styles.content}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        <TextInput
          style={styles.input}
          placeholder="答えを入力してください"
          onChangeText={setUserAnswer}
          value={userAnswer}
        />
        <TouchableOpacity
          style={styles.customButton}
          onPress={handleCheckAnswer}
        >
          <Text style={styles.buttonText}>答えを確認</Text>
        </TouchableOpacity>
        <Text style={styles.scoreText}>Score: {score}</Text>

        {/* 画面遷移のボタン */}
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Homeに戻る</Text>
        </TouchableOpacity>
        <Animated.Text style={[styles.successText, animatedTextStyle]}>
          正解！
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBF0E9',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    width: 320,
    height: 160,
    borderRadius: 12,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  input: {
    width: 400,
    height: 52,
    backgroundColor: '#CBF0E9',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    paddingLeft: 10,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    textAlign: 'center',
    opacity: 0.8,
    fontWeight: 'bold',
    textDecorationStyle: 'solid',
    textDecorationColor: 'black',
  },
  customButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scoreText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    // backgroundColor: '#4CAF50',
    // borderRadius: 12,
  },
  successText: {
    color: 'yellow',
    fontSize: 40,
    fontWeight: 'bold',
  },
});
