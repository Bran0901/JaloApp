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

// Obtener la altura de la pantalla
const screenHeight = Dimensions.get("window").height;

const Perfil = () => {
  const navigation = useNavigation();

  // Estados para almacenar los datos del usuario
  const [nombre, setNombre] = useState("Cargando...");
  const [curp, setCurp] = useState("Cargando...");
  const [correo, setCorreo] = useState("Cargando...");
  const [sexo, setSexo] = useState("Cargando...");
  const [edad, setEdad] = useState("Cargando...");
  const [estado, setEstado] = useState("Cargando...");
  const [telefono, setTelefono] = useState("Cargando...");

  // useEffect para obtener los datos del usuario desde Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser; // Obtener el usuario autenticado
      if (user) {
        try {
          const docRef = doc(collection(db, "usuarios"), user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();

            // Guardar los datos del usuario en los estados correspondientes
            setNombre(data.nombre || "No disponible");
            setCurp(data.curp || "No disponible");
            setCorreo(data.correo || "No disponible");
            setSexo(data.sexo || "No disponible");
            setEstado(data.estado || "No disponible");
            setTelefono(data.telefono || "No disponible");

            // Calcular edad a partir de la fecha de nacimiento
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

  // Función para cerrar sesión
  const handleLogout = async () => {
    Alert.alert("Cerrar Sesión", "¿Seguro que quieres cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Salir",
        onPress: async () => {
          try {
            await signOut(auth); // Cierra sesión en Firebase
            navigation.reset({
              index: 0, // Establece la pantalla inicial en el índice 0
              routes: [{ name: "Bienvenida" }], // Ruta a la pantalla de Bienvenida
            });
          } catch (error) {
            console.error("Error al cerrar sesión:", error);
            Alert.alert("Error", "No se pudo cerrar sesión.");
          }
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { height: screenHeight }]}>
      {" "}
      {/* Contenedor principal con altura dinámica */}
      <Encabezado /> {/* Componente de encabezado */}
      <ScrollView>
        <View style={styles.general}>
          {/* Flecha a la izquierda para regresar */}
          <Icon
            name="arrow-left"
            size={30}
            color="black"
            onPress={() => navigation.goBack()} // Navegar a la pantalla de inicio
            style={styles.icon}
          />

          {/* Contenedor que centra el título */}
          <View style={styles.textContainer}>
            <Text style={styles.generalTitle}>PERFIL</Text>
          </View>

          {/* Espacio vacío para mantener el título centrado */}
          <View style={{ width: 30 }} />
        </View>

        {/* Tarjeta de información personal */}
        <View style={styles.profileCard}>
          <Text style={styles.cardTitle}>Información Personal</Text>

          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.info}>{nombre}</Text>

          <Text style={styles.label}>Sexo</Text>
          <Text style={styles.info}>{sexo}</Text>

          <Text style={styles.label}>Edad</Text>
          <Text style={styles.info}>{edad}</Text>

          <Text style={styles.label}>Curp</Text>
          <Text style={styles.info}>{curp}</Text>
        </View>

        {/* Tarjeta con datos de ubicación */}
        <View style={styles.profileCard}>
          <Text style={styles.cardTitle}>Datos de ubicación</Text>
          <Text style={styles.label}>Estado y localidad</Text>
          <Text style={styles.info}>{estado}</Text>
        </View>

        {/* Tarjeta con datos de contacto */}
        <View style={styles.profileCard}>
          <Text style={styles.cardTitle}>Datos de contacto</Text>
          <Text style={styles.label}>Teléfono</Text>
          <Text style={styles.info}>{telefono}</Text>

          <Text style={styles.label}>Correo</Text>
          <Text style={styles.info}>{correo}</Text>
        </View>

        {/* Contenedor con botones */}
        <View style={styles.buttonContainer}>
          {/* Botón para modificar la cuenta */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CuentaForm")}
          >
            <Text style={styles.buttonText}>Modificar</Text>
          </TouchableOpacity>

          {/* Botón para cerrar sesión */}
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
