import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, TextInput, View, Dimensions, TouchableOpacity, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { Header } from '../components/Header';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FloatingButton } from '../components/FloatingActionButton';
import { FontAwesome, MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { ChatData, RootStackParamList } from '../types/type';
import { useBackendAPI } from '../hooks/useBackendAPI';
import { useOpenAIAPI } from '../hooks/useOpenAIAPI';
import { useSelector } from 'react-redux';
import { selectAuth } from '../slices/authSlices';
import { AntDesign } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import { ChildHistoryComponent } from "../components/ChildHistoryComponent";

const screenWidth = Dimensions.get('window').width;

type ChildCombinedProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "ChildCombined">;
    route: RouteProp<RootStackParamList, 'ChildCombined'>; 
};

export const ChildCombined = ({ navigation, route }: ChildCombinedProps) => {
    type FontAwesomeName = 'smile-o' | 'meh-o' | 'frown-o';
    type IconType = 'happy' | 'normal' | 'sad';
    const convertEmojiName = (iconName: IconType): FontAwesomeName => {
        const iconMap: Record<IconType, FontAwesomeName> = {
            'happy': 'smile-o',
            'normal': 'meh-o',
            'sad': 'frown-o',
        };
        return iconMap[iconName] || 'meh-o';
    };
    const user = useSelector(selectAuth);
    const [emoji, setEmoji] = useState<FontAwesomeName>('meh-o');
    const [question, setQuestion] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [datetime, setDatetime] = useState<Date | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');
    const [storageData, setStorageData] = useState<ChatData[]>([]);
    const [isToggled, setIsToggled] = useState<boolean>(false);

    const { storeChatHistoryToBackend, fetchChatHistoryFromBackend } = useBackendAPI();
    const { sendToGPT } = useOpenAIAPI();

    useEffect(() => {
        if (route.params?.question) {
            setQuestion(route.params.question);
        }
        if (route.params?.response) {
            setResponse(route.params.response);
        }
        if (route.params?.datetime) {
            setDatetime(new Date(route.params.datetime));
        }
        const fetchData = async () => {
            if (user == null) {
                console.log("user is null");
                navigation.navigate("Home");
            } else {
                const data = await fetchChatHistoryFromBackend(user.uid);
                setStorageData(data);
            }
        };
        fetchData();
    }, [route.params?.question, route.params?.response, route.params?.datetime]);


    const updateEmoji = (selectedEmoji: IconType) => {
        if (user == null) {
            navigation.navigate("Home");
        } else if (question == '' || response == '' || datetime == null) {

        } else {
            const data: ChatData = {
                question: question,
                answer: response,
                datetime: datetime,
                emoji: selectedEmoji
            };
            storeChatHistoryToBackend(user.uid, data);
        }
        setEmoji(convertEmojiName(selectedEmoji));
    };
    const trimText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const SortAndFilterChatData = storageData
        .filter(item => item.question.includes(searchValue) || item.answer.includes(searchValue))
        .sort((a, b) => {
            if (isToggled) {
                return new Date(a.datetime) > new Date(b.datetime) ? 1 : -1;
            } else {
                return new Date(a.datetime) < new Date(b.datetime) ? 1 : -1;
            }
        });
    const scrollViewRef = useRef<ScrollView>(null);
    const [activeTab, setActiveTab] = useState(0);

    const onScroll = (event: any) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const selectedTab = Math.round(scrollPosition / screenWidth);
        setActiveTab(selectedTab);
    };

    const handleTabPress = (tabIndex: number) => {
        setActiveTab(tabIndex);
        scrollViewRef.current?.scrollTo({ x: tabIndex * screenWidth, animated: true });
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.tab} onPress={() => handleTabPress(0)}>
                    <Text style={activeTab === 0 ? styles.activeTabText : styles.tabText}>チャット</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => handleTabPress(1)}>
                    <Text style={activeTab === 1 ? styles.activeTabText : styles.tabText}>履歴</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                pagingEnabled
                onScroll={onScroll}
                scrollEventThrottle={16}
                ref={scrollViewRef}
            >
                <View style={{ width: screenWidth }}>
                    {question != '' || response != '' || datetime != null ?
                        (
                            <FontAwesome name={emoji} size={24} style={styles.emojiIcon} />
                        ) : (null)
                    }

                    <View style={styles.inputQuestionContainer}>
                        <TextInput
                            style={styles.inputQuestion}
                            placeholder="ここに質問を入力してね！"
                            editable={false}
                            value={question}
                        />
                    </View>
                    <View style={styles.inputAnswerContainer}>
                        <TextInput
                            style={styles.inputAnswer}
                            placeholder="回答はここに出るよ〜"
                            editable={false}
                            value={response}
                            multiline
                        />
                    </View>
                    <View style={styles.iconContainer}>
                        {question != '' || response != '' || datetime != null ?
                            (
                                <View className='flex-row '>
                                    <TouchableOpacity
                                        className='relative mr-60'
                                        onPress={async () => {
                                            const regenerate_res = await sendToGPT(question);
                                            setResponse(regenerate_res);
                                            if (user == null || datetime == null) {
                                                navigation.navigate("Home");
                                            } else {
                                                storeChatHistoryToBackend(user.uid, {
                                                    question: question,
                                                    answer: regenerate_res,
                                                    datetime: datetime,
                                                    emoji: "normal"
                                                });
                                            }
                                        }}
                                    >
                                        <AntDesign name="retweet" size={24} color="black" />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => updateEmoji('happy')}>
                                        <MaterialCommunityIcons name="emoticon-happy" size={24} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => updateEmoji('normal')}>
                                        <MaterialCommunityIcons name="emoticon-neutral" size={24} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => updateEmoji('sad')}>
                                        <MaterialCommunityIcons name="emoticon-sad" size={24} />
                                    </TouchableOpacity>
                                </View>
                            ) : (null)
                        }
                    </View>
                </View>
                <View style={{ width: screenWidth }}>
                    <Input
                        placeholder="検索"
                        placeholderTextColor={"black"}
                        value={searchValue}
                        onChangeText={setSearchValue}
                        containerStyle={{
                            width: '70%',
                            height: "5%",
                            marginTop: 25,
                            justifyContent: 'center',
                            marginLeft: 60,
                        }}
                        inputContainerStyle={{
                            height: "100%",
                            backgroundColor: 'white',
                            borderRadius: 15,
                            borderColor: 'black',
                            borderWidth: 1,
                        }}
                        inputStyle={{ paddingLeft: 5 }}
                        leftIcon={<FontAwesome name="search" size={20} color="black" />}
                        leftIconContainerStyle={{ marginLeft: 10 }}
                    />
                    <View style={styles.scrollView}>
                        <ScrollView >
                            {SortAndFilterChatData.map((item: ChatData) => (
                                <ChildHistoryComponent
                                    key={item.datetime.toString()}
                                    datetime={item.datetime}
                                    question={trimText(item.question, 10)}
                                    answer={trimText(item.answer, 28)}
                                    emoji={item.emoji}
                                />
                            ))}
                        </ScrollView>

                    </View>

                    <Pressable style={styles.pressableIcon} onPress={() => setIsToggled(!isToggled)}>
                        <FontAwesome5 name={isToggled ? "sort-amount-up-alt" : "sort-amount-down"} size={24} color="black" />
                    </Pressable>


                </View>
            </ScrollView>

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
    emojiIcon: {
        position: 'absolute',
        left: 34,
        top: 180,
        zIndex: 2,
        marginRight: 16,
    },
    inputQuestionContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginTop: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
    },
    inputQuestion: {
        minHeight: 50,
        maxHeight: 100,
        fontSize: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomWidth: 0,
    },
    inputAnswerContainer: {
        flex: 2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginTop: 5,
        marginBottom: 5,
        padding: 16,
    },
    inputAnswer: {
        width: '100%',
        fontSize: 16,
        borderRadius: 0,
        paddingVertical: 16,
        paddingHorizontal: 16,
        minHeight: 100,
        backgroundColor: 'white',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopWidth: 0,
        paddingVertical: 16,
        marginHorizontal: 16,
        marginBottom: 50,
        height: 80,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#CBF0E9'
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    tabText: {
        color: 'black',
    },

    inactiveTabText: {
        color: 'gray',
    },
    activeTabText: {
        color: 'black',
    },
    activeTabIndicator: {
        height: 3,
        backgroundColor: 'black',
        width: screenWidth / 2,
        position: 'absolute',
        bottom: 0,
    },
    floatingButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    inputContainer: {
        width: '70%',
        marginTop: 25,
        alignSelf: 'center',
    },
    inputInnerContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 1,
    },
    inputStyle: {
        paddingLeft: 5,
    },
    leftIconContainer: {
        marginLeft: 10,
    },
    scrollView: {
        flex: 1,
    },
    pressableIcon: {
        position: 'absolute',
        top: 20,
        right: 15,
    },

});