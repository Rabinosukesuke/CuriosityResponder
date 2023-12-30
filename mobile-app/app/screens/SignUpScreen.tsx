import { View, Text, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements';
import React, { useState } from 'react'
import { UserInfo } from '../components/UserInfo'
import { useDispatch } from 'react-redux';
import { signUp } from '../slices/userSlices'
import { AppDispatch } from '../store';


export const SignUpScreen = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <View style={styles.container}>
            <Text>SignUpScreen</Text>
            <Input
                placeholder='type email'
                value={email}
                onChangeText={setEmail}
            />
            <Input
                placeholder='type password'
                value={password}
                onChangeText={setPassword}
            />
            <Button title="LogUp" onPress={() => {
                dispatch(signUp({ email, password }))
                    .then(() => {
                        navigation.navigate("Home")
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});