import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { auth } from "./firebaseConfig"; // Asegúrate de tener la configuración de Firebase
import { View, Text, ActivityIndicator } from "react-native";

// Importamos las pantallas de destino
import Inicio from "./screens/Inicio";
import TarjetaJoven from "./screens/TarjetaJoven";
import Perfil from "./screens/Perfil";
import Descuentos from "./screens/Descuentos";
import Vacantes from "./screens/Vacantes";
import VacantesForm from "./screens/VacantesForm";
import Eventos from "./screens/Eventos";
import EventosForm from "./screens/EventosForm";
import Ijumich from "./screens/ijumich";
import Cuenta from "./screens/Cuenta";
import Login from "./screens/Login";
import DescuentoForm from "./screens/DescuentoForm";
import DescuentoFormAct from "./screens/DescuentoFormAct";
import Programas from "./screens/Programas";
import ProgramasForm from "./screens/ProgramasForm";
import Bienvenida from "./screens/Bienvenida";
import MenuScreen from "./screens/MenuH";
import Asistentes from "./screens/Asistentes";
import CuentaForm from "./screens/CuentaForm";
import AsistenciaForm from "./screens/AsistenciaForm";
import Graficas from "./screens/Graficas";

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true); // Para manejar la carga de estado
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Aquí verificamos el estado de la autenticación
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Si el usuario está autenticado, se actualizará el estado
      setIsLoading(false); // Una vez que sabemos si el usuario está autenticado, ya podemos cargar la app
    });

    return () => unsubscribe(); // Limpiamos el observador al desmontar el componente
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Inicio" : "Bienvenida"}>
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TarjetaJoven"
          component={TarjetaJoven}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Descuentos"
          component={Descuentos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Vacantes"
          component={Vacantes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Eventos"
          component={Eventos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ijumich"
          component={Ijumich}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Programas"
          component={Programas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cuenta"
          component={Cuenta}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DescuentoForm"
          component={DescuentoForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DescuentoFormAct"
          component={DescuentoFormAct}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VacantesForm"
          component={VacantesForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventosForm"
          component={EventosForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProgramasForm"
          component={ProgramasForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bienvenida"
          component={Bienvenida}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Asistentes"
          component={Asistentes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CuentaForm"
          component={CuentaForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AsistenciaForm"
          component={AsistenciaForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Graficas"
          component={Graficas}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
