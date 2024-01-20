import React, { memo } from 'react';
import { View, Text, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';

type Props = {
    navigation: NativeStackNavigationProp<
        RootStackParamList,
        keyof RootStackParamList
    > | null;
    currentScreen: "ChildChat" | "ChildHistory" | "null";
}

export const Header = ({ navigation, currentScreen }: Props) => {
    const navigateToSettingsScreen = () => {
        navigation && navigation.navigate('Settings');
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Discoveries</Text>
                <View style={styles.navigationLinks}>
                    <Pressable
                        style={currentScreen === "ChildChat" ? styles.activeRadioButton : styles.radioButton}
                        onPress={() => navigation && navigation.navigate('ChildChat', {
                            question: "",
                            response: "",
                            datetime: ""
                        })}
                    >
                        <Text style={styles.radioButtonText}>チャット</Text>
                    </Pressable>
                    <Pressable
                        style={currentScreen === "ChildHistory" ? styles.activeRadioButton : styles.radioButton}
                        onPress={() => navigation && navigation.navigate('ChildHistory')}
                    >
                        <Text style={styles.radioButtonText}>会話の記録</Text>
                    </Pressable>
                </View>
            </View>
            <TouchableOpacity onPress={navigateToSettingsScreen} style={styles.settingsButton}>
        <FontAwesome5 name="cog" size={30} color="#95E1D3" />
    </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '20%',
        width: '100%',
        backgroundColor: '#CBF0E9',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 10,
    },
    titleContainer: {
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 100,
    },
    navigationLinks: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    radioButton: {
        padding: 10,
        margin: 5,
        backgroundColor: '#95E1D3',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'black',
    },
    activeRadioButton: {
        padding: 10,
        margin: 5,
        backgroundColor: '#CBF0E9',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'black',
    },
    radioButtonText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
    settingsButton: {
        position: 'absolute',
        right: 30,
        top: 70,
    },
});
