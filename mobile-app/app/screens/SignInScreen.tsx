import { View, Text, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements';
import React, { useState } from 'react'
import { UserInfo } from '../components/UserInfo'
import { useDispatch } from 'react-redux';
import { signIn } from '../slices/userSlices'
import { AppDispatch } from '../store';


export const SignInScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text>SignInScreen</Text>
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
      <Button title="SignIn" onPress={() => {
        dispatch(signIn({ email, password }))
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