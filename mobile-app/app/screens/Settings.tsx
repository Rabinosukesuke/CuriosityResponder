import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { AntDesign, Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { FloatingButton } from '../components/FloatingActionButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerParamList, RootStackParamList } from '../types/type';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

type FontAwesomeName = 'user' | 'file-lines' | 'children' | 'person-breastfeeding' | 'bell';

// 絵文字の変換を行う関数
const SettingsIconName = (iconName: string): FontAwesomeName => {
    const iconMap: Record<string, FontAwesomeName> = {
        'account': 'user',
        'history': 'file-lines',
        'safety': 'children',
        'feedback': 'person-breastfeeding',
        'notification': 'bell',
    };
    return iconMap[iconName] || 'meh-o';
};

type Props = {
    navigation: DrawerNavigationProp<DrawerParamList, "分析">;
}

export const Settings: React.FC<Props> = ({ navigation }) => {
    const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "Drawer">>();
    return (
        <View style={styles.container}>
            <Header navigation={null} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <Pressable
                    onPress={() => { rootNavigation.navigate("LineChart") }}
                    style={{ width: 90, height: 90, backgroundColor: 'white', left: 55 }}
                >
                    <AntDesign name="user" size={90} color="black" />
                </Pressable>
                <Pressable
                    onPress={() => { navigation.navigate("分析") }}
                    style={{ width: 90, height: 90, backgroundColor: 'white' }}
                >
                    <AntDesign name="user" size={90} color="black" />
                </Pressable>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }}>
                <View style={{ width: 90, height: 90, backgroundColor: 'white', left: 55 }}>
                    <MaterialCommunityIcons name="human-male-female-child" size={90} color="black" />
                </View>
                <View style={{ width: 90, height: 90, backgroundColor: 'white', right: 55 }}>
                    <MaterialIcons name="family-restroom" size={90} color="black" />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }}>
                <View style={{ width: 90, height: 90, backgroundColor: 'white', left: 55 }}>
                    <AntDesign name="bells" size={90} color="black" />
                </View>
                <View style={{ marginVertical: 65 }}></View>
            </View>
            <View style={styles.floatingButtonContainer}>
                <FloatingButton />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CBF0E9',
    },
    floatingButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});