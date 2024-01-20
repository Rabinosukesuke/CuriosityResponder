import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/type'; 

type Props = {
    navigation: NavigationProp<RootStackParamList>;
};

export const Splash: React.FC<Props> = ({ navigation }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('Intro01')} 
            activeOpacity={1.0} 
        >
            <Image source={require('../assets/owl.png')} style={styles.image} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CBF0E9',
    },
    image: {
        width: 160, 
        height: 160, 
        resizeMode: 'contain' 
    },
});
