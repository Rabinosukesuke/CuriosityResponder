import React, { useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Animated, PanResponder } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/type'; 

export const FloatingButton: React.FC = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        pan.extractOffset();  // 移動量をオフセットとして抽出し、移動量をリセット
      },
    })
  ).current;

  return (
    <View style={{ flex: 1 }}>
      <Animated.View 
        style={[
          styles.circle, 
          { transform: pan.getTranslateTransform() } 
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
         onPress={() => navigation.navigate("MediaInput")}
        >
          <Icon name="plus" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: '#95E1D3',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 40,
    right: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
});