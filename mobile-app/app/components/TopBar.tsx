import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Dimensions, Pressable } from 'react-native';
import { FontAwesome5 ,Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';

const windowWidth = Dimensions.get('window').width;

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "SettingsScreen">;
type Props = {
  navigation: SettingsScreenNavigationProp;
}
const HomeButton = ({ navigation }: Props) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current; // アニメーションの初期値は0です。

   // ボタンのサイズを定義します。
  const buttonSize = 60;

  const toggleMenu = () => {
    Animated.timing(animation, {
      toValue: menuOpen ? 0 : 1, // menuOpenの状態に応じてアニメーションの値を変更します。
      duration: 300, // アニメーションの持続時間は300msです。
      useNativeDriver: false,
    }).start();

    setMenuOpen(!menuOpen); 
  };

  const backgroundScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0], // ボタンが押されたら背景を消すために0にします。
  });

  const backgroundStyle = {
    position: 'absolute',
    width: buttonSize * 1.4, 
    height: buttonSize * 1.4, 
    borderRadius: buttonSize ,
    backgroundColor: '#CBF0E9', 
    top: -42,
    left: '55%',
    transform: [
      { translateX: -(buttonSize) }, 
      { scale: backgroundScale }, 
    ],
  };

  const menuWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [60, windowWidth * 0.9], 
  });


  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '135deg'], 
  });

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -90], 
  });
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -windowWidth * 0.45 + 30], 
  });

  const menuHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [buttonSize, 180], 
  });
  
  const menuStyle = {
    width: menuWidth,
    transform: [
        { translateX: Animated.multiply(menuWidth, -0.5) },
        { translateY: Animated.multiply(menuHeight, -0.5) },
      ],    
    backgroundColor: '#95E1D3',
    borderRadius: 30, 
    overflow: 'hidden',
  };

  const iconStyle = {
    transform: [{ rotate: rotate }],
  };
  

  return (
    <View style={styles.container}>
      <Animated.View style={styles.backgroundStyle} />
        <Pressable style={styles.button} onPress={() => navigation.navigate("SettingsScreen")}>
            <Ionicons style={styles.settingsIcon} name="settings" size={50} color="black" />
        </Pressable>
      <Animated.View style={[styles.menu, styles.menuStyle]}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Animated.View style={iconStyle}>
            <FontAwesome5 name="plus" size={24} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 32,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
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
  settingsIcon: {
    position: 'absolute',
    right: 0,
    top: 5,
  },
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
  menu: {
    position: 'absolute',
    top: '0%',
    left: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    transform: [
      { translateX: -30 }, 
      { translateY: -50 }, 
    ],
    backgroundColor: '#95E1D3',
  },  
  menuButton: {
    backgroundColor: 'transparent',
  },
  backgroundStyle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#CBF0E9',
    top: -42,
    left: '55%',
    transform: [
      { translateX: -30 }, 
      { scale: 0 }, 
    ],
  },
  menuStyle:{
    width: 60,
    transform: [
        { translateX: -30 },
        { translateY: -50 },
      ],    
    backgroundColor: '#95E1D3',
    borderRadius: 30, 
    overflow: 'hidden',
  }
});

export default HomeButton;
