import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import styles from "../styles/stylesEventos/stylesEventos";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Encabezado from "../screens/Encabezado";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const screenHeight = Dimensions.get("window").height;

const Eventos = () => {
  const navigation = useNavigation();
  const [eventos, setEventos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvento, setSelectedEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "eventos"),
      (snapshot) => {
        const eventosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEventos(eventosData);
        setLoading(false);
      },
      (error) => {
        console.error("Error obteniendo eventos:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

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
              await deleteDoc(doc(db, "eventos", id));
              Alert.alert("Eliminado", "El evento ha sido eliminado.");
              setSelectedEvento(null);
            } catch (error) {
              console.error("Error al eliminar:", error);
              Alert.alert("Error", "No se pudo eliminar el evento.");
            }
          },
        },
      ]
    );
  };

  const filteredEventos = eventos.filter(
    (evento) =>
      evento.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evento.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { height: screenHeight }]}>
      {/* Encabezado */}
      <Encabezado />
      <Icon
        name="arrow-left"
        size={30}
        color="white"
        onPress={() => navigation.navigate("Inicio")}
        style={{ alignSelf: "left", marginHorizontal: 20, marginVertical: 5 }}
      />
      {/* Barra de búsqueda */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar evento por nombre"
          placeholderTextColor="#94949b"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Indicador de carga */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 20 }}
        />
      ) : (
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            { paddingBottom: 100 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {filteredEventos.map((evento) => (
            <TouchableOpacity
              key={evento.id}
              style={styles.card}
              onPress={() => setSelectedEvento(evento)}
            >
              <Text style={styles.cardTitle}>{evento.nombre}</Text>
              <Text style={styles.cardText}>
                Descripción: {evento.descripcion}
              </Text>
              <Text style={styles.cardText}>
                Fecha: {moment(evento.fecha).format("DD/MM/YYYY")}
              </Text>
              <Text style={styles.cardText}>Ubicación: {evento.ubicacion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate("EventosForm")}
      >
        <Text>Agregar Evento</Text>
      </Button>

      {/* Modal para mostrar detalles del evento seleccionado */}
      <Modal
        visible={!!selectedEvento}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedEvento(null)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setSelectedEvento(null)}
        >
          <View style={styles.modalContent}>
            {selectedEvento && (
              <>
                <Text style={styles.cardTitle}>{selectedEvento.nombre}</Text>
                <Text style={styles.cardText}>
                  Descripción: {selectedEvento.descripcion}
                </Text>
                <Text style={styles.cardText}>
                  Fecha: {selectedEvento.fecha}
                </Text>
                <Text style={styles.cardText}>
                  Ubicación: {selectedEvento.ubicacion}
                </Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.updateButton]}
                    onPress={() => {
                      navigation.navigate("EventosForm", {
                        evento: selectedEvento,
                      });
                      setSelectedEvento(null);
                    }}
                  >
                    <Text style={styles.buttonText}>Actualizar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.modalButton, styles.deleteButton]}
                    onPress={() => deleteEvento(selectedEvento.id)}
                  >
                    <Text style={styles.buttonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedEvento(null)}
                >
                  <Text style={styles.buttonText}>Cerrar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Eventos;
