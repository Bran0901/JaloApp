import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import styles from "../styles/stylesTarjetaJoven";
import Encabezado from "../screens/Encabezado";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

// Obtener la altura de la pantalla
const screenHeight = Dimensions.get("window").height;

const TarjetaJoven = () => {
  const navigation = useNavigation();
  // Estados para almacenar los datos del usuario
  const [nombre, setNombre] = useState("Cargando...");
  const [curp, setCurp] = useState("Cargando...");
  const [edad, setEdad] = useState("Cargando...");
  const [ocupacion, setOcupacion] = useState("Cargando...");
  const [userRole, setUserRole] = useState("Cargando...");

  useEffect(() => {
    // Función para obtener los datos del usuario desde Firestore
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
            setUserRole(data.role || "Sin rol");

            // Calcular la edad si la fecha de nacimiento está disponible
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

  return (
    <View style={[styles.container, { height: screenHeight }]}>
      {" "}
      {/* Contenedor principal con altura dinámica */}
      <Encabezado /> {/* Componente de encabezado */}
      <Icon
        name="arrow-left"
        size={30}
        color="white"
        onPress={() => navigation.goBack()} // Botón para regresar a la pantalla de inicio
        style={{
          alignSelf: "flex-start",
          marginHorizontal: 20,
          marginVertical: 5,
        }}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardContainer}>
          {" "}
          {/* Contenedor de la tarjeta de usuario */}
          <Text style={styles.title}>FICHA DE JOVEN</Text>
          <View style={styles.infoContainer}>
            {" "}
            {/* Sección de información del usuario */}
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
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Rol:</Text>
            <Text style={styles.value}>{userRole}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TarjetaJoven;
