import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window"); // Obtiene tamaño de la pantalla

const stylesCuenta = StyleSheet.create({
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
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 310, // Ajuste del ancho para mantener proporción
    backgroundColor: "#FFFFFF", // Fondo blanco para el card
    borderRadius: 10, // Bordes redondeados
    padding: 20, // Espaciado interno
    shadowColor: "#000", // Sombra para efecto de elevación
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
  },
  input2: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
    height: 40,
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  boton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  textoBoton: {
    color: "#ffffff",
    fontWeight: "bold",
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000",
    textAlign: "center",
  },
  title2: {
    color: "#000",
    marginBottom: 5,
    textAlign: "left",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#A67B89",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#650D36",
    padding: 10,
    borderRadius: 5,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default stylesCuenta;
