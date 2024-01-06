import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Input } from 'react-native-elements';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from '../slices/authSlices';
import { useAuth } from '../hooks/useAuth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "ParentLogin">;

type Props = {
    navigation: HomeScreenNavigationProp;
}

export const ParentLoginScreen = ({ navigation }: Props) => {
    const { signIn } = useAuth();

    const user = useSelector(selectAuth);

    const email = user?.email;

    const [password, setPassword] = useState<string>('');

    return (
        <View className='bg-primary flex-1 items-center justify-center'>
            <Text className='text-3xl font-bold'>保護者向けログイン</Text>
            <Input
                placeholder='**password**'
                value={password}
                onChangeText={setPassword}
                textContentType='password'
            />

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
                >ログイン</Text>
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
