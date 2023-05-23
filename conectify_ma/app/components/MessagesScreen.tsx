
import React from "react";
import { useEffect, useState } from "react";
import { View, Text, FlatList, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from "react-native";
import { Channel, Message, User, createMessage, getChannelById, getUserDisplayById, loadChannel, updateChannel } from "../utils/api";
import { styles } from "../utils/styles";



export const MessagesScreen = ({navigation : { goBack }, route}: {navigation: any, route: any}) => {

    const { userId, channelId, channel } = route.params;

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Map<string, Message>>(new Map());
    const [newMessages, setNewMessages] = useState<Message[]>([]);
    const [lastUpdate, setLastUpdate] = useState(new Date(0));
    const [disableSend, setDisableSend] = useState(false);
    const [users, setUsers] = useState<Map<string, User>>(new Map());
    const [currentChannel, setCurrentChannel] = useState<Channel>();

    const sendMessage = async () => {
        if (message.trim() === '') {
            return;
        }
        if (disableSend) {
            return;
        }
        setDisableSend(true);
        await createMessage(channelId, userId, message).then(() => {
            setMessage('');
            updateChannel(channelId, lastUpdate).then((response) => {
                if (response.length > 0) {
                    setNewMessages(response);
                };
            }).catch((error) => 
                console.log(error)
            );
        }).catch((error) => 
            console.log(error)
        );
        setDisableSend(false);  
        return;
    };

    // fetch initial messages after mounting component
    useEffect(() => {
        setCurrentChannel(channel);
        const asyncWrapper = async () => {     
            const usersMap = new Map();      
            const messagesMap = new Map();
            let lastUpdateAt = new Date(0); 
            usersMap.set(userId, true);
            await getChannelById(channelId).then((response) => {
                setCurrentChannel(response);
            }).catch((error) =>
                console.log(error)
            );
            await loadChannel(channelId).then((response) => {
                response.forEach((message: Message) => {
                    messagesMap.set(message._id, message);
                    if (new Date(message.updated_at) > lastUpdateAt) {
                        lastUpdateAt = new Date(message.updated_at);
                    }
                    usersMap.set(message.userId, true);
                });
            }).catch((error) =>
                console.log(error)
            );
            for (let userId of usersMap.keys()) {
                await getUserDisplayById(userId).then((response) => {
                    usersMap.set(userId, response);
                }).catch((error) =>
                    console.log(error)
                );
            }
            setUsers(usersMap);            
            setMessages(messagesMap);
            setLastUpdate(lastUpdateAt); 
        };
        asyncWrapper();        
        return () => {
            setMessages(new Map());
            setLastUpdate(new Date(0));
            setUsers(new Map());
        };
    }, []);

    // fetch new messages every 5 seconds
    useEffect(() => {
        let active = true;
        const interval = setInterval( () => {
            const asyncWrapper = async () => {
                await updateChannel(channelId, lastUpdate).then((response) => {
                    if (active && response.length > 0) {
                        setNewMessages(response);
                    };
                }).catch((error) => 
                    console.log(error)
                );
            };
            asyncWrapper();
        }, 5000);        
        return () => {
            active = false;
            setNewMessages([]);
            clearInterval(interval);
        };
    }, [lastUpdate]);

    // update messages state when new messages are fetched
    useEffect(() => {
        if (newMessages.length > 0) {
            let lastUpdateAt = new Date(0);
            const mergeUsers = (currentUsers: Map<string, User>, newMessages: Message[]) => {
                let usersMap = new Map(currentUsers);
                newMessages.forEach(async (message: Message) => {
                    await getUserDisplayById(message.userId).then((response) => {
                        usersMap.set(message.userId, response);
                    }).catch((error) =>
                        console.log(error)
                    );
                });
                return usersMap;
            };
            const mergeMessages = (currentMessages: Map<string, Message>, newMessages: Message[]) => {
                let messagesMap = new Map(currentMessages);
                newMessages.forEach((message: Message) => {
                    messagesMap.set(message._id, message);
                    if (new Date(message.updated_at) > lastUpdateAt) {
                        lastUpdateAt = new Date(message.updated_at);
                    }
                });
                return messagesMap;
            };
            setUsers(currentUsers => mergeUsers(currentUsers, newMessages));
            setMessages(currentMessages => mergeMessages(currentMessages, newMessages));
            setLastUpdate(lastUpdateAt);
            setNewMessages([]);       
        }
    }, [newMessages]);

    // fetch users display info
    useEffect(() => {
        let active = true;
        const interval = setInterval( () => {
            const asyncWrapper = async () => {
                const usersMap = new Map(users);
                for (let userId of users.keys()) {
                    await getUserDisplayById(userId).then((response) => {
                        usersMap.set(userId, response);
                    }).catch((error) => 
                        console.log(error)
                    );
                }
                setUsers(usersMap);
            };            
            asyncWrapper();
        }, 10000);
        return () => {
            active = false;
            clearInterval(interval);
        };
    }, [users]);
        

    const renderMessage = ({ item }: { item: Message }) => {
        let user = users.get(item.userId);
        if (user === undefined) {
            return null;
        }
        return (
            <View style={styles.messageContainer}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
                <View style={styles.messageBubble}>
                    <Text style={styles.messageHeader}> {user?.Names} {user?.LastNames}</Text>
                    <Text style={styles.messageSubHeader}> {(new Date(item.created_at)).toLocaleString("en-GB")}</Text>
                    <Text style={styles.messageText}>{item.content}</Text>
                    {item.edited ? <Text style={styles.messageText}>(Edited)</Text> : null}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerSub}>
                    <Text style={styles.userName}>{currentChannel?.name}</Text>
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                inverted
                data={[...messages.values()].reverse()}
                extraData={users}
                renderItem={renderMessage}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.messagesContainer}
            />
            <KeyboardAvoidingView style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type your message..."
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage} disabled={disableSend}>
                    <Text style={styles.sendButtonText}>{disableSend ? 'Sending...' : 'Send'}</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};
