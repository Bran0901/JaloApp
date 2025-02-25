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
  searchInput: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
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
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#c83182",
  },
  discountDate: {
    color: "gray",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalText: {
    marginTop: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: "#6a0f49",
  },
});
