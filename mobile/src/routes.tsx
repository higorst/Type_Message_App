import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

// pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Conversation from './pages/Conversation'
import Info from './pages/Info'

export default function Routes() {
    return(
        <NavigationContainer>
            <Navigator screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#ffffff'
                }
            }}>
                <Screen name="Login" component={Login}/>
                <Screen name="Dashboard" component={Dashboard}/>
                <Screen name="Conversation" component={Conversation}/>
                <Screen name="Info" component={Info}/>
            </Navigator>
        </NavigationContainer>
    )
}