import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

// pages
import Dashboard from './pages/Dashboard'
import Conversations from './pages/Conversation'
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
                <Screen name="Dashboard" component={Dashboard}/>
                <Screen name="Conversations" component={Conversations}/>
                <Screen name="Info" component={Info}/>
            </Navigator>
        </NavigationContainer>
    )
}