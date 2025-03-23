import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  Image,
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
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import Encabezado from "../screens/Encabezado";

export default function DescuentosScreen() {
  const [search, setSearch] = useState("");
  const [descuentos, setDescuentos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDescuentos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "descuentos"));
        const descuentosArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDescuentos(descuentosArray);
      } catch (error) {
        console.error("Error obteniendo descuentos:", error);
      }
    };
    fetchDescuentos();
  }, []);

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
              await addDoc(collection(db, "descuentoseliminados"), descuento);
              await deleteDoc(doc(db, "descuentos", id));
              setDescuentos(descuentos.filter((item) => item.id !== id));
              setModalVisible(false);
            } catch (error) {
              console.error("Error al eliminar el descuento:", error);
            }
          },
        },
      ]
    );
  };

  // Barra de búsqueda por texto y categoría
  const searchData = descuentos.filter(
    (item) =>
      [item.titulo, item.empresa, item.direccion].some((field) =>
        field?.toLowerCase().includes(search.toLowerCase())
      ) &&
      (!selectedCategory || item.categoria === selectedCategory)
  );

  return (
    <View style={styles.container}>
      {/* Encabezado Fijo */}
      <Encabezado />

      {/* Contenedor General */}
      <View style={styles.general}>
        {/* Flecha de navegación */}
        <Icon
          name="arrow-left"
          size={30}
          color="black"
          onPress={() => navigation.navigate("Inicio")}
          style={styles.icon}
        />

        {/* Título centrado */}
        <View style={styles.textContainer}>
          <Text style={styles.generalTitle}>DESCUENTOS</Text>
        </View>

        {/* Espacio para balancear la posición */}
        <View style={{ width: 30 }} />
      </View>

      {/* Barra de Búsqueda */}
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Empresa, estado o localidad"
          value={search}
          onChangeText={setSearch}
          style={styles.searchBar}
        />
      </View>

      {/* Lista de descuentos */}
      <FlatList
        data={searchData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(item);
              setModalVisible(true);
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
                  {item.fechaInicio} - {item.fechaFin}
                </Text>
                <Text style={styles.direccion}>{item.direccion}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />

      {/* Botón de agregar descuento */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate("DescuentoForm")}
        style={styles.button}
      >
        Agregar Descuento
      </Button>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {selectedItem && (
                <>
                  <Text style={styles.modalHeader}>{selectedItem.empresa}</Text>
                  <Text style={styles.modalTitle}>Descuento:</Text>
                  <Text style={styles.modalText}>{selectedItem.titulo}</Text>
                  <Text style={styles.modalTitle}>Descripción:</Text>
                  <Text style={styles.modalTextDesc}>
                    {selectedItem.descripcion}
                  </Text>
                  <Text style={styles.modalTitle}>Categoría:</Text>
                  <Text style={styles.modalTextDesc}>
                    {selectedItem.categoria}
                  </Text>
                  <Text style={styles.modalTitle}>Disponible desde:</Text>
                  <Text style={styles.modalText}>
                    {selectedItem.fechaInicio}
                  </Text>
                  <Text style={styles.modalTitle}>Hasta:</Text>
                  <Text style={styles.modalText}>{selectedItem.fechaFin}</Text>
                  <Text style={styles.modalTitle}>Dirección:</Text>
                  <Text style={styles.modalText}>{selectedItem.direccion}</Text>
                  <Text style={styles.modalTitle}>Link de ubicación:</Text>
                  <Text
                    style={styles.modalTextLink}
                    onPress={() => Linking.openURL(selectedItem.linkUbicacion)}
                  >
                    {selectedItem.linkUbicacion}
                  </Text>

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
