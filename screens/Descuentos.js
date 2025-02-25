import React, { useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Card, Text, Button, Avatar } from "react-native-paper";
import styles from "../styles/stylesDescuento/stylesLista"; // Importamos los nuevos estilos
import { useNavigation } from "@react-navigation/native";

const descuentos = [
  {
    id: "1",
    title: "Cinepolis",
    desc: "2x1 En boleto general",
    date: "Todos los jueves hasta el 30 de abril",
    icon: "🛒",
  },
  {
    id: "2",
    title: "Pizza Little Caesars",
    desc: "30% de descuento en pizzas",
    date: "Todos los días hasta el 03 de mayo",
    icon: "🛒",
  },
  {
    id: "3",
    title: "Tiendas 3B",
    desc: "20% de descuento en productos",
    date: "Todos los días hasta el 12 de julio",
    icon: "🛒",
  },
  {
    id: "4",
    title: "Sephora MakeUp",
    desc: "30% de descuento en maquillaje general",
    date: "Todos los días hasta el 05 de mayo",
    icon: "🛒",
  },
  {
    id: "5",
    title: "KFC",
    desc: "10% en alitas de pollo",
    date: "Todos los días hasta el 31 de diciembre",
    icon: "🛒",
  },
  {
    id: "6",
    title: "Starbucks",
    desc: "30% de descuento en frappes",
    date: "Todos los días hasta el 09 de enero",
    icon: "🛒",
  },
];

export default function DescuentosScreen() {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredData = descuentos.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/jovenes.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.titleContainer}>
          <Image
            source={require("../assets/jaloLogo.png")}
            style={styles.titleLogo}
          />
        </View>
        <TouchableOpacity style={styles.imageContainer}>
          <Image
            source={require("../assets/usuario-seguro.png")}
            style={styles.userIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />

      {/* Barra de búsqueda */}
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Buscar"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        <Button mode="contained" style={styles.filterButton}>
          Filtrar ▼
        </Button>
      </View>

      {/* Lista de descuentos */}
      <FlatList
        data={filteredData}
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
                title={item.title}
                left={(props) => <Avatar.Text {...props} label={item.icon} />}
              />
              <Card.Content>
                <Text>{item.desc}</Text>
                <Text style={styles.discountDate}>{item.date}</Text>
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

      {/* Modal de información */}
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
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                <Text style={styles.modalText}>{selectedItem.desc}</Text>
                <Text style={styles.discountDate}>{selectedItem.date}</Text>
                <Button
                  mode="contained"
                  onPress={() => setModalVisible(false)}
                  style={styles.modalCloseButton}
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
