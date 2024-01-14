import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Input } from 'react-native-elements';
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';
import { Header } from '../components/Header';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "SignUp">;
}

export const SignUpScreen = ({ navigation }: Props) => {
    const { signUp } = useAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <View className='bg-primary flex-1 items-center justify-top'>
            <Header navigation={navigation} isBackButton={true} />
            <Text className='mt-20 mb-20 text-3xl font-bold'>アカウント登録</Text>
            <Input
                placeholder='type email'
                value={email}
                onChangeText={setEmail}
                textContentType='emailAddress'
            />
            <Input
                placeholder='type password'
                value={password}
                onChangeText={setPassword}
                textContentType='password'
            />

            {/* SignUp Button */}
            <Pressable
                style={styles.button}
                onPress={() => {
                    signUp(email, password)
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
                >登録</Text>
            </Pressable>

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