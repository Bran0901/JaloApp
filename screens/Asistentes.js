import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import styles from "../styles/stylesAsistentes/stylesAsistentes";
import Encabezado from "./Encabezado";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Card, Avatar } from "react-native-paper";

const screenHeight = Dimensions.get("window").height;

const Asistentes = () => {
  const navigation = useNavigation();
  const [asistentes, setAsistentes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "asistentes"),
      (snapshot) => {
        const asistentesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAsistentes(asistentesData);
        setLoading(false);
      },
      (error) => {
        console.error("Error obteniendo asistentes:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <Card style={styles.profileCard}>
      <Text style={styles.cardTitle}>{item.nombre}</Text>
      <Text style={styles.label}>Sexo:</Text>
      <Text style={styles.text}> {item.sexo}</Text>
      <Text style={styles.label}>Edad:</Text>
      <Text style={styles.text}> {item.edad}</Text>
      <Text style={styles.label}>Municipio: </Text>
      <Text style={styles.text}> {item.municipio}</Text>
      <Text style={styles.label}>Institución:</Text>
      <Text style={styles.text}> {item.institucion}</Text>
      <Text style={styles.label}>Correo:</Text>
      <Text style={styles.text}> {item.correo}</Text>
      <Text style={styles.label}>Teléfono: </Text>
      <Text style={styles.text}> {item.telefono}</Text>
      <Text style={styles.label}>Fecha: </Text>
      <Text style={styles.text}> {item.fecha}</Text>
    </Card>
  );

  return (
    <View style={[styles.container, { height: screenHeight }]}>
      <Encabezado />

      <View style={styles.general}>
        <Icon
          name="arrow-left"
          size={30}
          color="black"
          onPress={() => navigation.navigate("Eventos")}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.generalTitle}>ASISTENTES</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={asistentes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Asistentes;
