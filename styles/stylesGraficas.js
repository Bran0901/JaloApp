import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: "#6a0f49",
  },
  title: {
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  containerGeneral: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 10, // Usar paddingHorizontal en lugar de paddingStart
    borderRadius: 15,
    alignItems: "center",
    width: width * 0.95,
    alignSelf: "center",
  },
  general: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 15,
    width: "95%",
    elevation: 5,
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 20,
    flexDirection: "row", // Para alinear en fila
    alignItems: "center", // Alinea verticalmente
    justifyContent: "space-between", // Distribuye los elementos
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
  icon: {
    marginLeft: 10, // Espacio a la izquierda
  },
  textContainer: {
    flex: 1, // Ocupa el espacio disponible
    alignItems: "center", // Centra el título
  },

  generalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default styles;
