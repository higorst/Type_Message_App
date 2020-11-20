import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Provider } from 'react-redux'

const { Navigator, Screen } = createStackNavigator()

import Store from './redux/Store'

// pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Conversation from './pages/Conversation'
import Contacts from './pages/Contacts'
import Info from './pages/Info'
import { Color } from './styles/Color';

export default function Routes() {
    return (
        <Provider store={Store}>
            <NavigationContainer>
                <Navigator screenOptions={{
                    headerShown: false,
                    cardStyle: {
                        backgroundColor: Color.backgroundHeader,
                    }
                }}>
                    <Screen name="Login" component={Login} />
                    <Screen name="Dashboard" component={Dashboard} />
                    <Screen name="Conversation" component={Conversation} />
                    <Screen name="Contacts" component={Contacts} />
                    <Screen name="Info" component={Info} />
                </Navigator>
            </NavigationContainer>
        </Provider>
    )
}