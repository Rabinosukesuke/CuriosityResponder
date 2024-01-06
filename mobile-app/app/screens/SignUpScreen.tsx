import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Input } from 'react-native-elements';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signUp } from '../slices/userSlices'
import { AppDispatch } from '../store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "SignUp">;

type Props = {
    navigation: HomeScreenNavigationProp;
}

export const SignUpScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <View className='bg-primary flex-1 items-center justify-center'>
            <Text className='text-3xl font-bold'>アカウント登録</Text>
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
                    dispatch(signUp({ email, password }))
                        .then(() => {
                            navigation.navigate("Home")
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }}>
                <Text
                    style={styles.buttonText}>
                    登録
                </Text>
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