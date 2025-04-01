import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6a0f49",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff", // Fondo blanco para resaltar
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Sombra en Android
    margin: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#333",
  },
  cardText: {
    fontSize: 14,
    color: "#333",
    textAlign: "justify",
    lineHeight: 30
  },
  imageContainer: {
    alignItems: "center", // Centra horizontalmente
    justifyContent: "center", // Centra verticalmente (si tiene altura)
    width: "100%", // Asegura que el contenedor ocupa todo el ancho disponible
    marginTop: 20, 
  },
  cardImage: {
    width: 220,
    height: 100,
  },
});

export default styles;
