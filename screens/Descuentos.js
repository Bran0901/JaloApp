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
      {/* Encabezado */}
      <Encabezado />
      <Icon
        name="arrow-left"
        size={30}
        color="white"
        onPress={() => navigation.navigate("Inicio")}
        style={{ alignSelf: "left", marginHorizontal: 20, marginVertical: 5 }}
      />

      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Buscar por empresa, estado o localidad"
          value={search}
          onChangeText={setSearch}
          style={styles.searchBar}
        />
      </View>

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
                left={(props) => <Avatar.Text {...props} label="🛒" />}
              />
              <Card.Content>
                <Text style={styles.modalTitle}>{item.titulo}</Text>
                <Text style={styles.cardDesc}>{item.descripcion}</Text>
                <Text style={styles.discountDate}>
                  {item.fechaInicio} - {item.fechaFin}
                </Text>
                <Text>{item.direccion}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />

      <Button
        mode="contained"
        onPress={() => navigation.navigate("DescuentoForm")}
        style={styles.button}
      >
        Agregar Descuento
      </Button>

      {/* Modal de Detalles */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Text style={styles.modalHeader}>{selectedItem.empresa}</Text>
                <Text style={styles.modalTitle}>Descuento:</Text>
                <Text style={styles.modalText}>{selectedItem.titulo}</Text>
                <Text style={styles.modalTitle}>Descripción:</Text>
                <Text style={styles.cardDesc}>{selectedItem.descripcion}</Text>
                <Text style={styles.modalTitle}>Disponible desde:</Text>
                <Text style={styles.modalText}>{selectedItem.fechaInicio}</Text>
                <Text style={styles.modalTitle}>Hasta:</Text>
                <Text style={styles.modalText}>{selectedItem.fechaFin}</Text>
                <Text style={styles.modalTitle}>Dirección:</Text>
                <Text>{selectedItem.direccion}</Text>
                <Button
                  mode="contained"
                  onPress={() =>
                    navigation.navigate("DescuentoFormAct", { selectedItem })
                  }
                  style={styles.button}
                >
                  Actualizar Descuento
                </Button>
                <Button
                  mode="contained"
                  onPress={() =>
                    eliminarDescuento(selectedItem.id, selectedItem)
                  }
                  style={styles.button}
                >
                  Eliminar Descuento
                </Button>
                <Button
                  mode="contained"
                  onPress={() => setModalVisible(false)}
                  style={styles.button}
                >
                  Cerrar
                </Button>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
