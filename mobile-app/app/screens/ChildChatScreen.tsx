import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'; import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { TapBar } from '../components/TapBar';
import { Header } from '../components/Header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';
import { RouteProp } from '@react-navigation/native';

type ChildChatScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ChildChatScreen'
>;

type Props = {
  navigation: ChildChatScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'ChildChatScreen'>;
};

type FontAwesomeName = 'smile-o' | 'meh-o' | 'frown-o';

const convertEmojiName = (iconName: string): FontAwesomeName => {
  const iconMap: Record<string, FontAwesomeName> = {
    'happy': 'smile-o',
    'normal': 'meh-o',
    'sad': 'frown-o',
  };
  return iconMap[iconName] || 'meh-o';
};


export const ChildChatScreen: React.FC<Props> = ({ navigation, route }) => {
  const [emoji, setEmoji] = useState<FontAwesomeName>('meh-o');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (route.params?.question) {
      setQuestion(route.params.question);
    }
    if (route.params?.response) {
      setResponse(route.params.response);
    }
  }, [route.params?.question, route.params?.response]);
  const updateEmoji = (selectedEmoji: string) => {
    setEmoji(convertEmojiName(selectedEmoji));
  };


  return (
    <View style={styles.container}>
      <Header navigation={navigation} isBackButton={true} />
      <FontAwesome name={emoji} size={24} style={styles.emojiIcon} />
      <View style={styles.inputQuestionContainer}>
        <TextInput
          style={styles.inputQuestion}
          placeholder="ここに質問を入力してね！"
          editable={false}
          value={question}
        />
      </View>
      <View style={styles.inputAnswerContainer}>
        <TextInput
          style={styles.inputAnswer}
          placeholder="回答はここに出るよ〜"
          editable={false}
          value={response}
          multiline
        />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => updateEmoji('happy')}>
          <MaterialCommunityIcons name="emoticon-happy" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateEmoji('normal')}>
          <MaterialCommunityIcons name="emoticon-neutral" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateEmoji('sad')}>
          <MaterialCommunityIcons name="emoticon-sad" size={24} />
        </TouchableOpacity>
      </View>
      <TapBar />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBF0E9',
  },
  emojiIcon: {
    position: 'absolute',
    left: 34,
    top: 180,
    zIndex: 2,
    marginRight: 16,
  },
  inputQuestionContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  inputQuestion: {
    minHeight: 50,
    maxHeight: 100,
    fontSize: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 0,
  },
  inputAnswerContainer: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 5,
    marginBottom: 5,
    padding: 16,
  },

  inputAnswer: {
    width: '100%',
    fontSize: 16,
    borderRadius: 0,
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 100,
    backgroundColor: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopWidth: 0,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
});