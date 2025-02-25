import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6a0f49",
    alignItems: "center",
    paddingTop: 20,
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
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
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
  formContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 45,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#650D36",
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#A67B89",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  // Nuevos estilos para permitir scroll y evitar que el teclado tape el formulario
  scrollViewContainer: {
    flex: 1,
    paddingBottom: 20, // Para asegurar que haya un pequeño espacio abajo
  },
  inputContainer: {
    paddingBottom: 30, // Espacio adicional para no tocar el teclado
  },
});
