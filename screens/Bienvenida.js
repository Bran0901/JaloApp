import React from "react";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import styles from "../styles/stylesBienvenida/styles";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Logo */}

      <Image source={require("../assets/jaloLogo.png")} style={styles.logo} />
      <View style={styles.card}>
        {/* Bienvenida */}
        <Text style={styles.title}>Bienvenid@ a la JALO APP</Text>
        <Text style={styles.subtitle}>Escoge una opción para continuar</Text>

        {/* Botón de Google */}
        <Button
          icon="lock"
          style={styles.passwordButton}
          mode="contained"
          onPress={() => navigation.navigate("Cuenta")}
        >
          Registrarse
        </Button>

        {/* Botón de Claves */}
        <Button
          mode="contained"
          icon="lock"
          style={styles.passwordButton}
          onPress={() => navigation.navigate("Login")}
        >
          Iniciar sesión
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;
