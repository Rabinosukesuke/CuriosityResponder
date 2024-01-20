import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerParamList, RootStackParamList } from '../types/type';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type Props = {
    navigation: NativeStackNavigationProp<
        RootStackParamList,
        keyof RootStackParamList
    > | null;
}

export const Header = ({ navigation }: Props) => {
    const drawNavigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Discoveries</Text>
            </View>
            <TouchableOpacity onPress={() => drawNavigation.navigate("Settings")} style={styles.settingsButton}>
                <FontAwesome5 name="cog" size={30} color="#95E1D3" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '15%',
        width: '100%',
        backgroundColor: '#CBF0E9',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    titleContainer: {
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    settingsButton: {
        position: 'absolute',
        right: 30,
        top: 70,
    },
});
