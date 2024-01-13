import React from 'react';
import { View ,StyleSheet} from 'react-native';
import { AntDesign ,Entypo ,MaterialIcons ,MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from '../components/Header';

// FontAwesomeにおける有効なアイコン名の型
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
    navigation: any; // 任意のナビゲーション型を指定するか、'any'を使用する
};

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header navigation={navigation} BackScreenName={'ChildChatScreen'} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <View style={{ width: 90, height: 90, backgroundColor: 'white', left: 55 }}>
                    <AntDesign name="user" size={90} color="black" />
                </View>
                <View style={{ width: 90, height: 90, backgroundColor: 'white', right: 55 }}>
                    <Entypo name="text-document" size={90} color="black" />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }}>
                <View style={{ width: 90, height: 90, backgroundColor: 'white' ,left:55}}>
                    <MaterialCommunityIcons name="human-male-female-child" size={90} color="black" />
                </View>
                <View style={{ width: 90, height: 90, backgroundColor: 'white' ,right:55}}>
                    <MaterialIcons name="family-restroom" size={90} color="black" />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }}>
                <View style={{ width: 90, height: 90, backgroundColor: 'white' ,left:55}}>
                    <AntDesign name="bells" size={90} color="black" />
                </View>
                <View style={{ marginVertical: 65 }}></View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#CBF0E9',
    },
});