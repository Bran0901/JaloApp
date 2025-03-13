import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import styles from "../styles/stylesPerfil/stylesPerfil";
import Encabezado from "../screens/Encabezado";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Importar Firebase Auth y Firestore
import { signOut } from "firebase/auth"; // Importar signOut de Firebase Auth
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const screenHeight = Dimensions.get("window").height;

const Perfil = () => {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("Cargando...");
  const [curp, setCurp] = useState("Cargando...");
  const [correo, setCorreo] = useState("Cargando...");

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
            setCorreo(data.correo || "No disponible");
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

  // ✅ Función para cerrar sesión
  const handleLogout = async () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Seguro que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Salir",
          onPress: async () => {
            try {
              await signOut(auth); // Cierra sesión
              navigation.replace("Login"); // Redirige a la pantalla de Login
            } catch (error) {
              console.error("Error al cerrar sesión:", error);
              Alert.alert("Error", "No se pudo cerrar sesión.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { height: screenHeight }]}>
      <Encabezado />
      {/*
      <Icon
        name="arrow-left"
        size={30}
        color="white"
        onPress={() => navigation.navigate("Inicio")}
        style={{ marginHorizontal: 20, marginVertical: 5 }}
      />
      */}

      <ScrollView>
        <View style={styles.general}>
          <Text style={styles.generalTitle}>INFORMACIÓN DEL PERFIL</Text>
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.cardTitle}>Información Personal</Text>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={styles.profileImage}
          />
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.info}>{nombre}</Text>

          <Text style={styles.label}>Sexo</Text>
          <Text style={styles.info}>Masculino</Text>

          <Text style={styles.label}>Edad</Text>
          <Text style={styles.info}>21</Text>

          <Text style={styles.label}>Curp</Text>
          <Text style={styles.info}>{curp}</Text>
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.cardTitle}>Datos de ubicación</Text>
          <Text style={styles.label}>Estado</Text>
          <Text style={styles.info}>Michoacán</Text>

          <Text style={styles.label}>Localidad</Text>
          <Text style={styles.info}>Morelia</Text>
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.cardTitle}>Datos de contacto</Text>
          <Text style={styles.label}>Teléfono</Text>
          <Text style={styles.info}>4435761427</Text>

          <Text style={styles.label}>Correo</Text>
          <Text style={styles.info}>{correo}</Text>
        </View>

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Modificar</Text>
          </TouchableOpacity>

          {/* 🔹 Botón de Cerrar Sesión con handleLogout */}
          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Perfil;
