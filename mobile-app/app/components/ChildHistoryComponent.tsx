import { View, Text, Image, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { ChatData } from '../types/type'
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const MemoChildHistoryComponent = (data: ChatData) => {
    return (
        <View style={styles.container}>
            <Image
                source={data.emoji === 'happy' ? require('../../app/assets/happy.png') :
                    data.emoji === 'sad' ? require('../../app/assets/sad.png') :
                        require('../../app/assets/normal.png')}
                style={styles.emoji}
            />
            <View style={styles.textContainer}>
                <Text
                    style={styles.question}
                    numberOfLines={1}
                >{data.question}
                </Text>
                <Text
                    style={styles.answer}
                    numberOfLines={2}
                >{data.answer}
                </Text>
                <View style={styles.divider} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.95, // 11/12 of the width
        height: height * 0.10, // 1/6 of the height
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: -10, // Adjust as needed for spacing between items
    },
    emoji: {
        width: 60, // Adjust as needed
        height: 60, // Adjust as needed
        marginRight: 10, // Adjust as needed for spacing
    },
    textContainer: {
        width: '80%', // 8/12 of the width
        // Add padding if needed
    },
    question: {
        fontSize: 16, // Adjust as needed
        fontWeight: 'bold',
        marginBottom: 4, // Adjust as needed for spacing
    },
    answer: {
        fontSize: 14, // Adjust as needed
        fontWeight: 'normal',
        marginBottom: 4, // Adjust as needed for spacing
    },
    divider: {
        borderBottomColor: 'gray', // Adjust color as needed
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 4, // Adjust as needed for spacing
    },
});

export const ChildHistoryComponent = memo(MemoChildHistoryComponent);
