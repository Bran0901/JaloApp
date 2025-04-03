import React from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image
} from "react-native";
import styles from "../styles/stylesIjumich/stylesIjumich"; // Importa los estilos
import Encabezado from "./Encabezado";

// Obtiene la altura de la pantalla del dispositivo
const screenHeight = Dimensions.get("window").height;

const Ijumich = () => {
  return (
    <View style={[styles.container, { height: screenHeight }]}> {/* Establece la altura del contenedor a la altura de la pantalla */}
      {/* Encabezado */}
      <Encabezado />

      <ScrollView
        contentContainerStyle={styles.scrollContainer} // Aplica estilos al contenedor del ScrollView
        showsVerticalScrollIndicator={false} // Desactiva el indicador de desplazamiento vertical
      >
        <View style={styles.card}> {/* Vista de tarjeta con fondo blanco */}
          <Text style={styles.cardTitle}>IJUMICH</Text> {/* Título de la tarjeta */}
          <Text style={styles.cardText}>
            El Instituto de la Juventud Michoacana se crea con fecha del 1º de enero de 2016,
            tras la extinción de la Secretaría de los Jóvenes el 31 de diciembre de 2015 y de
            la Comisión Ejecutiva de Servicio Social de Pasantes.
          </Text>
          <Text style={styles.cardText}>
            Objeto: Atender a la juventud del Estado de manera integral, fomentando e
            incluyéndolos en la instrumentación, diseño y ejecución de políticas públicas,
            programas y acciones encaminadas a los ejes del Plan de Desarrollo Integral del
            Estado de Michoacán. Esto garantizará a los jóvenes michoacanos mayores niveles de
            bienestar y mejores oportunidades de participación para su integración plena en la
            vida económica, política y social del Estado, proponiendo y garantizando sus
            derechos y obligaciones.
          </Text>
          <View style={styles.imageContainer}>
            {/* Imagen dentro de la tarjeta */}
            <Image source={require("../assets/jovenes.png")} style={styles.cardImage} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Ijumich;
