import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
  StyleSheet,
  Alert,
} from "react-native";
import styles from "../styles/stylesTarjetaJoven";
import Encabezado from "../screens/Encabezado";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
const screenHeight = Dimensions.get("window").height;

const openURL = (url) => {
  Linking.openURL(url).catch((err) =>
    console.error("No se pudo abrir la URL:", err)
  );
};

const TarjetaJoven = () => {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("Cargando...");
  const [curp, setCurp] = useState("Cargando...");
  const [edad, setEdad] = useState("Cargando...");
  const [ocupacion, setOcupacion] = useState("Cargando...");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(collection(db, "usuarios"), user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setNombre(data.nombre || "No disponible");
            setCurp(data.curp || "No disponible");
            setOcupacion(data.ocupacion || "No disponible");

            if (data.fechaNacimiento) {
              const birthDate = new Date(data.fechaNacimiento);
              const today = new Date();
              const age =
                today.getFullYear() -
                birthDate.getFullYear() -
                (today <
                new Date(
                  today.getFullYear(),
                  birthDate.getMonth(),
                  birthDate.getDate()
                )
                  ? 1
                  : 0);
              setEdad(age);
            } else {
              setEdad("No disponible");
            }
          } else {
            console.log("No se encontró información del usuario.");
          }
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      } else {
        console.log("No hay usuario autenticado.");
      }
    };
    fetchUserData();
  }, []);

  const handleModify = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(collection(db, "usuarios"), user.uid);
        await updateDoc(docRef, { ocupacion: "Nueva ocupación" });
        setOcupacion("Nueva ocupación");
        Alert.alert("Éxito", "Ocupación actualizada correctamente.");
      } catch (error) {
        console.error("Error al actualizar ocupación:", error);
        Alert.alert("Error", "No se pudo actualizar la ocupación.");
      }
    }
  };

  return (
    <View style={[styles.container, { height: screenHeight }]}>
      <Encabezado />
      <Icon
        name="arrow-left"
        size={30}
        color="white"
        onPress={() => navigation.navigate("Inicio")}
        style={{ alignSelf: "left", marginHorizontal: 20, marginVertical: 5 }}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardContainer}>
          <Text style={styles.title}>FICHA DE JOVEN</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>{nombre}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>CURP:</Text>
            <Text style={styles.value}>{curp}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Edad:</Text>
            <Text style={styles.value}>{edad}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TarjetaJoven;
