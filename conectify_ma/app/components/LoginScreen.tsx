import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image, ImageBackground } from "react-native";
import { styles } from "../utils/styles";
import { login } from "../utils/api";


export const LoginScreen = ({navigation}: {navigation:any}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const image = { uri: '../assets/LoginBGw.png' };
   
  
    const handleLogin = async () => {
        if (email.trim() === '') {
            return;
        }
        if (password.trim() === '') {
            return;
        }
        await login(email.trim(), password.trim()).then((response) => {
            const user_id = parseInt(response.id);
            navigation.navigate('Channels', { userId: user_id });
        }).catch((error) => 
            console.log(error)
        );



    };
  
    return (
        
            <View style={styles.loginContainer}>
                <ImageBackground source={image} style={styles.image}>

                    <Image
                        style={styles.logo}
                        source={require('../assets/conectify-logo.png')}
                    />
                    <TextInput
                        style={styles.loginInput}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.loginInput}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>

    );
};