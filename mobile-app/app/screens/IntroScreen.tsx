import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, Button, TouchableOpacity, StyleSheet, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

export const IntroScreen = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const x = event.nativeEvent.contentOffset.x;
        const index = Math.round(x / width);
        setPageIndex(index);
    };

    const navigateToPage = (index: number) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: width * index, animated: true });
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
                pagingEnabled={true}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                ref={scrollViewRef}
                style={styles.scrollContainer}
            >
                <View style={[styles.page, { backgroundColor: '#CBF0E9' }]}>
                    <Text style={styles.text}>ようこそDiscoverEaseへ !</Text>
                </View>
                <View style={[styles.page, { backgroundColor: '#CBF0E9' }]}>
                    <Text style={styles.text}>チャット</Text>
                </View>
                <View style={[styles.page, { backgroundColor: '#CBF0E9' }]}>
                    <Text style={styles.text}>履歴</Text>
                </View>
                <View style={[styles.page, { backgroundColor: '#CBF0E9' }]}>
                    <Text style={styles.text}>履歴(保護者も閲覧可能)</Text>
                </View>
                <View style={[styles.page, { backgroundColor: '#CBF0E9' }]}>
                    <Text style={styles.text}>ミニゲーム</Text>
                </View>
                <View style={[styles.page, { backgroundColor: '#CBF0E9' }]}>
                    <Text style={styles.text}>豊富なキャラクター設定</Text>
                </View>
                <View style={[styles.page, { backgroundColor: '#CBF0E9' }]}>
                    {pageIndex === 6 && (
                        <Button
                            title="Homeに行く"
                            onPress={() => navigation.navigate('Home')}                        />
                    )}
                </View>
                </ScrollView>
            <View style={styles.indicatorContainer}>
                {[...Array(7)].map((_, i) => ( 
                    <TouchableOpacity key={i} onPress={() => navigateToPage(i)}>
                        <View style={[styles.dot, pageIndex === i && styles.activeDot]} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CBF0E9',
    },
    scrollContainer: {
        flex: 1,
    },
    page: {
        width: width, // 画面幅に合わせる
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CBF0E9',
    },
    text: {
        fontSize: 20,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: '30%',
        left: 0,
        right: 0,
    },
    dot: {
        height: 10,
        width: 10,
        backgroundColor: '#bbb',
        borderRadius: 5,
        margin: 5,
    },
    activeDot: {
        backgroundColor: '#000',
    },
});