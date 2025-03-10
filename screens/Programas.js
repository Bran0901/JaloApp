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
import styles from "../styles/stylesProgramas/stylesProgramas";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Encabezado from "../screens/Encabezado";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Card, Avatar } from "react-native-paper";
const screenHeight = Dimensions.get("window").height;

const Programas = () => {
  const navigation = useNavigation();
  const [programas, setProgramas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrograma, setSelectedPrograma] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "programas"),
      (snapshot) => {
        const programasData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProgramas(programasData);
        setLoading(false);
      },
      (error) => {
        console.error("Error obteniendo programas:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const deletePrograma = async (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que deseas eliminar este programa?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "programas", id));
              Alert.alert("Eliminado", "El programa ha sido eliminado.");
              setSelectedPrograma(null);
            } catch (error) {
              console.error("Error al eliminar:", error);
              Alert.alert("Error", "No se pudo eliminar el programa.");
            }
          },
        },
      ]
    );
  };

  const filteredProgramas = programas.filter(
    (programa) =>
      programa.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      programa.descripcion?.toLowerCase().includes(searchQuery.toLowerCase())
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
          placeholder="Buscar programa por nombre"
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
          {filteredProgramas.map((programa) => (
            <Card
              key={programa.id}
              style={styles.card}
              onPress={() => setSelectedPrograma(programa)}
            >
              <Card.Title
                title={"Programa Gubernamental"}
                left={(props) => (
                  <Avatar.Icon
                    {...props}
                    icon="check"
                    color="white"
                    backgroundColor="#6a0f49"
                  />
                )}
              />
              <Text style={styles.cardTitle}>{programa.nombre}</Text>
              <Text style={styles.cardTextDesc}>{programa.descripcion}</Text>
              <Text style={styles.cardDate}>
                {moment(programa.fecha).format("DD/MM/YYYY")}
              </Text>
              <Text style={styles.cardText}>{programa.ubicacion}</Text>
            </Card>
          ))}
        </ScrollView>
      )}

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate("ProgramasForm")}
      >
        <Text>Agregar Programa</Text>
      </Button>

      {/* Modal para mostrar detalles del programa seleccionado */}
      <Modal
        visible={!!selectedPrograma}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedPrograma(null)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setSelectedPrograma(null)}
        >
          <View style={styles.modalContent}>
            {selectedPrograma && (
              <>
                <Text style={styles.modalHeader}>
                  {selectedPrograma.nombre}
                </Text>
                <Text style={styles.modalTitle}>Descripción:</Text>
                <Text style={styles.modalText}>
                  {selectedPrograma.descripcion}
                </Text>
                <Text style={styles.modalTitle}>Fecha:</Text>
                <Text style={styles.modalText}>
                  {moment(selectedPrograma.fecha).format("DD/MM/YYYY")}
                </Text>
                <Text style={styles.modalTitle}>Ubicación:</Text>
                <Text style={styles.modalText}>
                  {selectedPrograma.ubicacion}
                </Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.updateButton]}
                    onPress={() => {
                      navigation.navigate("ProgramasForm", {
                        programa: selectedPrograma,
                      });
                      setSelectedPrograma(null);
                    }}
                  >
                    <Text style={styles.buttonText}>Actualizar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.modalButton, styles.deleteButton]}
                    onPress={() => deletePrograma(selectedPrograma.id)}
                  >
                    <Text style={styles.buttonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedPrograma(null)}
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

export default Programas;
