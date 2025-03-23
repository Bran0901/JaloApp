import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6a0f49",
    alignItems: "center",
    justifyContent: "flex-start", // Cambié a flex-start para que no se centre todo
  },
  perfilContainer: {
    width: "90%", // Ajuste responsivo
    backgroundColor: "#fff",
    padding: 20, // Ajustado para no ocupar demasiado espacio en pantallas pequeñas
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 30,
    alignSelf: "center",
  },
  header: {
    width: "100%",
    height: height * 0.12, // Se mantiene el porcentaje de la pantalla
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingTop: 30,
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
    width: "200%", // Ajustar la imagen al 80% del ancho de la pantalla
    height: undefined,
    aspectRatio: 4, // Relación de aspecto para mantener la proporción
    resizeMode: "contain",
  },
  userIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  titleLogo: {
    width: "60%", // Ajustar según el tamaño de la pantalla
    height: undefined,
    aspectRatio: 2, // Mantener la proporción
    resizeMode: "contain",
  },
  separator: {
    width: "100%",
    height: 4,
    backgroundColor: "#6A0F49",
  },
  cardTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    padding: 15, // Ajustado el padding
    borderRadius: 15,
    alignItems: "center",
    width: "90%", // Ajuste el ancho al 90% de la pantalla
    elevation: 5,
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  info: {
    fontSize: 14,
    color: "black",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Permite que los botones se ajusten si no caben en una línea
    justifyContent: "center", // Centra los botones horizontalmente
    marginTop: 20,
    alignItems: "center", // Centra los botones verticalmente si es necesario
  },
  button: {
    backgroundColor: "#c83182",
    color: "#FFF",
    alignItems: "center",
    paddingVertical: 12, // Agregamos un padding vertical para que se vean más grandes en pantallas pequeñas
    paddingHorizontal: 20, // También puedes ajustar el padding horizontal si es necesario
    borderRadius: 10,
    marginHorizontal: 5,
    width: "45%", // Esto hace que los botones ocupen un 45% del ancho de la pantalla, permitiendo que se ajusten mejor
  },
  buttonBack: {
    backgroundColor: "#c83182",
    color: "#FFF",

    borderRadius: 10,
    marginHorizontal: 5,
    fontSize: 10,
    alignSelf: "left",
    width: "30%", // Esto hace que los botones ocupen un 45% del ancho de la pantalla, permitiendo que se ajusten mejor
  },
  logoutButton: {
    backgroundColor: "#A3003F",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 12,
  },
  general: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 15,
    width: "90%",
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
