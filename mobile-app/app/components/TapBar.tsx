import React, { useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/type';

const windowWidth = Dimensions.get('window').width;

export const TapBar = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const animation = useRef(new Animated.Value(0)).current;
  const buttonSize = 70;

  const navigateToMediaInputScreen = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      animation.setValue(0);
      navigation.navigate('MediaInputScreen');
    });
  };
  const navigateToChildHistoryScreen = () => {
    navigation.navigate('ChildHistoryScreen');
  };
  const navigateToSettingsScreen = () => {
    navigation.navigate('SettingsScreen');
  };

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const buttonStyle = {
    position: 'absolute' as const, 
    top: 0,
    left: windowWidth / 2 + -15,
    transform: [
      { translateX: -(buttonSize / 2) },
      { translateY: -(buttonSize / 2) },
      { rotate },
    ],
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    backgroundColor: '#95E1D3',
    borderColor: '#CBF0E9',
    borderWidth: 10,
    justifyContent: 'center' as const, 
    alignItems: 'center' as const,
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToChildHistoryScreen}>
        <FontAwesome5 name="stack-overflow" size={40} color="#95E1D3" style={styles.icon} />
      </TouchableOpacity>
      <Animated.View style={buttonStyle}>
        <TouchableOpacity onPress={navigateToMediaInputScreen}>
          <FontAwesome5 name="plus" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity onPress={navigateToSettingsScreen}>
        <FontAwesome5 name="cog" size={40} color="#95E1D3" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 32,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: 'white',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingBottom: 50, 
  },
  icon: {
    marginHorizontal: 60, 
    marginBottom: -50,
  },

});