import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/type'; 

type Props = {
    navigation: NavigationProp<RootStackParamList>;
};

export const Splash: React.FC<Props> = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Intro01');
        }, 5000); // 5秒後にIntro01に遷移
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/owl.png')} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CBF0E9', // 背景色を変更
    },
    image: {
        width: 160, 
        height: 160, 
        resizeMode: 'contain' 
    },
    title: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
    },
});