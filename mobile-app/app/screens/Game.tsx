import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { questions } from '../Gamedata';
import { useSelector } from 'react-redux';
import { selectAuth } from "../slices/authSlices";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList, DrawerParamList } from '../types/type';
import { Header } from '../components/Header';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';


type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Drawer">;
}

export const Game = ({ navigation }: Props) => {
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [isFirstAttempt, setIsFirstAttempt] = useState(true);
    const [currentHintIndex, setCurrentHintIndex] = useState(0);
    const [currentHints, setCurrentHints] = useState<string[]>([]);
    const [hintOrder, setHintOrder] = useState([0, 1, 2]);
    const [remainingTime, setRemainingTime] = useState(20);
    const [timerPaused, setTimerPaused] = useState(false);

    const fadeInText = useSharedValue(0);
    const translateY = useSharedValue(0);

    useEffect(() => {
        const questionInterval = setInterval(() => {
            if (!timerPaused) {
                setCurrentQuestion(getRandomQuestion());
                setCurrentHintIndex(0);
                setHintOrder([0, 1, 2]);
                setRemainingTime(20);
            }
        }, 20000);

        return () => clearInterval(questionInterval);
    }, [timerPaused]);

    useEffect(() => {
        const hintInterval = setInterval(() => {
            if (!timerPaused && hintOrder.length > 0) {
                const nextHintIndex: number = hintOrder.shift()!;
                setCurrentHintIndex(nextHintIndex);
                setCurrentHints(currentQuestion.questions.slice(0, nextHintIndex + 1));
            }
        }, 5000);

        return () => clearInterval(hintInterval);
    }, [currentHintIndex, hintOrder, timerPaused]);

    useEffect(() => {
        setCurrentHints(currentQuestion.questions.slice(0, currentHintIndex + 1));
    }, [currentHintIndex, currentQuestion, timerPaused]);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            if (!timerPaused) {
                setRemainingTime((prevTime) => Math.max(prevTime - 1, 0));
            }
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [timerPaused]);

    useEffect(() => {
        if (remainingTime === 0) {
            handleTimeUp();
        }
    }, [remainingTime, timerPaused]);

    const getRandomQuestion = () => {
        const randomIndex = Math.floor(Math.random() * questions.length);
        return questions[randomIndex];
    };

    const handleCheckAnswer = () => {
        if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
            setScore(score + 1);
            showSuccessAnimation();
            moveToNextQuestion();
        } else {
            if (isFirstAttempt) {
                setIsFirstAttempt(false);
            } else {
                Alert.alert('不正解', `正解は: ${currentQuestion.answer}`);
            }
        }

        setUserAnswer('');
    };

    const showSuccessAnimation = () => {
        fadeInText.value = withSpring(10, { duration: 2000 }, () => {
            fadeInText.value = 0;
        });

        translateY.value = withSpring(-100, { duration: 2000 }, () => {
            translateY.value = 0;
        });
    };

    const moveToNextQuestion = () => {
        setCurrentQuestion(getRandomQuestion());
        setCurrentHintIndex(0);
        setHintOrder([0, 1, 2]);
        setRemainingTime(20);
    };

    const handleTimeUp = async () => {
        setTimerPaused(true);

        // Alertを非同期で表示
        await new Promise<void>((resolve) => {
            Alert.alert(
                '時間切れ',
                '時間切れです。新しい問題を取得します。',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            resolve();
                            moveToNextQuestion();
                            setTimerPaused(false);
                        },
                    },
                ],
                { cancelable: false }
            );
        });

        // OKボタンが押された後にタイマーを再開
        setTimerPaused(false);
    };

    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            opacity: fadeInText.value,
            transform: [{ translateY: translateY.value }],
        };
    });

    return (
        <View style={styles.container}>
            <Header navigation={null} />
            <View style={styles.content}>
                <Text style={styles.remainingTime}>残り時間: {remainingTime}秒</Text>
                {currentHints.map((hint, index) => (
                    <Text key={index} style={styles.questionText}>{hint}</Text>
                ))}
                <View style={styles.bottomContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="答えを入力してください"
                        onChangeText={setUserAnswer}
                        value={userAnswer}
                    />
                    <TouchableOpacity
                        style={styles.customButton}
                        onPress={handleCheckAnswer}
                    >
                        <Text style={styles.buttonText}>答えを確認</Text>
                    </TouchableOpacity>
                    <Text style={styles.scoreText}>Score: {score}</Text>
                    {/* <TouchableOpacity
                        style={styles.customButton}
                        onPress={() => navigation.navigate("Home")}
                    >
                        <Text style={styles.buttonText}>Homeに戻る</Text>
                    </TouchableOpacity> */}
                    <Animated.Text style={[styles.successText, animatedTextStyle]}>
                        正解！
                    </Animated.Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CBF0E9',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    remainingTime: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    questionText: {
        width: 320,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        backgroundColor: 'white',
    },
    input: {
        width: 400,
        height: 52,
        backgroundColor: '#CBF0E9',
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'white',
        paddingLeft: 10,
        marginTop: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        textAlign: 'center',
        opacity: 0.8,
        fontWeight: 'bold',
        textDecorationStyle: 'solid',
        textDecorationColor: 'black',
    },
    customButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scoreText: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
    successText: {
        color: 'yellow',
        fontSize: 40,
        fontWeight: 'bold',
    },
    bottomContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
});
