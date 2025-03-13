import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const stylesProgramas = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6a0f49",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    height: height * 0.12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingTop: 35,
    backgroundColor: "#FFFFFF",
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
    maxWidth: 200,
    height: 50,
    resizeMode: "contain",
  },
  userIcon: {
    maxWidth: 50,
    height: 50,
    resizeMode: "contain",
  },
  titleLogo: {
    maxWidth: 120,
    height: 60,
    resizeMode: "contain",
  },
  separator: {
    width: "100%",
    height: 4,
    backgroundColor: "black",
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
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 15,
  },
  cardTextDesc: {
    textAlign: "justify",
    marginTop: 2,
    marginBottom: 2,
  },
  cardDate: {
    color: "gray",
    marginTop: 2,
    marginBottom: 2,
    textAlign: "center",
  },
  cardText: {
    fontSize: 15,
    color: "#333",
    textAlign: "left", // Alineado a la izquierda
    flexWrap: "wrap", // Para que no se desborde el texto
    width: "100%", // Ocupar todo el ancho disponible
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#c83182",
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
    flex: 1,
    backgroundColor: "#FFFF",
    padding: 10,
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.52)",
  },
  modalContent: {
    width: "85%", // Ajustar tamaño
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
});

export default stylesProgramas;
