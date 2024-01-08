import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from '../slices/authSlices';
import { useAuth } from '../hooks/useAuth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';
import { useFonts, Junge_400Regular } from '@expo-google-fonts/dev';
import { Header } from '../components/Header';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "ParentLogin">;

type Props = {
    navigation: HomeScreenNavigationProp;
}

export const ParentLoginScreen = ({ navigation }: Props) => {
    const { signIn } = useAuth();

    const user = useSelector(selectAuth);

    const email = user?.email;

    const [password, setPassword] = useState<string>('');

    const [fontsLoaded] = useFonts({
        Junge_400Regular,
    });

    if (!fontsLoaded) {
        return <Text>Loading...</Text>
    }

    return (
        <View className='bg-primary flex-1 items-center justify-start'>
            <Header navigation={navigation} BackScreenName={"Home"} />
            <Text
                style={{
                    color: "black",
                    textAlign: "center",
                    fontFamily: "Junge_400Regular",
                    fontSize: 32,
                    fontStyle: "normal",
                    fontWeight: "400",
                    letterSpacing: -0.5,
                    textTransform: "capitalize",

                    marginTop: "5%",
                }}
            >Discover Ease{'\n'}保護者向けログイン</Text>
            <View className='w-11/12 h-16 mt-16'>
                <Text
                    className='ml-3'
                >パスワード</Text>
                <TextInput
                    placeholder='パスワードを入力してください'
                    value={password}
                    onChangeText={setPassword}
                    style={styles.Input}
                    inputMode='url'
                    placeholderTextColor={"#ffffff"}
                    secureTextEntry={true}
                />
            </View>

            {/* ParentLogin Button */}
            <Pressable
                style={styles.button}
                onPress={() => {
                    if (email && password) {
                        signIn(email, password)
                            .then(() => {
                                alert("ログイン成功")
                                console.log("ログイン成功")
                            })
                            .catch((err) => {
                                console.log(err);
                                alert(err.message);
                            })
                    }
                    else if (!email) {
                        alert("認証情報がありません。")
                        console.log("認証情報がありません。")
                        navigation.navigate("Home")
                    }
                    else if (!password) {
                        console.log("パスワードを入力してください")
                        alert("パスワードを入力してください")
                    }
                }}
            >
                <Text
                    style={styles.buttonText}
                >Next</Text>
            </Pressable>
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
        marginTop: "50%",
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontFamily: "Junge_400Regular",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "400",
        letterSpacing: -0.5,
        textTransform: "capitalize",
    },
    Input: {
        width: "100%",
        height: "100%",
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#ffffff",

        textAlign: "center",
        fontFamily: "Junge_400Regular",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "400",
        color: "#fff",
        letterSpacing: -0.5,
    }
});
