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
      <Header navigation={navigation} BackScreenName={"Home"} />
      <Text className='mt-20 mb-20 text-3xl font-bold'>ログイン</Text>
      <Input
        placeholder='*****@example.com'
        value={email}
        onChangeText={setEmail}
        textContentType='emailAddress'
      />
      <Input
        placeholder='**password**'
        value={password}
        onChangeText={setPassword}
        textContentType='password'
      />

      {/* SignIn Button */}
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
        >ログイン</Text>
      </Pressable >
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: "70%",
    height: "5%",
    borderWidth: 1,
    shadowColor: "#000",
    backgroundColor: "#6EE7B3",
    flexDirection: "column",
    borderRadius: 50,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 1,

    marginTop: "30%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    // fontFamily: "Junge",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "400",
    letterSpacing: -0.5,
    textTransform: "capitalize",
  }
});