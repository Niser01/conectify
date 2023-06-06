import React, { useEffect,useState } from "react";
import { View,  TouchableOpacity, Text, Image,  } from "react-native";
import { styles } from "../utils/styles";
import { getUserById,  User } from '../utils/api';


export const ProfileScreen = ({navigation, route}: {navigation: any, route: any}) => {
    const { userId , token} = route.params;
    const [currentUser, setCurrentUser] = useState<User>();
    var status;
    var statusimg;

    useEffect(()=>{
    const asyncWrapper = async () => {
            await getUserById(userId.toString(),token).then((response) => {
                setCurrentUser(response);
            }).catch((error) =>
                console.log(error)
            );
        };
        
        asyncWrapper();
    }, []);
    
    const handleNavigateToProfile = async () => {
        navigation.navigate('Profile', { userId: userId, token: token });
    };
    const handleNavigateToChannel = async () => {
        navigation.navigate('Channels', { userId: userId, token: token });
    };
    const handleNavigateToEditProfile = async () => {
        navigation.navigate('ProfileEdit', { userId: userId , token: token});
    };

    if(currentUser?.Status == 1){
        status = "Disponible";
        statusimg = require('../assets/disponible.png')
    }else if(currentUser?.Status == 2){
        status = "Ocupado";
        statusimg = require('../assets/ocupado.png')
    }else if(currentUser?.Status == 3){
        status = "Ausente";
        statusimg = require('../assets/noDisponible.png')
    }


    return (
        
        <View style={styles.container}>
        <View style={styles.header}>
           
            <View style={styles.headerSub}>                    
                <Image style={styles.profileHeaderPicture} source={require('../assets/conectify-logo.png')} />
               
            </View>
       
        </View>
        <Text style={styles.channelsTitle}>Perfil</Text>

        <View style={styles.profileContainer}>
            <View style={styles.profilePhotoContainer}>
                {/*<Image style={styles.profilePhoto} source={{ uri: 'https://ca.slack-edge.com/T0266FRGM-UQ46QH94Z-gc24d346e359-512', }} />*/}
                <View style={[styles.profilePhoto, {backgroundColor: currentUser?.PhotoId}]}>
                    <Text style={styles.profilePhotoCharacters}>{currentUser?.Names?.charAt(0)}{currentUser?.LastNames?.charAt(0)}</Text>
                </View>
            </View>
        </View>

        <View style={styles.profileContainer}>
            <Text style={styles.profileTextTitleContainer}>
                {currentUser?.Names} {currentUser?.LastNames}
            </Text>

            <Text style={styles.profileTextRegularContainer}>
                Información de contacto:                
            </Text>
      
            <View style={styles.profileTextRegularContainer}>                    
                <Image style={styles.profileInfoIcon} source={require('../assets/sobre.png')} />               
                <Text style={styles.profileTextRegularContainer}>{currentUser?.EMail}</Text>
            </View>     


            <View style={styles.profileTextRegularContainer}>                    
                <Image style={styles.profileInfoIcon} source={require('../assets/llamada.png')} />               
                <Text style={styles.profileTextRegularContainer}>{currentUser?.PhoneNumber}</Text>
            </View>    

            <View style={styles.profileTextRegularContainer}>                    
                <Image style={styles.profileInfoIcon} source={statusimg} />               
                <Text style={styles.profileTextRegularContainer}>{status}</Text>
            </View>  


            <View style={styles.profileBotones}>                    
                <TouchableOpacity style={styles.profileTextRegularContainer} onPress={handleNavigateToEditProfile}>
                    <Text style={styles.profiletextBotones}>Editar estado</Text>    
                </TouchableOpacity> 
                {/*
                <TouchableOpacity style={styles.profileTextRegularContainer} onPress={handleNavigateToChannel}>
                    <Text style={styles.profileTextRegularContainer}>Editar perfil</Text>    
                </TouchableOpacity> 
                */}
            </View> 

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