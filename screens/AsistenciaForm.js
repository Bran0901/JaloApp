import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig"; // Asegúrate de tener los métodos de Firebase correctamente configurados
import { useRoute } from "@react-navigation/native";
import styles from "../styles/stylesAsistentes/stylesform";
import Encabezado from "../screens/Encabezado";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const RegistroAsistente = ({ route, navigation }) => {
  const navigationStack = useNavigation();
  const [nombre, setNombre] = useState("Cargando...");
  const [edad, setEdad] = useState("Cargando...");
  const [sexo, setSexo] = useState("Cargando...");
  const [municipio, setMunicipio] = useState("");
  const [institucion, setInstitucion] = useState("");
  const [correo, setCorreo] = useState("Cargando...");
  const [telefono, setTelefono] = useState("Cargando...");

  const { eventoNombre, eventoId } = route.params || {}; // Usar la prop `route`

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
            setCorreo(data.correo || "No disponible");
            setSexo(data.sexo || "No disponible");
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

  // Función para guardar el registro de un asistente
  const handleSaveAsistente = async () => {
    if (!municipio || !institucion) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        const asistenteData = {
          nombreEvento: eventoNombre,
          nombreCompleto: nombre,
          edad: edad,
          sexo: sexo,
          municipio: municipio,
          institucion: institucion,
          correo: correo,
          telefono: telefono,
          usuarioId: user.uid,
        };

        const asistenciaRef = collection(db, "asistentes");
        await setDoc(doc(asistenciaRef), asistenteData);

        Alert.alert("Éxito", "¡Te has registrado correctamente al evento!");
        navigation.goBack(); // Volver a la pantalla anterior
      }
    } catch (error) {
      console.error("Error al guardar la asistencia:", error);
      Alert.alert("Error", "No se pudo registrar tu asistencia.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={styles.container}>
          <Encabezado />
          <Card style={styles.formContainer}>
            <Card.Content>
              <Text style={styles.titleForm}>Asistencia a {eventoNombre}</Text>

              {/* Mostrar los datos de usuario */}
              <Text style={styles.textForm}>Nombre: </Text>
              <Text style={styles.inputForm}>{nombre}</Text>
              <Text style={styles.textForm}>Edad: </Text>
              <Text style={styles.inputForm}>{edad}</Text>
              <Text style={styles.textForm}>Sexo: </Text>
              <Text style={styles.inputForm}>{sexo}</Text>

              {/* Campos adicionales */}
              <Text style={styles.textForm}>Municipio: </Text>
              <TextInput
                placeholder="Municipio de origen"
                value={municipio}
                style={styles.inputForm}
                onChangeText={setMunicipio}
              />
              <Text style={styles.textForm}>Institución: </Text>
              <TextInput
                placeholder="Institución de procedencia"
                value={institucion}
                style={styles.inputForm}
                onChangeText={setInstitucion}
              />
              <Text style={styles.textForm}>Correo electrónico: </Text>
              <TextInput
                placeholder="Correo"
                value={correo}
                style={styles.inputForm}
                onChangeText={setCorreo}
              />
              <Text style={styles.textForm}>Teléfono: </Text>
              <TextInput
                placeholder="Teléfono"
                value={telefono}
                style={styles.inputForm}
                onChangeText={setTelefono}
              />

              {/* Botón para registrar al asistente */}
              <View style={styles.buttonContainerForm}>
                <TouchableOpacity
                  style={styles.addButtonForm}
                  onPress={handleSaveAsistente}
                >
                  <Text style={styles.buttonTextForm}>
                    Confirmar Asistencia
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButtonForm}
                  onPress={() => navigation.navigate("Eventos")}
                >
                  <Text style={styles.buttonTextForm}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default RegistroAsistente;
