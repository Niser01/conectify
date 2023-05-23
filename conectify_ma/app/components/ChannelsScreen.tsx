import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Channel, User, addUserToChannel, getUserDisplayById, listChannels, removeUserFromChannel } from '../utils/api';
import { styles } from "../utils/styles";


export const ChannelsScreen = ({navigation, navigation: { goBack }, route}: {navigation: any, route: any}) => {
    const { userId } = route.params;
    const [channels, setChannels] = useState<Channel[]>([]);
    const [joining, setJoining] = useState('');
    const [leaving, setLeaving] = useState('');
    const [currentUser, setCurrentUser] = useState<User>();


    // fetch channels from api and user info
    useEffect(() => {
        const asyncWrapper = async () => {
            await getUserDisplayById(userId.toString()).then((response) => {
                setCurrentUser(response);
            }).catch((error) =>
                console.log(error)
            );
            await listChannels().then((response) => {
                setChannels(response);          
            }).catch((error) =>
                console.log(error)
            );
        };
        asyncWrapper();
    }, []);

    // fetch channels from api and update user info every 10 seconds
    useEffect(() => {
        let active = true;
        const interval = setInterval( () => {
            const asyncWrapper = async () => {
                await getUserDisplayById(userId.toString()).then((response) => {
                    if (active) {
                        setCurrentUser(response);
                    }
                }).catch((error) =>
                    console.log(error)
                );
                await listChannels().then((response) => {
                    if (active) {
                        setChannels(response);
                    }                    
                }).catch((error) =>
                    console.log(error)
                );
            };
            asyncWrapper();
        }, 10000);        
        return () => {
            active = false;
            setChannels([]);
            clearInterval(interval);
        };
    }, []);

    const handleLeaveChannel = async (channel: Channel) => {
        setLeaving(channel.id);
        await removeUserFromChannel(channel.id, userId).catch((error) =>
            console.log(error)
        );
        const index = channels.find(({ id }) => id === channel.id)?.members?.indexOf(userId);
        if (index !== undefined) {
            channels.find(({ id }) => id === channel.id)?.members?.splice(index, 1);
        }
        setLeaving('');
    };

    // Navigate to the MessagesScreen and pass the channelId as a prop
    const handleNavigateToMessages = async (channel: Channel) => {
        if (channel.members?.includes(userId)) {
            navigation.navigate('Messages', { channelId: channel.id, userId: userId.toString(), channel: channel });
        } else {
            setJoining(channel.id);
            await addUserToChannel(channel.id, userId).then(() => {
                channels.find(({ id }) => id === channel.id)?.members?.push(userId);
                setChannels([...channels]);
                navigation.navigate('Messages', { channelId: channel.id, userId: userId.toString(), channel: channel });
            }
            ).catch((error) =>
                console.log(error)
            );
        }
        setJoining('');
    };

    const handleNavigateToProfile = async () => {
        navigation.navigate('Profile', { userId: userId });
    };
    const handleNavigateToChannel = async () => {
        navigation.navigate('Channels', { userId: userId });
    };


    const renderChannelItem = ({ item }: {item: Channel}) => (
        <View style={styles.channelItem}>
            <TouchableOpacity 
                style={styles.channelInfoContainer}
                onPress={() => handleNavigateToMessages(item)}
            >
                <Text style={styles.channelName}>{item.name}</Text>  
                <Text style={styles.channelDescription}>{item.description}</Text>
            </TouchableOpacity>
            
            
            {/*
            <View style={styles.channelActions}>
                {
                    item.id === joining ? (
                        <Text style={styles.buttonText}>Joining</Text>
                    ) : (
                        item.id === leaving ? (
                            <Text style={styles.buttonText}>Leaving</Text>
                        ) : (
                            item.members?.includes(userId) ? 
                            <TouchableOpacity
                                style={styles.leaveButton}
                                onPress={() => handleLeaveChannel(item)}
                            >
                                <Text style={styles.buttonText}>Leave</Text>
                            </TouchableOpacity> :
                            null
                        )
                    )
                }
            </View>
            */}
            
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerSub}  onPress={handleNavigateToProfile}>                    
                    <Image style={styles.userPicture} source={{ uri: 'https://ca.slack-edge.com/T0266FRGM-UQ46QH94Z-gc24d346e359-512', }} />
                    <Text style={styles.userName}>{currentUser?.Names} {currentUser?.LastNames}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.channelsTitle}>Canales</Text>
            <FlatList
            data={channels}
            renderItem={renderChannelItem}
            keyExtractor={(item) => item.id}

            />

            <View style={styles.footer}>
                <View style={styles.footerSub}>    
                {/*
                    <TouchableOpacity style={styles.footerSubImgText} onPress={()=> handleNavigateToChannels}>
                        <Image style={styles.footerImg} source={require('../assets/hogar.png')} />
                        <Text style={styles.footerText}>inicio</Text>
                    </TouchableOpacity>        
                    <TouchableOpacity style={styles.footerSubImgText}>
                        <Image style={styles.footerImg} source={require('../assets/charla.png')} />
                        <Text style={styles.footerText}>mensajes</Text>
                    </TouchableOpacity> 
                */}

                    <TouchableOpacity style={styles.footerSubImgText} onPress={handleNavigateToChannel}>
                        <Image style={styles.footerImg} source={require('../assets/usuarios.png')} />
                        <Text style={styles.footerText}>canales</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.footerSubImgText} onPress={handleNavigateToProfile}>
                        <Image style={styles.footerImg} source={require('../assets/feliz.png')} />
                        <Text style={styles.footerText}>tú</Text>
                    </TouchableOpacity>         
                </View>

            </View>


        </View>
    );
};