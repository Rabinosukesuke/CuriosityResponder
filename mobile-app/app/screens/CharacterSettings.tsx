import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Header } from '../components/Header';

type Props = {
    navigation: any; // 任意のナビゲーション型を指定するか、'any'を使用する
};


export const CharacterSettings: React.FC<Props> = ({ navigation }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#CBF0E9',
            justifyContent: 'center',
            alignItems: 'center',
        },
        rectangle: {
            width: 110,
            height: 200,
            borderRadius: 10,
            backgroundColor: 'white',
            margin: 5,
            borderColor: 'lightgreen', // Add this line to set the border color to lightgreen
            borderWidth: 2, // Add this line to set the border width to 2
            shadowColor: '#06C755', // Add this line to set the shadow color to #06C755
            shadowOffset: {
                width: 0,
                height: 4, // Shift the rectangle 4px on the y-axis
            },
            shadowOpacity: 0.5, // Add this line to set the shadow opacity to 0.5
            shadowRadius: 4, // Change the shadow radius to 4
        },
        square: {
            width: 90,
            height: 80,
            backgroundColor: 'lightblue',
            borderRadius: 5,
            position: 'relative', // Add this line to enable positioning
            top: 5, // Add this line to move the square down by 5px
            alignSelf: 'center', // Add this line to center the square horizontally
        },
    });

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />

            <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 36 }}>キャラクター選択</Text>
            <View style={{ flexDirection: 'row', marginTop: 60 }}>

                <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
                    <Pressable onPress={() => { navigation.navigate("ChildChat") }} style={styles.rectangle}>
                        <View style={styles.square}>
                        <Image source={require('../assets/ameba.png')} style={styles.square} />
                    </View>
                    <Text style={{ textAlign: 'center', marginTop: 10 }}>あめちゃん</Text>
                    <View style={[styles.square, { backgroundColor: 'white', borderColor: 'black', borderWidth: 1 }]} >
                        <Text style={{ textAlign: 'center', marginTop: 5 }}>紹介文</Text>
                    </View>
                </Pressable>
                </Animated.View>
                
                <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
                <Pressable onPress={() => { navigation.navigate("ChildChat") }} style={styles.rectangle}>
                    <View style={styles.square} >
                        <Image source={require('../assets/bear.png')} style={styles.square} />
                    </View>
                    <Text style={{ textAlign: 'center', marginTop: 10 }}>くまちゃん</Text>
                    <View style={[styles.square, { backgroundColor: 'white', borderColor: 'black', borderWidth: 1 }]} >
                        <Text style={{ textAlign: 'center', marginTop: 5 }}>紹介文</Text>
                    </View>
                </Pressable>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
                <Pressable onPress={() => { navigation.navigate("ChildChat") }} style={styles.rectangle}>
                    <View style={styles.square} >
                        <Image source={require('../assets/crocodile.png')} style={styles.square} />
                    </View>
                    <Text style={{ textAlign: 'center', marginTop: 10 }}>わにくん</Text>
                    <View style={[styles.square, { backgroundColor: 'white', borderColor: 'black', borderWidth: 1 }]} >
                        <Text style={{ textAlign: 'center', marginTop: 5 }}>紹介文</Text>
                    </View>
                </Pressable>
                </Animated.View>
            </View>
            <View style={{ flexDirection: 'row' }}>
            <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
                <Pressable onPress={() => { navigation.navigate("ChildChat") }} style={styles.rectangle}>
                    <View style={styles.square} />
                    <Text style={{ textAlign: 'center', marginTop: 5 }}>名前</Text>
                    <View style={[styles.square, { backgroundColor: 'white', borderColor: 'black', borderWidth: 1 }]} >
                        <Text style={{ textAlign: 'center', marginTop: 5 }}>紹介文</Text>
                    </View>
                </Pressable>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
                <Pressable onPress={() => { navigation.navigate("ChildChat") }} style={styles.rectangle}>
                    <View style={styles.square} />
                    <Text style={{ textAlign: 'center', marginTop: 5 }}>名前</Text>
                    <View style={[styles.square, { backgroundColor: 'white', borderColor: 'black', borderWidth: 1 }]} >
                        <Text style={{ textAlign: 'center', marginTop: 5 }}>紹介文</Text>
                    </View>
                </Pressable>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
                <Pressable onPress={() => { navigation.navigate("ChildChat") }} style={styles.rectangle}>
                    <View style={styles.square} />
                    <Text style={{ textAlign: 'center', marginTop: 5 }}>名前</Text>
                    <View style={[styles.square, { backgroundColor: 'white', borderColor: 'black', borderWidth: 1 }]}>
                        <Text style={{ textAlign: 'center', marginTop: 5 }}>紹介文</Text>
                    </View>
                </Pressable>
                </Animated.View>
            </View>
        </View>
    );
};