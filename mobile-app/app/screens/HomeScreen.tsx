import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from "../slices/authSlices";
import { useAuth } from '../hooks/useAuth';
import { UserInfo } from '../components/UserInfo';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { type User as firebaseUser } from 'firebase/auth';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen = ({ navigation }: Props) => {
  const user = useSelector(selectAuth);

  const { signOut, autoSignIn } = useAuth();

  if (user) {
    navigation.navigate("ChildChatScreen")
  }
  else {
    let initialized = false;

    onAuthStateChanged(auth, (user: firebaseUser | null) => {
      if (!initialized) {
        initialized = true;
        console.log("onAuthStateChanged : ", user?.email);
        if (user) {
          autoSignIn(user)
            .catch((error) => {
              alert(error.message);
            })
        }
      }
    })
  }


  return (
    <View className='bg-primary flex-1'>
      {
        user ? (
          // logged in
          <View className='flex-1 items-center justify-center'>
            <Text className='text-3xl'>
              You are already logged in
            </Text>

            <UserInfo />

            {/* ChildChatScreen Button */}
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("ChildChatScreen")}
            >
              <Text
                style={styles.buttonText}
              >チャット画面</Text>
            </Pressable>

            {/* ParentLoginScreen Button */}
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("ParentLogin")}
            >
              <Text
                style={styles.buttonText}
              >親用ログイン</Text>
            </Pressable>

            {/* SignOut Button */}
            <Pressable
              style={styles.button}
              onPress={() => {
                signOut()
                  .catch((error) => {
                    alert(error.message);
                  })
              }}
            >
              <Text
                style={styles.buttonText}
              >ログアウト</Text>
            </Pressable>


          </View>
        ) : (
          // not logged in
          <View className='flex-1 items-center justify-center'>
            {/* SignIn Button */}
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("SignIn")}
            >
              <Text
                style={styles.buttonText}
              >ログイン</Text>
            </Pressable >

            {/* SignUp Button */}
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text
                style={styles.buttonText}
              >アカウント登録</Text>
            </Pressable >

          </View >
        )
      }
    </View >
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
    marginVertical: 5,
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