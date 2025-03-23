import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { Dimensions } from "react-native"; // Para hacer todo responsivo
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles"; // Importa los estilos
import Encabezado from "../screens/Encabezado";

const screenHeight = Dimensions.get("window").height; // Obtiene el alto de la pantalla

const openURL = (url) => {
  Linking.openURL(url).catch((err) =>
    console.error("No se pudo abrir la URL:", err)
  );
};

const Inicio = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { height: screenHeight }]}>
      {/* Encabezado */}
      <Encabezado />

      {/* Contenido desplazable */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.buttonGrid}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("TarjetaJoven")}
          >
            <Text style={styles.title2}>Tarjeta Joven</Text>
            <Image
              source={require("../assets/tarjeta.png")}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Perfil")}
          >
            <Text style={styles.title2}>Perfil</Text>
            <Image
              source={require("../assets/perfil.png")}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Descuentos")}
          >
            <Text style={styles.title2}>Descuentos</Text>
            <Image
              source={require("../assets/descuento.png")}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Vacantes")}
          >
            <Text style={styles.title2}>Vacantes</Text>
            <Image
              source={require("../assets/vacante.png")}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Eventos")}
          >
            <Text style={styles.title2}>Eventos</Text>
            <Image
              source={require("../assets/evento.png")}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Programas")}
          >
            <Text style={styles.title2}>Programas</Text>
            <Image
              source={require("../assets/personas.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Botón Otros */}
        <TouchableOpacity
          style={styles.otrosButton}
          onPress={() => navigation.navigate("Ijumich")}
        >
          <Text style={styles.title2}>IJUMICH</Text>
          <Image
            source={require("../assets/jovenes.png")}
            style={styles.iconLogo}
          />
        </TouchableOpacity>
      </ScrollView>

      {/* Barra inferior */}
      <View style={styles.separator} />
    </View>
  );
};

export default Inicio;
