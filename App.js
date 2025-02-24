import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './screens/Inicio';

// Importamos las pantallas de destino
import TarjetaJoven from './screens/TarjetaJoven';
import Perfil from './screens/Perfil';
import Descuentos from './screens/Descuentos';
import Vacantes from './screens/Vacantes';
import Eventos from './screens/Eventos';
import Mapa from './screens/Mapa';
import Otro from './screens/Otro';
import Cuenta from './screens/Cuenta';
import Login from './screens/Login';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
        <Stack.Screen name="TarjetaJoven" component={TarjetaJoven} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
        <Stack.Screen name="Descuentos" component={Descuentos} options={{ headerShown: false }} />
        <Stack.Screen name="Vacantes" component={Vacantes} options={{ headerShown: false }} />
        <Stack.Screen name="Eventos" component={Eventos} options={{ headerShown: false }} />
        <Stack.Screen name="Mapa" component={Mapa} options={{ headerShown: false }} />
        <Stack.Screen name="Otro" component={Otro} options={{ headerShown: false }} />
        <Stack.Screen name="Cuenta" component={Cuenta} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
