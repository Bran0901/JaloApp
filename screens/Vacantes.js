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
} from "react-native";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import styles from "../styles/stylesVacantes/stylesVacantes";
import { useNavigation } from "@react-navigation/native";
import Encabezado from "../screens/Encabezado";
import { Button, Card, Avatar } from "react-native-paper";
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
    Alert.alert("Confirmar Eliminación", "¿Estás seguro de que deseas eliminar esta vacante?", [
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
    ]);
  };

  const filteredVacantes = vacantes.filter(
    (vacante) =>
      vacante.ubicacion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vacante.empresa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { height: screenHeight }]}> 
      <Encabezado />
      {/*
      <Icon
        name="arrow-left"
        size={30}
        color="white"
        onPress={() => navigation.navigate("Inicio")}
        style={{ margin: 20 }}
      />
      */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar vacante por ubicacion o empresa"
          placeholderTextColor="#94949b"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {filteredVacantes.map((vacante) => (
            <Card key={vacante.id} style={styles.card} onPress={() => setSelectedVacante(vacante)}>
              <Card.Title
                title={vacante.empresa}
                subtitle={vacante.nombre}
                left={(props) => <Avatar.Icon {...props} icon="briefcase" backgroundColor="#6a0f49" />}
              />
              <Text style={styles.cardText}>Cargo: {vacante.cargo}</Text>
              <Text style={styles.cardText}>Salario: {vacante.salario}</Text>
              <Text style={styles.cardText}>Ubicacion: {vacante.ubicacion}</Text>
              <Text style={styles.cardText}>Requisitos: {vacante.requisitos}</Text>
            </Card>
          ))}
        </ScrollView>
      )}
      <Button mode="contained" style={styles.button} onPress={() => navigation.navigate("VacantesForm")}>
        <Text>Agregar Vacante</Text>
      </Button>
      <Modal visible={!!selectedVacante} transparent animationType="slide" onRequestClose={() => setSelectedVacante(null)}>
        <View style={styles.modalContainer}>
          {selectedVacante && (
            <View style={styles.modalContent}>
              <Text style={styles.cardTitle}>{selectedVacante.nombre}</Text>
              <Text style={styles.modalTitle}>Empresa:</Text>
              <Text style={styles.modalText}>{selectedVacante.empresa}</Text>
              <Text style={styles.modalTitle}>Cargo:</Text>
              <Text style={styles.modalText}>{selectedVacante.cargo}</Text>
              <Text style={styles.modalTitle}>Salario:</Text>
              <Text style={styles.modalText}>{selectedVacante.salario}</Text>
              <Text style={styles.modalTitle}>Ubicación:</Text>
              <Text style={styles.modalText}>{selectedVacante.ubicacion}</Text>
              <Text style={styles.modalTitle}>Contacto:</Text>
              <Text style={styles.modalText}>{selectedVacante.contacto}</Text>
              <Text style={styles.modalTitle}>Requisitos:</Text>
              <Text style={styles.modalText}>{selectedVacante.requisitos}</Text>
              <Text style={styles.modalTitle}>Experiencia:</Text>
              <Text style={styles.modalText}>{selectedVacante.experiencia}</Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.updateButton]}
                  onPress={() => {
                    navigation.navigate("VacantesForm", { vacante: selectedVacante });
                    setSelectedVacante(null);
                  }}
                >
                  <Text style={styles.buttonText}>Actualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.deleteButton]} onPress={() => deleteVacante(selectedVacante.id)}>
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedVacante(null)}>
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default Vacantes;