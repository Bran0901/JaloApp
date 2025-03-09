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
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import styles from "../styles/stylesVacantes/stylesVacantes";
import { useNavigation } from "@react-navigation/native";
import Encabezado from "../screens/Encabezado";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const screenHeight = Dimensions.get("window").height;

const Vacantes = () => {
  const navigation = useNavigation();
  const [vacantes, setVacantes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVacante, setSelectedVacante] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "vacantes"),
      (snapshot) => {
        const vacantesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVacantes(vacantesData);
        setLoading(false);
      },
      (error) => {
        console.error("Error obteniendo vacantes:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const deleteVacante = async (id) => {
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
              await deleteDoc(doc(db, "vacantes", id));
              Alert.alert("Eliminado", "La vacante ha sido eliminada.");
              setSelectedVacante(null);
            } catch (error) {
              console.error("Error al eliminar:", error);
              Alert.alert("Error", "No se pudo eliminar la vacante.");
            }
          },
        },
      ]
    );
  };

  const filteredVacantes = vacantes.filter(
    (vacante) =>
      vacante.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vacante.cargo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vacante.requisitos.toLowerCase().includes(searchQuery.toLowerCase())
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
          placeholder="Buscar vacante por nombre"
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
          {filteredVacantes.map((vacante) => (
            <TouchableOpacity
              key={vacante.id}
              style={styles.card}
              onPress={() => setSelectedVacante(vacante)}
            >
              <Text style={styles.cardTitle}>{vacante.nombre}</Text>
              <Text style={styles.cardText}>Cargo: {vacante.cargo}</Text>
              <Text style={styles.cardText}>Salario: {vacante.salario}</Text>
              <Text style={styles.cardText}>
                Requisitos: {vacante.requisitos}
              </Text>
              <Text style={styles.cardText}>
                Experiencia: {vacante.experiencia}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate("VacantesForm")}
      >
        <Text>Agregar Vacante</Text>
      </Button>

      {/* Modal para mostrar detalles de la vacante seleccionada */}
      <Modal
        visible={!!selectedVacante}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedVacante(null)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setSelectedVacante(null)}
        >
          <View style={styles.modalContent}>
            {selectedVacante && (
              <>
                <Text style={styles.cardTitle}>{selectedVacante.nombre}</Text>
                <Text style={styles.cardText}>
                  Cargo: {selectedVacante.cargo}
                </Text>
                <Text style={styles.cardText}>
                  Salario: {selectedVacante.salario}
                </Text>
                <Text style={styles.cardText}>
                  Requisitos: {selectedVacante.requisitos}
                </Text>
                <Text style={styles.cardText}>
                  Experiencia: {selectedVacante.experiencia}
                </Text>

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

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedVacante(null)}
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

export default Vacantes;
