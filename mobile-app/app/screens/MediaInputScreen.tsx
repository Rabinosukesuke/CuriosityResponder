import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Header } from '../components/Header'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type'; 

type MediaInputScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MediaInputScreen'
>;

// Props型を定義
type Props = {
  navigation: MediaInputScreenNavigationProp;
};

const MediaInputScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <Header navigation={navigation} BackScreenName={"Home"} />
      
      <View style={styles.centeredView}>
        <Text style={styles.text}>この画面は作成中です。</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 18
  }
});

export default MediaInputScreen;
