import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6a0f49",
    alignItems: "center",
    justifyContent: "center",
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    width: width * 0.9,
    elevation: 5,
    alignSelf: "center",
    marginVertical: 10,
  },
  text: {
    color: "#000000",
  },
  label: {
    fontWeight: "bold",
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonGrid: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    width: "45%",
    height: 120,
    backgroundColor: "#FDEEEE",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  card: {
    width: width * 0.9,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardEn: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
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
  general: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 15,
    width: width * 0.9,
    elevation: 5,
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 10,
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

export default styles;
