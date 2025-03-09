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
import Encabezado from "../screens/Encabezado";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
const screenHeight = Dimensions.get("window").height;

const openURL = (url) => {
  Linking.openURL(url).catch((err) =>
    console.error("No se pudo abrir la URL:", err)
  );
};

const TarjetaJoven = () => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { height: screenHeight }]}>
      {/* Encabezado */}
      <Encabezado />
      <Icon
        name="arrow-left"
        size={30}
        color="white"
        onPress={() => navigation.navigate("Inicio")}
        style={{ alignSelf: "left", marginHorizontal: 20, marginVertical: 5 }}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text>Hola Mundo - Tarjeta Joven</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TarjetaJoven;
