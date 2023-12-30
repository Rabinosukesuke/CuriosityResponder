import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import { UserInfo } from '../components/UserInfo';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/userSlices';
import { useDispatch } from 'react-redux';
import { signOut } from '../slices/userSlices';
import { AppDispatch } from '../store';

export const HomeScreen = ({ navigation }: any) => {

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);

  return (
    <View style={styles.container}>
      {user?.user ? (
        <View>
          <Text>You are already logged in</Text>
          <UserInfo />
          <Button
            title='Sign Out'
            onPress={() => {
              dispatch(signOut())
            }}
          />
        </View>
      ) : (
        <View >
          <Text>HomeScreen</Text>
          <Button
            title='Sign In'
            onPress={() => navigation.navigate("SignIn")}
          />
          <Button
            title='Sign Up'
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
      )}
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

