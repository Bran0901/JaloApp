import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
  },
  menuContainer: {
    width: "101%",
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
    paddingBottom: 20,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
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
    width: "99%", // Se ajusta el ancho al 90% del dispositivo
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  containerWeb: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "100%",
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    height: height * 0.18, // Se ajusta al 20% de la altura de la pantalla
    width: width * 0.8, // Se ajusta al 80% del ancho de la pantalla
  },
});

export default styles;
