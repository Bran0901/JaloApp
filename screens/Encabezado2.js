import React from "react";
import { View, Image, TouchableOpacity, Dimensions } from "react-native";
import styles from "../styles/stylesEncabezado/stylesEncabezado";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";

const { height, width } = Dimensions.get("window"); // Obtiene las dimensiones de la pantalla

const Header2 = () => {
  const navigation = useNavigation(); // Hook para manejar la navegación

  return (
    <View style={styles.header}>
      {/* Logo principal - Navega a la pantalla de Bienvenida */}
      <TouchableOpacity style={styles.imageContainer}>
        <Image source={require("../assets/jovenes.png")} style={styles.logo} />
      </TouchableOpacity>

      {/* Logo del título - Navega a la pantalla de Inicio */}
      <TouchableOpacity style={styles.titleContainer}>
        <Image
          source={require("../assets/jaloLogo.png")}
          style={styles.titleLogo}
        />
      </TouchableOpacity>

      {/* Icono de usuario - Navega a la pantalla de Cuenta */}
      <TouchableOpacity style={styles.imageContainer}>
        <Image
          source={require("../assets/usuario-seguro.png")}
          style={styles.userIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header2;
