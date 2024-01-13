
import { View, Text,StyleSheet, Image,} from 'react-native'
import React from 'react'
import { StorageData } from '../types/type'
import { MaterialCommunityIcons } from '@expo/vector-icons';


export const ChildHistoryComponent = (data: StorageData) => {
    return (
        <View className='w-11/12 h-1/6 flex-row items-center'>
            {data.emoji === 'happy' ? (
                <Image source={require('../../app/assets/happy.png')} style={{ width: 80, height: 80 }} />
            ) : data.emoji === 'sad' ? (
                <Image source={require('../../app/assets/sad.png')} style={{ width: 80, height: 80 }} />
            ) : (
                <Image source={require('../../app/assets/normal.png')} style={{ width: 90, height: 90 }} />
            )}
            <View>
                <Text className='text-base font-bold'>{data.question}</Text>
                <Text className='text-sm font-normal'>{data.answer}</Text>
                <View style={styles.line} />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    Text: {
        fontFamily: 'Yellowtail_400Regular',
        fontSize: 30,
        color: '#CBF0E9',
    },
    
    line: {
        borderBottomColor: '#808080',
        borderBottomWidth: 1,
        width: '200%',
        marginTop: 8, // 線とテキストの間隔
    }

})