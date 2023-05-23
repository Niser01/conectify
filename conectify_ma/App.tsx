/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { MessagesScreen } from './app/components/MessagesScreen';
import { ChannelsScreen } from './app/components/ChannelsScreen';
import { LoginScreen } from './app/components/LoginScreen';
import {ProfileScreen} from './app/components/ProfileScreen';
import {ProfileEdit}    from './app/components/ProfileEdit';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Channels"
                    component={ChannelsScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Messages"
                    component={MessagesScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProfileEdit"
                    component={ProfileEdit}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
