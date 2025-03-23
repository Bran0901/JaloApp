import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window"); // Obtiene tamaño de la pantalla
const screenHeight = Dimensions.get("window").height;

export default StyleSheet.create({
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
    backgroundColor: "#6A0F49",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  searchBar: {
    backgroundColor: "#FFFF",
    padding: 10,
    borderRadius: 20,
    width: width * 0.9,
  },
  filterButton: {
    backgroundColor: "#880E4F",
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 10,
    padding: 10,
  },
  cardDesc: {
    textAlign: "center",
    marginTop: 2,
    marginBottom: 2,
  },
  direccion: {
    textAlign: "center",
    marginTop: 2,
    marginBottom: 2,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#c83182",
  },
  discountDate: {
    color: "gray",
    marginTop: 2,
    marginBottom: 2,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 15,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 2,
    marginBottom: 2,
    alignSelf: "center",
  },
  modalTitle2: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 2,
    marginBottom: 2,
    textAlign: "center",
  },
  modalText: {
    marginTop: 2,
    marginBottom: 2,
    alignSelf: "center",
    textAlign: "center",
  },
  modalTextLink: {
    marginTop: 2,
    marginBottom: 2,
    alignSelf: "center",
    textAlign: "center",
    color: "#0000ff",
    textDecorationLine: "underline",
  },
  modalTextDesc: {
    marginTop: 2,
    marginBottom: 2,
    alignSelf: "center",
    textAlign: "center",
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: "#6a0f49",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    alignItems: "center",
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
