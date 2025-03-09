import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  header: {
    width: "100%",
    height: height * 0.12, // Se mantiene el porcentaje de la pantalla
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingTop: 30,
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
    width: "200%", // Ajustar la imagen al 80% del ancho de la pantalla
    height: undefined,
    aspectRatio: 4, // Relación de aspecto para mantener la proporción
    resizeMode: "contain",
  },
  userIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  titleLogo: {
    width: "60%", // Ajustar según el tamaño de la pantalla
    height: undefined,
    aspectRatio: 2, // Mantener la proporción
    resizeMode: "contain",
  },
  separator: {
    width: "100%",
    height: 4,
    backgroundColor: "#6A0F49",
  },
});
