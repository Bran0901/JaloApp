import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window"); // Obtiene el tamaño de la pantalla

const stylesTarjetaJoven = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6a0f49",
    alignItems: "center",
    justifyContent: "flex-start", // Cambiado a flex-start para mejorar la distribución
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start", // Cambiado para ajustar mejor los contenidos
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: "#FDEEEE",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: "95%", // Se ajusta a la pantalla completa
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "#FFF",
    marginTop: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, // Sombra para Android
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginBottom: 15,
    textTransform: "uppercase",
    textAlign: "center",
    paddingHorizontal: 10, // Añadido padding horizontal
  },
  infoContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingHorizontal: 10, // Añadido padding horizontal
  },
  label: {
    fontSize: 16, // Aumentado para mayor legibilidad
    fontWeight: "bold",
    color: "black",
  },
  value: {
    fontSize: 14, // Aumentado para mayor legibilidad
    color: "black",
  },
  backButton: {
    alignSelf: "flex-start",
    marginHorizontal: 20,
    marginVertical: 5,
  },
});

export default stylesTarjetaJoven;
