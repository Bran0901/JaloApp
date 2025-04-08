import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  header: {
    width: "105%",
    height: height * 0.12, // Se mantiene el porcentaje de la pantalla
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05, // Responsivo, usa un 5% del ancho
    paddingTop: height * 0.05, // Ajustar con un 5% de la altura de la pantalla
    backgroundColor: "#FFFFFF",
    marginBottom: 15,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
  },
  titleContainer: {
    flex: 2,
    alignItems: "center",
  },
  logo: {
    width: width * 0.46, // Ajustar la imagen al 80% del ancho de la pantalla
    height: undefined,
    aspectRatio: 4, // Relación de aspecto para mantener la proporción
    resizeMode: "contain",
  },
  userIcon: {
    width: width * 0.11, // Ajusta el tamaño del icono en función del ancho
    height: width * 0.12, // Ajusta la altura para mantener la proporción
    resizeMode: "contain",
  },
  titleLogo: {
    width: width * 0.28, // Ajustar según el tamaño de la pantalla
    height: undefined,
    aspectRatio: 2, // Mantener la proporción
    resizeMode: "contain",
  },
  separator: {
    width: "100%",
    height: 4,
    backgroundColor: "#6A0F49",
  },
  menuButton: {
    marginRight: width * 0.13,
    marginLeft: width * 0.03, // Mantener espacio respecto al borde derecho
  },
});
