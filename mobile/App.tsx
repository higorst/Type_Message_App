import React from 'react';

import { useFonts } from 'expo-font'
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, Nunito_400Regular_Italic } from '@expo-google-fonts/nunito'

import Routes from './src/routes'
import { View } from 'react-native';

import DatabaseInit from './src/database/database-init';

export default function App() {

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_400Regular_Italic,
  })

  new DatabaseInit

  if (!fontsLoaded) {
    return <View />
  }

  return (
    <Routes />
  );
}
