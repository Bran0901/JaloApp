import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import styles from "../styles/stylesEncabezado/stylesEncabezado";
const { height } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => navigation.navigate("Bienvenida")}
      >
        <Image source={require("../assets/jovenes.png")} style={styles.logo} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.titleContainer}
        onPress={() => navigation.navigate("Inicio")}
      >
        <Image
          source={require("../assets/jaloLogo.png")}
          style={styles.titleLogo}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => navigation.navigate("Cuenta")}
      >
        <Image
          source={require("../assets/usuario-seguro.png")}
          style={styles.userIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
