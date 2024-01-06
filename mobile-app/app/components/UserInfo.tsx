import { View, Text } from 'react-native'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from '../slices/authSlices';

const UserInfoMemo = () => {

  const user = useSelector(selectAuth);

  console.log("UserInfo is rendered");

  if (!user) {
    return (
      <View>
        <Text
          className='text-3xl'
        >You are not logged in</Text>
      </View>
    )
  }

  return (
    <View>
      <Text>your info</Text>
      <Text>uid : {user.uid}</Text>
      <Text>email : {user.email}</Text>
    </View>
  );
};

// memoize the component
export const UserInfo = memo(UserInfoMemo);