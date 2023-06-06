import React, { useEffect,useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image, ImageBackground } from "react-native";
import { styles } from "../utils/styles";
import {  User , Edit_statusByid} from '../utils/api';


export const ProfileEdit = ({navigation,navigation: { goBack }, route}: {navigation: any, route: any}) => {
    const { userId, token } = route.params;
    
    

    const handleNewStatus = async (status: number) => {
        
            const asyncWrapper = async () => {
                    await Edit_statusByid(userId, status, token)
                    .then((response) => {
                       console.log(response)
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
        <Text style={styles.channelsTitle}>Edición de perfil</Text>



        <View style={styles.profileContainer}>
            

            <Text style={styles.profileTextRegularContainer}>
                Selecciona una de las opciones de estado:                
            </Text>
       
            <TouchableOpacity style={styles.profileTextRegularContainerEdit} onPress={() => handleNewStatus(1)}>
                <Image style={styles.profileInfoIcon} source={require('../assets/disponible.png')} />               
                <Text style={styles.profiletextBotonesEdit}>Disponible</Text> 

            </TouchableOpacity> 

            <TouchableOpacity style={styles.profileTextRegularContainerEdit} onPress={() => handleNewStatus(2)}>
                 <Image style={styles.profileInfoIcon} source={require('../assets/ocupado.png')} />               
                <Text style={styles.profiletextBotonesEdit}>Ocupado</Text> 
            </TouchableOpacity> 
            
            <TouchableOpacity style={styles.profileTextRegularContainerEdit} onPress={() => handleNewStatus(3)}>
            <Image style={styles.profileInfoIcon} source={require('../assets/noDisponible.png')} />               
                <Text style={styles.profiletextBotonesEdit}>No Disponible</Text> 
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