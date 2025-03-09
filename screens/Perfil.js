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
import styles from "../styles/stylesPerfil/stylesPerfil";

import Encabezado from "../screens/Encabezado";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const screenHeight = Dimensions.get("window").height; // Obtiene el alto de la pantalla

const openURL = (url) => {
  Linking.openURL(url).catch((err) =>
    console.error("No se pudo abrir la URL:", err)
  );
};

const Perfil = () => {
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

      <ScrollView>
        <View style={[styles.general]}>
          <Text style={styles.generalTitle}>INFORMACIÓN DEL PERFIL</Text>
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.cardTitle}>Información Personal</Text>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }} // Imagen de perfil de ejemplo
            style={styles.profileImage}
          />
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.info}>Victor Hugo Uribe Ochoa</Text>

          <Text style={styles.label}>Sexo</Text>
          <Text style={styles.info}>Masculino</Text>

          <Text style={styles.label}>Edad</Text>
          <Text style={styles.info}>21</Text>

          <Text style={styles.label}>Curp</Text>
          <Text style={styles.info}>UIOV030413HMNRCCA4</Text>
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.cardTitle}>Datos de ubicación</Text>
          <Text style={styles.label}>Estado</Text>
          <Text style={styles.info}>Michoacán</Text>

          <Text style={styles.label}>Localidad</Text>
          <Text style={styles.info}>Morelia</Text>
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.cardTitle}>Datos de contacto</Text>
          <Text style={styles.label}>Teléfono</Text>
          <Text style={styles.info}>4435761427</Text>

          <Text style={styles.label}>Correo</Text>
          <Text style={styles.info}>hugou770@gmail.com</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Modificar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.logoutButton]}>
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Perfil;
