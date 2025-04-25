import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window"); // Obtiene tamaño de la pantalla

const stylesAsistentesForm = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6a0f49",
    alignItems: "center",
    justifyContent: "space-between",
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
    elevation: 5,
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
    width: 80,
    height: 50,
    resizeMode: "contain",
  },
  userIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  titleLogo: {
    width: 120,
    height: 60,
    resizeMode: "contain",
  },
  separator: {
    width: "100%",
    height: 2,
    backgroundColor: "black",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    width: "90%",
  },
  cardWrapper: {
    width: "90%", // 🔹 Mantiene el tamaño sin overflow
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#FDEEEE",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
  },
  input2: {
    width: "100%",
    height: 100,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#C83182",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    width: "100%",
    height: height * 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
  },
  iconContainer: {
    marginHorizontal: 15,
  },
  socialIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  title2: {
    textAlign: "center",
  },
  formContainer: {
    width: "90%", // Ajuste del ancho para mantener proporción
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 40,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 45,
    alignSelf: "center",
  },
  titleForm: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  inputForm: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginVertical: 8,
  },

  buttonContainerForm: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  addButtonForm: {
    backgroundColor: "#650D36",
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonForm: {
    backgroundColor: "#A67B89",
    padding: 10,
    borderRadius: 5,
  },
  buttonTextForm: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textForm: {
    color: "#000",
    marginBottom: 5,
    textAlign: "left",
    fontWeight: "bold",
  },
});

export default stylesAsistentesForm;
