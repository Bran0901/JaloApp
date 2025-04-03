import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator,
  Linking,
  Dimensions,
} from "react-native";
import { collection, onSnapshot, doc, deleteDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import styles from "../styles/stylesEventos/stylesEventos";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Encabezado from "../screens/Encabezado";
import { Button, Card, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Obtiene la altura de la pantalla para ajustes de diseño
const screenHeight = Dimensions.get("window").height;

// Función para abrir una URL
const openURL = (url) => {
  Linking.openURL(url).catch((err) =>
    console.error("No se pudo abrir la URL:", err)
  );
};

const Eventos = () => {
  // Hooks para el manejo de estados
  const navigation = useNavigation();
  const [eventos, setEventos] = useState([]); // Estado para almacenar los eventos
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const [selectedEvento, setSelectedEvento] = useState(null); // Estado para el evento seleccionado
  const [loading, setLoading] = useState(true); // Estado de carga
  const [userRole, setUserRole] = useState(null); // Estado para el rol del usuario

  // Hook para obtener el rol del usuario actual desde Firebase
  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser; // Obtiene el usuario autenticado
      if (user) {
        const userDoc = await getDoc(doc(db, "usuarios", user.uid)); // Busca el documento del usuario en Firestore
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role); // Establece el rol del usuario
        }
      }
    };
    fetchUserRole();
  }, []);

  // Hook para obtener los eventos en tiempo real desde Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "eventos"), // Escucha la colección de eventos
      (snapshot) => {
        const eventosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEventos(eventosData); // Actualiza el estado de eventos
        setLoading(false); // Finaliza el estado de carga
      },
      (error) => {
        console.error("Error obteniendo eventos:", error);
        setLoading(false); // Finaliza el estado de carga en caso de error
      }
    );
    return () => unsubscribe(); // Limpiar la suscripción al desmontar el componente
  }, []);

  // Función para eliminar un evento
  const deleteEvento = async (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que deseas eliminar este evento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "eventos", id)); // Elimina el evento en Firestore
              Alert.alert("Eliminado", "El evento ha sido eliminado.");
              setSelectedEvento(null); // Cierra el modal de evento seleccionado
            } catch (error) {
              console.error("Error al eliminar:", error);
              Alert.alert("Error", "No se pudo eliminar el evento.");
            }
          },
        },
      ]
    );
  };

  // Filtra los eventos según la búsqueda de ubicación o empresa
  const filteredEventos = eventos.filter(
    (evento) =>
      evento.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evento.ubicacion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { height: screenHeight }]}>
      {/* Encabezado con flecha hacia atrás */}
      <Encabezado />
      <View style={styles.general}>
        <Icon
          name="arrow-left"
          size={30}
          color="black"
          onPress={() => navigation.navigate("Inicio")}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.generalTitle}>EVENTOS</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Ubicación o empresa"
          placeholderTextColor="#94949b"
          value={searchQuery}
          onChangeText={setSearchQuery} // Actualiza la consulta de búsqueda
        />
      </View>

      {/* Cargando o mostrando eventos */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingBottom: 100 }]}>
          {filteredEventos.map((evento) => (
            <Card
              key={evento.id}
              style={styles.card}
              onPress={() => setSelectedEvento(evento)} // Abre el modal al seleccionar un evento
            >
              <Card.Title
                title={evento.empresa}
                subtitle={evento.nombre}
                left={(props) => (
                  <Avatar.Icon
                    {...props}
                    icon="calendar"
                    color="white"
                    backgroundColor="#6a0f49"
                  />
                )}
              />
              <Text style={styles.cardText}>Descripción: {evento.descripcion}</Text>
              <Text style={styles.cardText}>
                Fecha: {moment(evento.fecha).format("DD/MM/YYYY")}
              </Text>
              <Text style={styles.cardText}>Ubicación: {evento.ubicacion}</Text>
            </Card>
          ))}
        </ScrollView>
      )}

      {/* Botón para agregar evento, solo para usuarios con rol 'administrador' o 'empresa' */}
      {(userRole === "administrador" || userRole === "empresa") && (
        <Button mode="contained" style={styles.button} onPress={() => navigation.navigate("EventosForm")}>
          <Text>Agregar Evento</Text>
        </Button>
      )}

      {/* Modal para mostrar los detalles del evento seleccionado */}
      <Modal visible={!!selectedEvento} transparent animationType="slide" onRequestClose={() => setSelectedEvento(null)}>
        <View style={styles.modalContainer}>
          <ScrollView>
            <View style={styles.modalContent}>
              {selectedEvento && (
                <>
                  <Text style={styles.cardTitle}>{selectedEvento.nombre}</Text>
                  <Text style={styles.modalTitle}>Descripción:</Text>
                  <Text style={styles.modalText}>{selectedEvento.descripcion}</Text>

                  {/* Mostrar botones de actualizar y eliminar solo para administradores */}
                  {userRole === "administrador" && (
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={[styles.modalButton, styles.updateButton]}
                        onPress={() => {
                          navigation.navigate("EventosForm", { evento: selectedEvento });
                          setSelectedEvento(null); // Cierra el modal
                        }}
                      >
                        <Text style={styles.buttonText}>Actualizar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.modalButton, styles.deleteButton]}
                        onPress={() => deleteEvento(selectedEvento.id)} // Elimina el evento
                      >
                        <Text style={styles.buttonText}>Eliminar</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {/* Botón para cerrar el modal */}
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setSelectedEvento(null)} // Cierra el modal
                  >
                    <Text style={styles.buttonText}>Cerrar</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default Eventos;
