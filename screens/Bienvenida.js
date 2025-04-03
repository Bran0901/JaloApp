import React from "react";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import styles from "../styles/stylesBienvenida/styles"; // Importa los estilos
import { useNavigation } from "@react-navigation/native"; // Importa hook de navegación

const LoginScreen = () => {
  const navigation = useNavigation(); // Hook para la navegación

  return (
    <View style={styles.container}> {/* Contenedor principal con los estilos definidos */}
      {/* Logo de la aplicación */}
      <Image source={require("../assets/jaloLogo.png")} style={styles.logo} />

      <View style={styles.card}> {/* Contenedor de la tarjeta con la información */}
        {/* Título de la pantalla */}
        <Text style={styles.title}>Bienvenid@ a la JALO APP</Text>

        {/* Subtítulo con instrucciones */}
        <Text style={styles.subtitle}>Escoge una opción para continuar</Text>

        {/* Botón para registrarse */}
        <Button
          icon="lock" /* Icono del botón */
          style={styles.passwordButton} /* Estilo del botón */
          mode="contained" /* Modo del botón (contenido sólido) */
          onPress={() => navigation.navigate("Cuenta")} /* Navega a la pantalla de registro */
        >
          Registrarse
        </Button>

        {/* Botón para iniciar sesión */}
        <Button
          mode="contained" /* Modo del botón (contenido sólido) */
          icon="lock" /* Icono del botón */
          style={styles.passwordButton} /* Estilo del botón */
          onPress={() => navigation.navigate("Login")} /* Navega a la pantalla de inicio de sesión */
        >
          Iniciar sesión
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;
