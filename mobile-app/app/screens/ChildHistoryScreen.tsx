import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import TopBar from '../components/TopBar';

const Index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.rect}>
        <View style={styles.group3Row}>
          <View style={styles.group3}>
            <View style={styles.rect4}></View>
            <View style={styles.rect3}>
              <View style={styles.group}>
                <View style={styles.ellipseStack}>
                  {/* FontAwesome アイコン */}
                  <FontAwesome name="smile-o" size={24} style={styles.icon} />
                  {/* FontAwesome アイコン */}
                  <FontAwesome name="meh-o" size={24} style={styles.icon} />
                  {/* MaterialCommunityIcons アイコン */}
                  <MaterialCommunityIcons
                    name="emoticon-happy"
                    size={24}
                    style={styles.icon}
                  />
                  {/* MaterialCommunityIcons アイコン */}
                  <MaterialCommunityIcons
                    name="emoticon-neutral"
                    size={24}
                    style={styles.icon}
                  />
                  {/* MaterialCommunityIcons アイコン */}
                  <MaterialCommunityIcons
                    name="emoticon-sad"
                    size={24}
                    style={styles.icon}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.group2}>
            <View style={styles.rect6Stack}>
              <View style={styles.rect6}>
                <View style={styles.rect7}>
                  <View style={styles.rect8}>
                    <View style={styles.rect9}></View>
                  </View>
                </View>
              </View>
              {/* MaterialCommunityIcons アイコン */}
              <MaterialCommunityIcons
                name="emoticon-excited"
                size={24}
                style={styles.icon}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 365,
    height: 97,
  },
  rect: {
    width: 365,
    height: 97,
    backgroundColor: 'rgba(255,255,255,1)',
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
  },
  group3: {
    width: 33,
    height: 32,
  },
  rect4: {
    width: 33,
    height: 6,
    backgroundColor: 'rgba(203,240,233,1)',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  rect3: {
    width: 33,
    height: 23,
    backgroundColor: 'rgba(203,240,233,1)',
    marginTop: 2,
  },
  group: {
    width: 15,
    height: 15,
    marginTop: 2,
    marginLeft: 9,
  },
  ellipseStack: {
    width: 15,
    height: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    color: 'black', // アイコンの色を設定
  },
  group2: {
    width: 19,
    height: 19,
    marginLeft: 175,
    marginTop: 6,
  },
  rect6: {
    top: 0,
    left: 1,
    width: 4,
    height: 19,
    position: 'absolute',
    backgroundColor: 'rgba(203,240,233,1)',
  },
  rect7: {
    width: 4,
    height: 19,
    backgroundColor: 'rgba(203,240,233,1)',
    transform: [
      {
        rotate: '-45.00deg',
      },
    ],
  },
  rect8: {
    width: 4,
    height: 19,
    backgroundColor: 'rgba(203,240,233,1)',
    transform: [
      {
        rotate: '-90.00deg',
      },
    ],
  },
  rect9: {
    width: 4,
    height: 19,
    backgroundColor: 'rgba(203,240,233,1)',
    transform: [
      {
        rotate: '-135.00deg',
      },
    ],
  },
  ellipse3: {
    top: 6,
    left: 0,
    width: 7,
    height: 7,
    position: 'absolute',
  },
  rect6Stack: {
    width: 7,
    height: 19,
    marginLeft: 6,
  },
  group3Row: {
    height: 32,
    flexDirection: 'row',
    flex: 1,
    marginRight: 75,
    marginLeft: 63,
    marginTop: 35,
  },
});

export default Index;

// import { View, Text } from 'react-native'
// import React from 'react'
// import { Header } from '../components/Header';
// import TopBar from '../components/TopBar';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../types/type';

// type Props = {
//     navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
// }

// export const ChildHistoryScreen = ({ navigation }: Props) => {
//     return (
//         <View className='bg-primary flex-1'>
//             <Header navigation={navigation} BackScreenName={"Home"} />
//             <View className='h-4/6'>

//             </View>
//             <TopBar />
//         </View>
//     )
// }
