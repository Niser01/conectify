import React, { useEffect,useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image,  KeyboardAvoidingView } from "react-native";
import { styles } from "../utils/styles";
import { GetAndPostEvents } from '../utils/api';


export const Interop = ({navigation,navigation: { goBack }, route}: {navigation: any, route: any}) => {
    const { userId, token } = route.params;
    const [user, setUser] = useState('');
    const [channelId, setChannel] = useState('');

    const handleInterop = async () => {
        
            const asyncWrapper = async () => {
                setUser('');
                setChannel('');
                    await GetAndPostEvents(user, userId, channelId, token)
                    .then((response) => {
                       console.log(response);
                    }).catch((error) =>
                        console.log(error)
                    );
                };
                
                asyncWrapper();
             
    };
    
        


    const handleNavigateToProfile = async () => {
        navigation.navigate('Profile', { userId: userId , token: token});
    };
    const handleNavigateToChannel = async () => {
        navigation.navigate('Channels', { userId: userId, token: token });
    };



    return (
        
        <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerSub}>                    
                <Image style={styles.profileHeaderPicture} source={require('../assets/conectify-logo.png')} />
               
            </View>
       
        </View>
        <Text style={styles.channelsTitle}>Eventos en "wininborowser"</Text>



        <View style={styles.eventsContainer}>
            

            <Text style={styles.profileTextRegularContainer}>
                Ingresa el nombre del usuario del cual deseas traer eventos a Connectify:                
            </Text>
            <KeyboardAvoidingView style={styles.inputeventsContainer}>
                <TextInput
                        style={styles.input}
                        value={user}
                        onChangeText={setUser}
                        placeholder="Type your message..."
                /> 
            </KeyboardAvoidingView>
            
            <Text style={styles.profileTextRegularContainer}>
                Ingresa el id del canal en el cual deseas mostrar los eventos a Connectify:                
            </Text>
            <KeyboardAvoidingView style={styles.inputeventsContainer}>
                <TextInput
                        style={styles.input}
                        value={channelId}
                        onChangeText={setChannel}
                        placeholder="Type your message..."
                /> 
            </KeyboardAvoidingView>

            <TouchableOpacity style={styles.profileTextRegularContainer} onPress={handleInterop}>
                    <Text style={styles.profiletextBotones}>Solicitar</Text>    
                </TouchableOpacity>
        </View>






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