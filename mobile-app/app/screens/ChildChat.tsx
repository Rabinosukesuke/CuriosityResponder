import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { FloatingButton } from '../components/FloatingActionButton';
import { Header } from '../components/Header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChatData, RootStackParamList } from '../types/type';
import { RouteProp } from '@react-navigation/native';
import { useBackendAPI } from '../hooks/useBackendAPI';
import { useSelector } from 'react-redux'
import { selectAuth } from '../slices/authSlices';
import { AntDesign } from '@expo/vector-icons';
import { useOpenAIAPI } from '../hooks/useOpenAIAPI';

type ChildChatScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ChildChat'
>;

type Props = {
  navigation: ChildChatScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'ChildChat'>;
};

type FontAwesomeName = 'smile-o' | 'meh-o' | 'frown-o';
type IconType = 'happy' | 'normal' | 'sad';

const convertEmojiName = (iconName: IconType): FontAwesomeName => {
  const iconMap: Record<IconType, FontAwesomeName> = {
    'happy': 'smile-o',
    'normal': 'meh-o',
    'sad': 'frown-o',
  };
  return iconMap[iconName] || 'meh-o';
};

export const ChildChat = ({ navigation, route }: Props) => {
  const user = useSelector(selectAuth);

  const [emoji, setEmoji] = useState<FontAwesomeName>('meh-o');
  const [question, setQuestion] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [datetime, setDatetime] = useState<Date | null>(null);

  const { storeChatHistoryToBackend } = useBackendAPI();
  const { sendToGPT } = useOpenAIAPI();

  useEffect(() => {
    if (route.params?.question) {
      setQuestion(route.params.question);
    }
    if (route.params?.response) {
      setResponse(route.params.response);
    }
    if (route.params?.datetime) {
      setDatetime(new Date(route.params.datetime));
    }
  }, [route.params?.question, route.params?.response, route.params?.datetime]);

  const updateEmoji = (selectedEmoji: IconType) => {
    if (user == null) {
      navigation.navigate("Home");
    } else if (question == '' || response == '' || datetime == null) {

    } else {
      const data: ChatData = {
        question: question,
        answer: response,
        datetime: datetime,
        emoji: selectedEmoji
      };
      storeChatHistoryToBackend(user.uid, data);
    }
    setEmoji(convertEmojiName(selectedEmoji));
  };

  return (
    <View style={styles.container}>
      
      <Header navigation={navigation} currentScreen="ChildChat" />

      {question != '' || response != '' || datetime != null ?
        (
          <FontAwesome name={emoji} size={24} style={styles.emojiIcon} />
        ) : (null)
      }

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
        {question != '' || response != '' || datetime != null ?
          (
            <View className='flex-row '>
              <TouchableOpacity
                className='relative mr-60'
                onPress={async () => {
                  const regenerate_res = await sendToGPT(question);
                  setResponse(regenerate_res);
                  if (user == null || datetime == null) {
                    navigation.navigate("Home");
                  } else {
                    storeChatHistoryToBackend(user.uid, {
                      question: question,
                      answer: regenerate_res,
                      datetime: datetime,
                      emoji: "normal"
                    });
                  }
                }}
              >
                <AntDesign name="retweet" size={24} color="black" />
              </TouchableOpacity>

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
          ) : (null)
        }
      </View>
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
    marginBottom: 50,
    height: 80,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});