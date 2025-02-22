import React, { useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { Card, Text, Button, Avatar } from "react-native-paper";
import styles from "../styles/styles"; // Asegúrate de importar tus estilos

const screenHeight = Dimensions.get("window").height;

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

  return (
    <View style={{ flex: 1, backgroundColor: "#68004d" }}>
      {" "}
      {/* Fondo totalmente guinda */}
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
      {/* Contenido de Descuentos */}
      <View style={{ flex: 1 }}>
        {" "}
        {/* Se eliminó padding innecesario */}
        {/* Barra de búsqueda */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            paddingHorizontal: 16,
          }}
        >
          <TextInput
            placeholder="Buscar"
            value={search}
            onChangeText={setSearch}
            style={{
              flex: 1,
              backgroundColor: "#eee",
              padding: 10,
              borderRadius: 20,
              marginRight: 10,
            }}
          />
          <Button mode="contained" style={{ backgroundColor: "#880E4F" }}>
            Filtrar ▼
          </Button>
        </View>
        {/* Lista de descuentos */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16 }} // Evita márgenes blancos
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedItem(item);
                setModalVisible(true);
              }}
            >
              <Card style={{ marginBottom: 10, padding: 10 }}>
                <Card.Title
                  title={item.title}
                  left={(props) => <Avatar.Text {...props} label={item.icon} />}
                />
                <Card.Content>
                  <Text>{item.desc}</Text>
                  <Text style={{ color: "gray" }}>{item.date}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* Modal de información */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "80%",
            }}
          >
            {selectedItem && (
              <>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {selectedItem.title}
                </Text>
                <Text style={{ marginTop: 10 }}>{selectedItem.desc}</Text>
                <Text style={{ color: "gray", marginTop: 5 }}>
                  {selectedItem.date}
                </Text>
                <Button
                  mode="contained"
                  onPress={() => setModalVisible(false)}
                  style={{ marginTop: 20 }}
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
