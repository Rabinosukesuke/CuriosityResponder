import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Input } from 'react-native-elements';
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';
import { Header } from '../components/Header';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "SignIn">;
}

export const SignInScreen = ({ navigation }: Props) => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <View className='bg-primary flex-1 items-center justify-top'>
      <Header navigation={navigation} isBackButton={true} />
      {/* ログイン画面のタイトル */}
      <Text style={styles.loginText}>Discover Ease</Text>
      <Text style={styles.loginText2}>ログイン</Text>

      {/* メールアドレス入力欄 */}
      <Input
        placeholder='アカウントIDを入力してください'
        value={email}
        onChangeText={setEmail}
        textContentType='emailAddress'
        inputStyle={styles.input} // 入力欄のスタイル
        placeholderTextColor='#FFFFFF' // placeholderのテキスト色
      />

      {/* パスワード入力欄 */}
      <Input
        placeholder='パスワードを入力してください'
        value={password}
        onChangeText={setPassword}
        textContentType='password'
        inputStyle={styles.input} // 入力欄のスタイル
        placeholderTextColor='#FFFFFF' // placeholderのテキスト色
      />

      {/* ログインボタン */}
      <Pressable
        style={styles.button}
        onPress={() => {
          signIn(email, password)
            .then(() => {
              navigation.navigate("Home")
            })
            .catch((error) => {
              alert(error.message);
            })
        }}
      >
        <Text
          style={styles.buttonText}
        >Next</Text>
      </Pressable >

      {/* 新規アカウント作成への誘導 */}
      <View style={styles.signupTextContainer}>
        <Pressable
          style={styles.signupButton}
          onPress={() => {
            // 新規アカウント作成画面に遷移
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.signupButtonText}>アカウントがない方はこちら</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loginText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 60,
    marginBottom: 16,
  },  
  loginText2: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 60,
  }, 
  button: {
    width: 346,
    height: 52,
    borderWidth: 1,
    shadowColor: '#000',
    backgroundColor: "#6EE7B3",
    flexDirection: "column",
    borderRadius: 50,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
    marginTop: "10%",
  },
  signupTextContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingLeft: 140,
    paddingTop: 8,
  },
  input: {
    flex: 1,
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
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "400",
    letterSpacing: -0.5,
    textTransform: "capitalize",
  },
  signupButton: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  signupButtonText: {
    color: '#000AFF',
    paddingLeft: 5,
  },
});
