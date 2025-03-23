import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Alert,
  ActivityIndicator,
  Linking,
} from "react-native";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import styles from "../styles/stylesProgramas/stylesProgramas";
import { useNavigation } from "@react-navigation/native";
import Encabezado from "../screens/Encabezado";
import { Button, Card, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
      programa.empresa?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      programa.ubicacion?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { height: screenHeight }]}>
      {/* Encabezado */}
      <Encabezado />
      <View style={styles.general}>
        {/* Flecha a la izquierda */}
        <Icon
          name="arrow-left"
          size={30}
          color="black"
          onPress={() => navigation.navigate("Inicio")}
          style={styles.icon}
        />

        {/* Contenedor que centra el título */}
        <View style={styles.textContainer}>
          <Text style={styles.generalTitle}>PROGRAMAS</Text>
        </View>

        {/* Espacio vacío para mantener el título centrado */}
        <View style={{ width: 30 }} />
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Ubicacion o empresa"
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
                title={programa.empresa}
                subtitle={programa.nombre}
                left={(props) => (
                  <Avatar.Icon
                    {...props}
                    icon="check"
                    color="white"
                    backgroundColor="#6a0f49"
                  />
                )}
              />
              <Text style={styles.cardText}>{programa.descripcion}</Text>
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
                <Text style={styles.cardTitle}>{selectedPrograma.nombre}</Text>

                <Text style={styles.modalTitle}>Empresa:</Text>
                <Text style={styles.modalText}>{selectedPrograma.empresa}</Text>

                <Text style={styles.modalTitle}>Descripción:</Text>
                <Text style={styles.modalText}>
                  {selectedPrograma.descripcion}
                </Text>

                <Text style={styles.modalTitle}>Ubicación:</Text>
                <Text style={styles.modalText}>
                  {selectedPrograma.ubicacion}
                </Text>

                {/* NUEVOS CAMPOS */}
                {selectedPrograma.url && (
                  <>
                    <Text style={styles.modalTitle}>Enlace del Programa:</Text>
                    <TouchableOpacity
                      onPress={() => Linking.openURL(selectedPrograma.url)}
                    >
                      <Text
                        style={[
                          styles.modalText,
                          { color: "blue", textDecorationLine: "underline" },
                        ]}
                      >
                        {selectedPrograma.url}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}

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
