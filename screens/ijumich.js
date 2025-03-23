import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
} from "react-native";
import styles from "../styles/styles"; // Importa los estilos
import Encabezado from "./Encabezado";

const screenHeight = Dimensions.get("window").height;

const openURL = (url) => {
  Linking.openURL(url).catch((err) =>
    console.error("No se pudo abrir la URL:", err)
  );
};

const Ijumich = () => {
  return (
    <View style={[styles.container, { height: screenHeight }]}>
      {/* Encabezado */}
      <Encabezado />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text>El IJUMICH estará aqui</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Ijumich;
