import { View, Text } from 'react-native'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../slices/userSlices';

const UserInfoMemo = () => {
  const user = useSelector(selectUser);

  console.log("UserInfo is rendered");

  if (!user) {
    return (
      <View>
        <Text>You are not logged in</Text>
      </View>
    )
  }

  return (
    <View>
      <Text>your info</Text>
      <Text>{user.user?.uid}</Text>
      <Text>{user.user?.email}</Text>
    </View>
  );
};

// memoize the component
export const UserInfo = memo(UserInfoMemo);