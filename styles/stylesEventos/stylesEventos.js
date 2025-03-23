import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const stylesEventos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6a0f49",
    alignItems: "center",
    justifyContent: "center",
  },

  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: width * 0.9, // Se ajusta dinámicamente al ancho de la pantalla
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 15,
    color: "#333",
    textAlign: "left", // Alineado a la izquierda
    flexWrap: "wrap", // Para que no se desborde el texto
    width: "100%", // Ocupar todo el ancho disponible
    marginBottom: 5,
  },
  addButton: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "#C83182",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Sombra para que resalte
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 53,
    marginTop: 15,
  },
  searchBar: {
    backgroundColor: "#FFFF",
    padding: 10,
    borderRadius: 20,
    width: width * 0.9,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.52)",
  },
  modalContent: {
    width: "95%", // Ajustar tamaño
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextLink: {
    marginTop: 2,
    marginBottom: 2,
    alignSelf: "center",
    textAlign: "center",
    color: "#0000ff",
    textDecorationLine: "underline",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  updateButton: {
    backgroundColor: "#C83182", // Verde para actualizar
  },
  deleteButton: {
    backgroundColor: "#C83182", // Rojo para eliminar
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  loadingIndicator: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    backgroundColor: "#C83182", // Color principal
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15, // Separación del resto de botones
    width: "96%",
  },
  footer: {
    width: "100%",
    height: height * 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: "5%",
    paddingVertical: 10,
    bottom: 0,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
  },
  socialIcon: {
    maxWidth: 40,
    height: 35,
    resizeMode: "contain",
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#c83182",
  },
  cardTitle2: {
    fontSize: 20,
    color: "#333",
    textAlign: "left", // Alineado a la izquierda
    flexWrap: "wrap", // Para que no se desborde el texto
    width: "100%", // Ocupar todo el ancho disponible
    marginBottom: 5,
    fontWeight: "bold",
  },
  cardText2: {
    fontSize: 15,
    color: "gray",
    textAlign: "center", // Alineado a la izquierda
    flexWrap: "wrap", // Para que no se desborde el texto
    width: "100%", // Ocupar todo el ancho disponible
    marginBottom: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    alignSelf: "center",
  },
  modalText: {
    marginTop: 2,
    marginBottom: 2,
    alignSelf: "center",
  },
  general: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 15,
    width: "90%",
    elevation: 5,
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 20,
    flexDirection: "row", // Para alinear en fila
    alignItems: "center", // Alinea verticalmente
    justifyContent: "space-between", // Distribuye los elementos
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

export default stylesEventos;
