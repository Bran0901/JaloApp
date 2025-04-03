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
import { useNavigation } from "@react-navigation/native"; // Hook para la navegación entre pantallas
import styles from "../styles/styles"; // Importa los estilos
import Encabezado from "../screens/Encabezado"; // Importa el componente de encabezado

// Obtiene la altura de la pantalla del dispositivo
const screenHeight = Dimensions.get("window").height; 

// Función para abrir URLs en el navegador del dispositivo
const openURL = (url) => {
  Linking.openURL(url).catch((err) =>
    console.error("No se pudo abrir la URL:", err)
  );
};

// Componente principal de la pantalla de inicio
const Inicio = () => {
  const navigation = useNavigation(); // Hook para manejar la navegación

  return (
    <View style={[styles.container, { height: screenHeight }]}>
      {/* Componente de encabezado */}
      <Encabezado />

      {/* Contenido desplazable dentro de la pantalla */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false} // Oculta la barra de desplazamiento vertical
      >
        <View style={styles.buttonGrid}>
          {/* Botón para navegar a la pantalla "Tarjeta Joven" */}
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

          {/* Botón para navegar a la pantalla "Perfil" */}
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

          {/* Botón para navegar a la pantalla "Descuentos" */}
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

          {/* Botón para navegar a la pantalla "Vacantes" */}
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

          {/* Botón para navegar a la pantalla "Eventos" */}
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

          {/* Botón para navegar a la pantalla "Programas" */}
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

        {/* Botón "Otros" que lleva a la pantalla "Ijumich" */}
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

      {/* Barra separadora en la parte inferior de la pantalla */}
      <View style={styles.separator} />
    </View>
  );
};

export default Inicio; // Exporta el componente para su uso en la aplicación
