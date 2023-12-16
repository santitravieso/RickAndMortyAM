import React from 'react';
import { Image } from 'react-native';
import HomePage from './src/components/HomePage.js';
import FavoritePage from  './src/components/FavoritePage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './src/store/Index';


const Tab = createBottomTabNavigator();

export default function App(){
    return(
        <Provider store={store}>
            <NavigationContainer >
                <Tab.Navigator 
                        
                    initialRouteName = 'home'
                    screenOptions = {({ route }) => ({
                        tabBarActiveTintColor: '#7fff00',
                        tabBarInactiveTintColor: 'black',
                        tabBarActiveBackgroundColor: '#7fff00',
                        tabBarInactiveBackgroundColor: 'black',
                        tabBarIcon: () => {
                            if (route.name === 'home') {
                                return( 
                                    <Image style = {{ width: 50, height: 50  }} source = {require('./assets/portal.png')} />
                    )}

                            else if (route.name === 'favorites') {
                                return (
                                    <Image style = {{ width: 50, height: 50  }} source = {require('./assets/likeportal.png')} />
                    )}
                        },
                                    
                    })} 
                >
                    <Tab.Screen name = 'home' component = {HomePage} options = {{ headerShown: false }} />
                    <Tab.Screen  name = 'favorites' component = {FavoritePage} options = {{ headerShown: false }} />
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    );
    


  
  
};

