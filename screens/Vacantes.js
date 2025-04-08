import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
} from "react-native";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import styles from "../styles/stylesVacantes/stylesVacantes";
import { useNavigation } from "@react-navigation/native";
import Encabezado from "../screens/Encabezado";
import { Button, Card, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Obtener la altura de la pantalla para manejar la vista de manera responsiva
const screenHeight = Dimensions.get("window").height;

const Vacantes = () => {
  const navigation = useNavigation();

  // Estado para almacenar las vacantes, la búsqueda, la vacante seleccionada, la carga de datos y el rol del usuario
  const [vacantes, setVacantes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVacante, setSelectedVacante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  // useEffect para obtener las vacantes de Firestore y el rol del usuario
  useEffect(() => {
    // Suscripción en tiempo real a las vacantes
    const unsubscribe = onSnapshot(collection(db, "vacantes"), (snapshot) => {
      const vacantesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVacantes(vacantesData);
      setLoading(false); // Finaliza la carga de datos
    });

    // Función para obtener el rol del usuario
    const fetchUserRole = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "usuarios", user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role); // Establece el rol del usuario
          }
        }
      } catch (error) {
        console.error("Error obteniendo el rol del usuario:", error);
      }
    };

    // Llamada inicial a la función que obtiene el rol del usuario
    fetchUserRole();
    return () => unsubscribe(); // Cleanup de la suscripción al desmontar el componente
  }, []);

  // Función para eliminar una vacante, solo accesible para administradores
  const deleteVacante = async (id) => {
    if (userRole !== "administrador") {
      Alert.alert(
        "Acceso denegado",
        "No tienes permisos para eliminar vacantes."
      );
      return;
    }
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que deseas eliminar esta vacante?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "vacantes", id)); // Elimina la vacante de Firestore
              Alert.alert("Eliminado", "La vacante ha sido eliminada.");
              setSelectedVacante(null); // Cierra el modal tras eliminar
            } catch (error) {
              console.error("Error al eliminar:", error);
              Alert.alert("Error", "No se pudo eliminar la vacante.");
            }
          },
        },
      ]
    );
  };

  // Filtrar las vacantes según el término de búsqueda
  const filteredVacantes = vacantes.filter(
    (vacante) =>
      vacante.ubicacion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vacante.empresa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { height: screenHeight }]}>
      <Encabezado />

      {/* Encabezado con un botón de retroceso */}
      <View style={styles.general}>
        <Icon
          name="arrow-left"
          size={30}
          color="black"
          onPress={() => navigation.navigate("Inicio")}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.generalTitle}>VACANTES</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>

      {/* Barra de búsqueda para filtrar vacantes */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Ubicacion o empresa"
          placeholderTextColor="#94949b"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Contenedor de las vacantes, mostrando un cargador mientras se obtienen los datos */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ marginTop: 20 }}
          />
        ) : (
          filteredVacantes.map((vacante) => (
            <Card
              key={vacante.id}
              style={styles.card}
              onPress={() => setSelectedVacante(vacante)}
            >
              <Card.Title
                title={vacante.empresa}
                subtitle={vacante.nombre}
                left={(props) => (
                  <Avatar.Icon
                    {...props}
                    icon="briefcase"
                    backgroundColor="#6a0f49"
                  />
                )}
              />
              <Text style={styles.cardText}>Cargo: {vacante.cargo}</Text>
              <Text style={styles.cardText}>Salario: {vacante.salario}</Text>
              <Text style={styles.cardText}>
                Ubicacion: {vacante.ubicacion}
              </Text>
              <Text style={styles.cardText}>
                Requisitos: {vacante.requisitos}
              </Text>
            </Card>
          ))
        )}

        {/* Botón para agregar vacantes, visible solo para empresas y administradores */}
        {(userRole === "empresa" || userRole === "administrador") && (
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate("VacantesForm")}
          >
            <Text>Agregar Vacante</Text>
          </Button>
        )}

        {/* Modal que muestra los detalles de la vacante seleccionada */}
        <Modal
          visible={!!selectedVacante}
          transparent
          animationType="slide"
          onRequestClose={() => setSelectedVacante(null)}
        >
          <View style={styles.modalContainer}>
            {selectedVacante && (
              <View style={styles.modalContent}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                  <Text style={styles.cardTitle}>{selectedVacante.nombre}</Text>
                  <Text style={styles.modalTitle}>Empresa:</Text>
                  <Text style={styles.modalText}>
                    {selectedVacante.empresa}
                  </Text>

                  <Text style={styles.modalTitle}>Cargo:</Text>
                  <Text style={styles.modalText}>{selectedVacante.cargo}</Text>

                  <Text style={styles.modalTitle}>Salario:</Text>
                  <Text style={styles.modalText}>
                    {selectedVacante.salario}
                  </Text>

                  <Text style={styles.modalTitle}>Ubicación:</Text>
                  <Text style={styles.modalText}>
                    {selectedVacante.ubicacion}
                  </Text>

                  <Text style={styles.modalTitle}>Contacto:</Text>
                  <Text style={styles.modalText}>
                    {selectedVacante.contacto}
                  </Text>

                  <Text style={styles.modalTitle}>Requisitos:</Text>
                  <Text style={styles.modalText}>
                    {selectedVacante.requisitos}
                  </Text>

                  <Text style={styles.modalTitle}>Experiencia:</Text>
                  <Text style={styles.modalText}>
                    {selectedVacante.experiencia}
                  </Text>

                  {/* Nuevos campos para mostrar más detalles */}
                  <Text style={styles.modalTitle}>Categoría:</Text>
                  <Text style={styles.modalText}>
                    {selectedVacante.categoria}
                  </Text>

                  <Text style={styles.modalTitle}>Link de Ubicación:</Text>
                  <Text
                    style={styles.modalTextLink}
                    onPress={() =>
                      Linking.openURL(selectedVacante.linkUbicacion)
                    }
                  >
                    {selectedVacante.linkUbicacion}
                  </Text>

                  {/* Botones de actualización y eliminación solo para administradores */}
                  {userRole === "administrador" && (
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={[styles.modalButton, styles.updateButton]}
                        onPress={() => {
                          navigation.navigate("VacantesForm", {
                            vacante: selectedVacante,
                          });
                          setSelectedVacante(null);
                        }}
                      >
                        <Text style={styles.buttonText}>Actualizar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.modalButton, styles.deleteButton]}
                        onPress={() => deleteVacante(selectedVacante.id)}
                      >
                        <Text style={styles.buttonText}>Eliminar</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {/* Botón para cerrar el modal */}
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setSelectedVacante(null)}
                  >
                    <Text style={styles.buttonText}>Cerrar</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            )}
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default Vacantes;
