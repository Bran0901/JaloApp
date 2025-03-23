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
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import styles from "../styles/stylesEventos/stylesEventos";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Encabezado from "../screens/Encabezado";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Card, Avatar } from "react-native-paper";

const screenHeight = Dimensions.get("window").height;

const openURL = (url) => {
  Linking.openURL(url).catch((err) =>
    console.error("No se pudo abrir la URL:", err)
  );
};

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
      evento.ubicacion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { height: screenHeight }]}>
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

      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Ubicación o empresa"
          placeholderTextColor="#94949b"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

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
            <Card
              key={evento.id}
              style={styles.card}
              onPress={() => setSelectedEvento(evento)}
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

              <Text style={styles.cardText}>
                Descripción: {evento.descripcion}
              </Text>
              <Text style={styles.cardText}>
                Fecha: {moment(evento.fecha).format("DD/MM/YYYY")}
              </Text>
              <Text style={styles.cardText}>Ubicación: {evento.ubicacion}</Text>
            </Card>
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

      {/* MODAL SCROLLEABLE */}
      <Modal
        visible={!!selectedEvento}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedEvento(null)}
      >
        <View style={styles.modalContainer}>
          <ScrollView>
            <View style={styles.modalContent}>
              {selectedEvento && (
                <>
                  <Text style={styles.cardTitle}>{selectedEvento.nombre}</Text>
                  {selectedEvento.empresa && (
                    <>
                      <Text style={styles.modalTitle}>Empresa:</Text>
                      <Text style={styles.modalText}>
                        {selectedEvento.empresa}
                      </Text>
                    </>
                  )}
                  <Text style={styles.modalTitle}>Descripción:</Text>
                  <Text style={styles.modalText}>
                    {selectedEvento.descripcion}
                  </Text>
                  <Text style={styles.modalTitle}>Fecha:</Text>
                  <Text style={styles.modalText}>
                    {moment(selectedEvento.fecha).format("DD/MM/YYYY")}
                  </Text>
                  <Text style={styles.modalTitle}>Ubicación:</Text>
                  <Text style={styles.modalText}>
                    {selectedEvento.ubicacion}
                  </Text>

                  {/* NUEVOS CAMPOS */}
                  {selectedEvento.categoria && (
                    <>
                      <Text style={styles.modalTitle}>Categoría:</Text>
                      <Text style={styles.modalText}>
                        {selectedEvento.categoria}
                      </Text>
                    </>
                  )}
                  {selectedEvento.linkUbicacion && (
                    <>
                      <Text style={styles.modalTitle}>
                        Ubicación en Google Maps:
                      </Text>
                      <TouchableOpacity
                        onPress={() => openURL(selectedEvento.linkUbicacion)}
                      >
                        <Text style={[styles.modalTextLink]}>
                          {selectedEvento.linkUbicacion}
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}

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
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default Eventos;
