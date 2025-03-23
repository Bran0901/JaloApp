import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
  },
  menuContainer: {
    width: width * 1.01,
    height: height,
    backgroundColor: "#6a0f49",
    paddingTop: 50,
    paddingHorizontal: 20,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20, // Para evitar que el contenido se corte
  },
  title: {
    flex: 1, // Ocupa el espacio disponible
    textAlign: "center", // Centra el texto en su contenedor
    fontSize: 20, // Tamaño del texto
    fontWeight: "bold",
  },
  menuText: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  cardMenu: {
    backgroundColor: "white",
    width: width * 0.9,
    alignSelf: "center",
    alignContent: "center",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  containerWeb: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "100%",
  },
  linkContainer: {
    flexDirection: "row", // Alinea el ícono y el texto en la misma línea
    alignItems: "center", // Centra verticalmente el ícono y el texto
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
    width: "100%",
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row", // Elementos en fila
    alignItems: "center", // Alinear verticalmente
    justifyContent: "space-between", // Menú en medio, flecha al final
    width: "100%", // Ocupa todo el ancho disponible
    paddingHorizontal: 20, // Espaciado en los lados
    paddingVertical: 10, // Espaciado arriba y abajo
  },
  iconTextContainerPhone: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  icon: {
    marginRight: 10,
    color: "#6a0f49",
  },
  iconRed: {
    marginHorizontal: 15,
    color: "#6a0f49",
  },
  iconText: {
    fontSize: 13,
    color: "#000000",
  },
  iconTextLink: {
    fontSize: 13,
    textAlign: "center",
  },
  iconTextContainerUbi: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  iconTextPhone: {
    fontSize: 13,
    color: "black",
  },
  logo: {
    height: height * 0.2,
    width: width * 0.8,
  },
});

export default styles;
