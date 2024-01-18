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
            <Text style={styles.loginText}>Discover Ease</Text>
            <Text style={styles.loginText2}>アカウント作成</Text>
            <Input
                placeholder='アカウントIDを入力してください'
                value={email}
                onChangeText={setEmail}
                textContentType='emailAddress'
                inputStyle={styles.input}
                placeholderTextColor='#FFFFFF'
            />
            <Input
                placeholder='パスワードを入力してください'
                value={password}
                onChangeText={setPassword}
                textContentType='password'
                inputStyle={styles.input}
                placeholderTextColor='#FFFFFF'
            />

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
                <Text style={styles.buttonText}>Next</Text>
            </Pressable>

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
});
