import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import TopBar from '../components/TopBar';
// import { FontAwesome } from '@expo/vector-icons';

// FontAwesomeにおける有効なアイコン名の型
type FontAwesomeName = 'smile-o' | 'meh-o' | 'frown-o';

// 絵文字の変換を行う関数
const convertEmojiName = (iconName: string): FontAwesomeName => {
  const iconMap: Record<string, FontAwesomeName> = {
    'happy': 'smile-o',     
    'normal': 'meh-o',      
    'sad': 'frown-o',       
  };
  return iconMap[iconName] || 'meh-o'; 
};
type Props = {
  navigation: any; // 任意のナビゲーション型を指定するか、'any'を使用する
};

const ChildChatScreen: React.FC<Props> = ({ navigation }) => {
  const [emoji, setEmoji] = useState<FontAwesomeName>('meh-o');
  const [question, setQuestion] = useState('');

  // 絵文字を更新する関数
  const updateEmoji = (selectedEmoji: string) => {
    setEmoji(convertEmojiName(selectedEmoji));
  };


  return (
    <View style={styles.container}>
      {/* 絵文字の表示を更新 */}
      <FontAwesome name={emoji} size={24} style={styles.emojiIcon} />
      <View style={styles.inputQuestionContainer}>
        <TextInput
          style={styles.inputQuestion}
          placeholder="ここに質問を入力してね！"
          onChangeText={text => setQuestion(text)} // 入力されたテキストで質問を更新
          value={question} // TextInputの値を状態から設定
        />
      </View>
      <View style={styles.inputAnswerContainer}>
        <TextInput
          style={styles.inputAnswer}
          placeholder="回答はここに出るよ〜"
          editable={false}
          value={question} // 質問のテキストを回答として表示
        />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => updateEmoji('happy')}>
        <MaterialCommunityIcons name="emoticon-happy" size={24}  />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateEmoji('normal')}>
          <MaterialCommunityIcons name="emoticon-neutral" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateEmoji('sad')}>
          <MaterialCommunityIcons name="emoticon-sad" size={24}  />
        </TouchableOpacity>
        {/* <View style={styles.brandicon}>
        <FontAwesome name="twitter-square" size={24}  />
        </View> */}     
      </View>
      <TopBar navigation={navigation} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBF0E9',
  },
  emojiIcon: {
    position: 'absolute',
    left: 34, 
    top: 18, 
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
    flex:2,
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
    // brandicon: {

    // },

});

export default ChildChatScreen;
