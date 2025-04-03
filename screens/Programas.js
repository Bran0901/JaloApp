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
import { collection, onSnapshot, doc, deleteDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import styles from "../styles/stylesProgramas/stylesProgramas";
import { useNavigation } from "@react-navigation/native";
import Encabezado from "../screens/Encabezado";
import { Button, Card, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Obtiene la altura de la pantalla del dispositivo
const screenHeight = Dimensions.get("window").height;

const Programas = () => {
  const navigation = useNavigation();
  const [programas, setProgramas] = useState([]); // Estado para almacenar los programas
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const [selectedPrograma, setSelectedPrograma] = useState(null); // Estado para el programa seleccionado
  const [loading, setLoading] = useState(true); // Estado para indicar si los datos se están cargando
  const [userRole, setUserRole] = useState(null); // Estado para almacenar el rol del usuario

  // Función para obtener el rol del usuario desde Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "programas"), (snapshot) => {
      // Obtiene todos los programas de la base de datos
      const programasData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProgramas(programasData);
      setLoading(false); // Marca como no cargando
    });

    // Función para obtener el rol del usuario autenticado
    const fetchUserRole = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "usuarios", user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role); // Guarda el rol del usuario
          }
        }
      } catch (error) {
        console.error("Error obteniendo el rol del usuario:", error);
      }
    };

    fetchUserRole();
    return () => unsubscribe(); // Limpia la suscripción a los cambios de la base de datos
  }, []);

  // Función para eliminar un programa
  const deletePrograma = async (id) => {
    if (userRole !== "administrador") {
      // Si el usuario no es administrador, muestra un mensaje de error
      Alert.alert("Acceso denegado", "No tienes permisos para eliminar programas.");
      return;
    }
    // Confirma si el usuario está seguro de eliminar el programa
    Alert.alert("Confirmar Eliminación", "¿Estás seguro de que deseas eliminar este programa?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "programas", id)); // Elimina el programa de la base de datos
            Alert.alert("Eliminado", "El programa ha sido eliminado.");
            setSelectedPrograma(null); // Desselecciona el programa después de eliminarlo
          } catch (error) {
            console.error("Error al eliminar:", error);
            Alert.alert("Error", "No se pudo eliminar el programa.");
          }
        },
      },
    ]);
  };

  // Filtra los programas según la búsqueda del usuario
  const filteredProgramas = programas.filter(
    (programa) =>
      programa.empresa?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      programa.ubicacion?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { height: screenHeight }]}>
      <Encabezado />
      <View style={styles.general}>
        <Icon
          name="arrow-left"
          size={30}
          color="black"
          onPress={() => navigation.navigate("Inicio")} // Navega a la pantalla de inicio
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.generalTitle}>PROGRAMAS</Text>
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
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Muestra el indicador de carga mientras los datos se cargan */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingBottom: 100 }]}>
          {/* Muestra los programas filtrados */}
          {filteredProgramas.map((programa) => (
            <Card key={programa.id} style={styles.card} onPress={() => setSelectedPrograma(programa)}>
              <Card.Title
                title={programa.empresa}
                subtitle={programa.nombre}
                left={(props) => (
                  <Avatar.Icon {...props} icon="check" color="white" backgroundColor="#6a0f49" />
                )}
              />
              <Text style={styles.cardText}>{programa.descripcion}</Text>
              <Text style={styles.cardText}>{programa.ubicacion}</Text>
            </Card>
          ))}
        </ScrollView>
      )}

      {/* Botón para agregar programa, visible solo para usuarios con rol de empresa o administrador */}
      {(userRole === "empresa" || userRole === "administrador") && (
        <Button mode="contained" style={styles.button} onPress={() => navigation.navigate("ProgramasForm")}>
          <Text>Agregar Programa</Text>
        </Button>
      )}

      {/* Modal que muestra los detalles del programa seleccionado */}
      <Modal
        visible={!!selectedPrograma}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedPrograma(null)}
      >
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={() => setSelectedPrograma(null)}>
          <View style={styles.modalContent}>
            {selectedPrograma && (
              <>
                <Text style={styles.cardTitle}>{selectedPrograma.nombre}</Text>
                <Text style={styles.modalTitle}>Empresa:</Text>
                <Text style={styles.modalText}>{selectedPrograma.empresa}</Text>
                <Text style={styles.modalTitle}>Descripción:</Text>
                <Text style={styles.modalText}>{selectedPrograma.descripcion}</Text>
                <Text style={styles.modalTitle}>Ubicación:</Text>
                <Text style={styles.modalText}>{selectedPrograma.ubicacion}</Text>
                {/* Si hay un enlace, lo muestra como un enlace clickeable */}
                {selectedPrograma.url && (
                  <>
                    <Text style={styles.modalTitle}>Enlace del Programa:</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(selectedPrograma.url)}>
                      <Text style={[styles.modalText, { color: "blue", textDecorationLine: "underline" }]}>
                        {selectedPrograma.url}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
                {/* Botones de actualizar y eliminar solo para administradores */}
                {userRole === "administrador" && (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.updateButton]}
                      onPress={() => {
                        navigation.navigate("ProgramasForm", { programa: selectedPrograma });
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
                )}
                {/* Cierra el modal */}
                <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedPrograma(null)}>
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
