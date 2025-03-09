import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6a0f49", // Fondo
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15, // Ajustado el padding
    borderRadius: 15,
    alignItems: "center",
    width: "100%", // Ajuste el ancho al 90% de la pantalla
    elevation: 5,
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  logo: {
    width: 230,
    height: 230,
    marginBottom: 20,
  },
  title: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    color: "#000000",
    fontSize: 13,
    marginBottom: 20,
    textAlign: "center",
  },
  googleButton: {
    backgroundColor: "white",
    color: "black",
    width: "90%",
    marginBottom: 10,
  },
  passwordButton: {
    backgroundColor: "#730E4D",
    width: "90%",
    marginTop: 10,
    marginBottom: 10,
  },
});
