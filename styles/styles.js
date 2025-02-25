import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window"); // Obtiene tamaño de la pantalla

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6a0f49",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    height: height * 0.12, // Ajuste dinámico según la pantalla
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Distribuye equitativamente
    paddingHorizontal: "5%", // Espaciado proporcional
    paddingTop: 35,
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    flex: 1, // Permite que las imágenes tengan espacio uniforme
    alignItems: "center", // Centra la imagen dentro de su espacio
  },
  titleContainer: {
    flex: 2, // Da más espacio al título
    alignItems: "center",
  },
  logo: {
    maxWidth: 200, // Limita el ancho de la imagen
    height: 50,
    resizeMode: "contain",
  },
  userIcon: {
    maxWidth: 50,
    height: 50,
    resizeMode: "contain",
    //marginLeft: 55,
  },
  titleLogo: {
    maxWidth: 120, // Un poco más grande para resaltar el título
    height: 60,
    resizeMode: "contain",
  },
  separator: {
    width: "100%",
    height: 4,
    backgroundColor: "#6A0F49", // Línea negra divisoria
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
    elevation: 5, // Sombra para Android
  },
  otrosButton: {
    width: "90%",
    height: 120,
    backgroundColor: "#FDEEEE",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  footer: {
    width: "100%",
    height: height * 0.1, // Se ajusta dinámicamente según la pantalla
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Distribuye equitativamente los íconos
    backgroundColor: "#FFFFFF",
    paddingHorizontal: "5%", // Espaciado proporcional
    paddingVertical: 10,
    //position: 'absolute', // Fija el footer en la parte inferior
    bottom: 0,
  },
  iconContainer: {
    flex: 1, // Permite que los iconos tengan el mismo espacio
    alignItems: "center", // Centra cada ícono
  },
  socialIcon: {
    maxWidth: 40, // Se evita que las imágenes se deformen
    height: 35,
    resizeMode: "contain",
  },
  icon: {
    paddingTop: 10,
    width: 50,
    height: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ffffff",
  },
  title2: {
    color: "#000",
    fontWeight: "bold",
  },
  avatar: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 30,
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    color: "#ffffff",
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    color: "#ffffff",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  card: {
    width: "90%", // Ajuste del ancho para mantener proporción
    backgroundColor: "#FDEEEE", // Fondo blanco para el card
    borderRadius: 10, // Bordes redondeados
    padding: 20, // Espaciado interno
    shadowColor: "#000", // Sombra para efecto de elevación
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
    alignItems: "center",
  },
  input2: {
    width: "100%", // Para que los inputs ocupen todo el ancho del card
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF", // Asegura fondo blanco en inputs
    textAlign: "center",
  },
  boton: {
    backgroundColor: "#007bff", // Azul como en la imagen
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%", // Que ocupe todo el ancho del card
    marginTop: 10,
  },
  textoBoton: {
    color: "#ffffff", // Texto blanco en el botón
    fontWeight: "bold",
  },
});

export default styles;
