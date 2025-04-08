import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
  Linking,
} from "react-native";
import { Card, Text, Button, Avatar } from "react-native-paper";
import styles from "../styles/stylesDescuento/stylesLista";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig"; // Importación de Firebase
import Encabezado from "../screens/Encabezado"; // Componente para el encabezado

export default function DescuentosScreen() {
  // Estados de la pantalla
  const [search, setSearch] = useState(""); // Estado para la barra de búsqueda
  const [descuentos, setDescuentos] = useState([]); // Estado para los descuentos
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedItem, setSelectedItem] = useState(null); // Estado para el descuento seleccionado
  const [userRole, setUserRole] = useState(null); // Estado para el rol del usuario
  const navigation = useNavigation(); // Hook para navegar entre pantallas
  const [categorias, setCategorias] = useState([]);

  // useEffect para obtener los descuentos y el rol del usuario
  useEffect(() => {
    const fetchDescuentos = async () => {
      try {
        // Obtiene todos los descuentos desde la base de datos de Firebase
        const querySnapshot = await getDocs(collection(db, "descuentos"));
        const descuentosArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDescuentos(descuentosArray);
        const categoriasUnicas = [
          ...new Set(descuentosArray.map((item) => item.categoria?.trim())),
        ];
        setCategorias(categoriasUnicas);
        // Establece los descuentos en el estado
      } catch (error) {
        console.error("Error obteniendo descuentos:", error); // Manejo de errores
      }
    };

    const fetchUserRole = async () => {
      try {
        // Obtiene el usuario autenticado
        const user = auth.currentUser;
        if (user) {
          // Si el usuario está autenticado, se obtiene su rol desde Firestore
          const userDoc = await getDoc(doc(db, "usuarios", user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role); // Establece el rol del usuario en el estado
          }
        }
      } catch (error) {
        console.error("Error obteniendo el rol del usuario:", error); // Manejo de errores
      }
    };

    fetchDescuentos(); // Llama a la función para obtener los descuentos
    fetchUserRole(); // Llama a la función para obtener el rol del usuario
  }, []); // Este efecto se ejecuta solo una vez al montar el componente

  // Función para eliminar un descuento
  const eliminarDescuento = async (id, descuento) => {
    Alert.alert(
      "Confirmación",
      "¿Está seguro de que desea eliminar el descuento?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              // Mueve el descuento a la colección de descuentos eliminados
              await addDoc(collection(db, "descuentoseliminados"), descuento);
              // Elimina el descuento de la colección de descuentos
              await deleteDoc(doc(db, "descuentos", id));
              setDescuentos(descuentos.filter((item) => item.id !== id)); // Actualiza la lista de descuentos
              setModalVisible(false); // Cierra el modal
            } catch (error) {
              console.error("Error al eliminar el descuento:", error); // Manejo de errores
            }
          },
        },
      ]
    );
  };

  /* Buscar descuentos
  const searchData = descuentos.filter((item) =>
    [item.titulo, item.empresa, item.direccion].some(
      (field) => field?.toLowerCase().includes(search.toLowerCase()) // Busca por título, empresa o dirección
    )
  );*/
  const [showCategorias, setShowCategorias] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const searchData = descuentos.filter((item) => {
    const coincideBusqueda = [item.titulo, item.empresa, item.direccion].some(
      (field) => field?.toLowerCase().includes(search.toLowerCase())
    );
    const coincideCategoria = categoriaSeleccionada
      ? item.categoria?.trim() === categoriaSeleccionada
      : true;
    return coincideBusqueda && coincideCategoria;
  });

  return (
    <View style={styles.container}>
      <Encabezado /> {/* Componente de encabezado */}
      {/* Barra de navegación y título */}
      <View style={styles.general}>
        <Icon
          name="arrow-left"
          size={30}
          color="black"
          onPress={() => navigation.navigate("Inicio")} // Navega a la pantalla de inicio
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.generalTitle}>DESCUENTOS</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>
      {/* Barra de búsqueda */}
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Empresa, estado o localidad"
          value={search}
          onChangeText={setSearch} // Actualiza el estado con el texto de búsqueda
          style={styles.searchBar}
        />
      </View>
      <View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
        <Button
          onPress={() => setShowCategorias(!showCategorias)}
          style={styles.buttonF}
          mode="contained"
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Filtrar por categoría
          </Text>
        </Button>
        {showCategorias &&
          categorias.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={{
                padding: 10,
                backgroundColor: "#f2f2f2",
                borderRadius: 5,
                marginBottom: 5,
              }}
              onPress={() => setCategoriaSeleccionada(cat)}
            >
              <Text style={{ color: "#333" }}>{cat}</Text>
            </TouchableOpacity>
          ))}
        ,
        {categoriaSeleccionada && (
          <Button
            onPress={() => setCategoriaSeleccionada(null)}
            style={styles.buttonQ}
            mode="contained"
          >
            <Text style={{ color: "#fff" }}>Quitar filtros</Text>
          </Button>
        )}
      </View>
      {/* Lista de descuentos */}
      <FlatList
        data={searchData} // Muestra los descuentos filtrados por la búsqueda
        keyExtractor={(item) => item.id} // Establece el ID como la clave
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(item); // Establece el descuento seleccionado
              setModalVisible(true); // Abre el modal para mostrar los detalles
            }}
          >
            <Card style={styles.card}>
              <Card.Title
                title={item.empresa}
                left={(props) => (
                  <Avatar.Icon
                    {...props}
                    icon="cart"
                    color="white"
                    backgroundColor="#6a0f49"
                  />
                )}
              />
              <Card.Content>
                <Text style={styles.modalTitle2}>{item.titulo}</Text>
                <Text style={styles.cardDesc}>{item.descripcion}</Text>
                <Text style={styles.discountDate}>
                  {item.fechaInicio} - {item.fechaFin}{" "}
                  {/* Muestra las fechas de inicio y fin */}
                </Text>
                <Text style={styles.direccion}>{item.direccion}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
      {/* Botón para agregar un descuento, visible solo para empresas o administradores */}
      {(userRole === "empresa" || userRole === "administrador") && (
        <Button
          mode="contained"
          onPress={() => navigation.navigate("DescuentoForm")}
          style={styles.button}
        >
          Agregar Descuento
        </Button>
      )}
      {/* Modal para mostrar los detalles de un descuento */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)} // Cierra el modal al presionar fuera
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {selectedItem && (
                <>
                  {/* Detalles del descuento */}
                  <Text style={styles.modalHeader}>{selectedItem.empresa}</Text>
                  <Text style={styles.modalTitle}>Descuento:</Text>
                  <Text style={styles.modalText}>{selectedItem.titulo}</Text>
                  <Text style={styles.modalTitle}>Descripción:</Text>
                  <Text style={styles.modalTextDesc}>
                    {selectedItem.descripcion}
                  </Text>
                  <Text style={styles.modalTitle}>Dirección:</Text>
                  <Text style={styles.modalText}>{selectedItem.direccion}</Text>
                  <Text style={styles.modalTitle}>Link de ubicación:</Text>
                  <Text
                    style={styles.modalTextLink}
                    onPress={() => Linking.openURL(selectedItem.linkUbicacion)} // Abre el link de ubicación
                  >
                    {selectedItem.linkUbicacion}
                  </Text>

                  {/* Botones solo visibles para administradores */}
                  {userRole === "administrador" && (
                    <View style={styles.buttonContainer}>
                      <Button
                        mode="contained"
                        onPress={() =>
                          navigation.navigate("DescuentoFormAct", {
                            selectedItem,
                          })
                        }
                        style={styles.button}
                      >
                        Actualizar
                      </Button>
                      <Button
                        mode="contained"
                        onPress={() =>
                          eliminarDescuento(selectedItem.id, selectedItem)
                        }
                        style={styles.button}
                      >
                        Eliminar
                      </Button>
                    </View>
                  )}

                  {/* Botón para cerrar el modal */}
                  <Button
                    mode="contained"
                    onPress={() => setModalVisible(false)}
                    style={styles.button}
                  >
                    Cerrar
                  </Button>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
