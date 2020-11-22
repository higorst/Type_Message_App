import React from 'react'
import { StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Provider } from 'react-redux'

import Store from './redux/Store'

// pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Conversation from './pages/Conversation'
import Contacts from './pages/Contacts'
import { Color } from './styles/Color';

const { Navigator, Screen } = createStackNavigator()

const navigator = {
    animation: 'timing',
    config: {
        duration: 0,
    },
};

const io = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

export default function Routes() {
    return (
        <Provider store={Store}>
            <StatusBar
                backgroundColor={Color.secondary}
                barStyle="light-content"
                translucent
                animated
            />
            <NavigationContainer>
                <Navigator screenOptions={{
                    headerShown: false,
                    cardStyle: {
                        backgroundColor: Color.secondary,
                    }
                }}>
                    <Screen
                        name="Login"
                        component={Login}
                        options={{
                            transitionSpec: {
                              open: io,
                              close: io,
                            },
                          }}
                    />
                    <Screen
                        name="Dashboard"
                        component={Dashboard}
                        options={{
                            transitionSpec: {
                              open: io,
                              close: io,
                            },
                          }}
                    />
                    <Screen
                        name="Conversation"
                        component={Conversation}
                        options={{
                            transitionSpec: {
                              open: navigator,
                              close: navigator,
                            },
                          }}
                    />
                    <Screen
                        name="Contacts"
                        component={Contacts}
                        options={{
                            transitionSpec: {
                              open: navigator,
                              close: navigator,
                            },
                          }}
                    />
                </Navigator>
            </NavigationContainer>
        </Provider>
    )
}