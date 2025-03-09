import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Linking,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Card } from "react-native-paper";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import styles from "../styles/stylesVacantes/stylesVacantesForm";
import Encabezado from "../screens/Encabezado";

const screenWidth = Dimensions.get("window").width;

const openURL = (url) => {
  Linking.openURL(url).catch((err) =>
    console.error("No se pudo abrir la URL:", err)
  );
};

const VacantesForm = ({ navigation, route }) => {
  const vacante = route.params?.vacante || null;
  const [nombre, setNombre] = useState("");
  const [cargo, setCargo] = useState("");
  const [salario, setSalario] = useState("");
  const [requisitos, setRequisitos] = useState("");
  const [experiencia, setExperiencia] = useState("");

  useEffect(() => {
    if (vacante) {
      setNombre(vacante.nombre);
      setCargo(vacante.cargo);
      setSalario(vacante.salario);
      setRequisitos(vacante.requisitos);
      setExperiencia(vacante.experiencia);
    }
  }, [vacante]);

  const handleGuardar = async () => {
    if (!nombre || !cargo || !salario || !requisitos || !experiencia) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    try {
      if (vacante) {
        await updateDoc(doc(db, "vacantes", vacante.id), {
          nombre,
          cargo,
          salario,
          requisitos,
          experiencia,
        });
        Alert.alert("Éxito", "Vacante actualizada correctamente.");
      } else {
        await addDoc(collection(db, "vacantes"), {
          nombre,
          cargo,
          salario: getFormattedSalary(), // Se almacena con formato $xx.xx
          requisitos,
          experiencia,
          fecha: new Date().toISOString(),
        });
        Alert.alert("Éxito", "Vacante guardada correctamente.");
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error al guardar la vacante:", error);
      Alert.alert("Error", "No se pudo guardar la vacante.");
    }
  };

  const formatMoney = (value) => {
    // Remueve caracteres que no sean números o punto
    let numericValue = value.replace(/[^0-9.]/g, "");

    // Permite solo un punto decimal
    const parts = numericValue.split(".");
    if (parts.length > 2) {
      numericValue = parts[0] + "." + parts.slice(1).join("");
    }

    return numericValue;
  };

  const handleSalarioChange = (text) => {
    setSalario(formatMoney(text));
  };

  // Formato final antes de guardar en Firebase
  const getFormattedSalary = () => {
    return salario ? `$${parseFloat(salario || 0).toFixed(2)}` : "";
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Encabezado */}
          <Encabezado />

          <View style={styles.cardWrapper}>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.title}>
                  {vacante ? "Editar Vacante" : "Agregar Vacante"}
                </Text>

                <ScrollView
                  style={{ maxHeight: 350 }}
                  contentContainerStyle={styles.scrollContent}
                  keyboardShouldPersistTaps="handled"
                >
                  <Text style={styles.title2}>Nombre</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ingresa el nombre"
                    value={nombre}
                    onChangeText={setNombre}
                    placeholderTextColor="#94949b"
                  />
                  <Text style={styles.title2}>Cargo</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ingresa el cargo"
                    value={cargo}
                    onChangeText={setCargo}
                    placeholderTextColor="#94949b"
                  />
                  <Text style={styles.title2}>Salario</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ingresa el salario"
                    value={salario}
                    onChangeText={handleSalarioChange}
                    keyboardType="numeric"
                    placeholderTextColor="#94949b"
                  />
                  <Text style={styles.title2}>Requisitos</Text>
                  <TextInput
                    style={styles.input2}
                    placeholder="Ingresa los requisitos"
                    value={requisitos}
                    onChangeText={setRequisitos}
                    placeholderTextColor="#94949b"
                    multiline={true} // Permite varias líneas
                    numberOfLines={4} // Máximo de líneas visibles
                    scrollEnabled={true} // Habilita el scroll interno
                  />
                  <Text style={styles.title2}>Experiencia</Text>
                  <TextInput
                    style={styles.input2}
                    placeholder="Ingresa la experiencia"
                    value={experiencia}
                    onChangeText={setExperiencia}
                    placeholderTextColor="#94949b"
                    multiline={true} // Permite varias líneas
                    numberOfLines={4} // Máximo de líneas visibles
                  />
                </ScrollView>

                <TouchableOpacity style={styles.button} onPress={handleGuardar}>
                  <Text style={styles.buttonText}>
                    {vacante ? "Actualizar Vacante" : "Guardar Vacante"}
                  </Text>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => openURL("https://twitter.com")}
            >
              <Image
                source={require("../assets/x.png")}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => openURL("https://facebook.com")}
            >
              <Image
                source={require("../assets/facebook.png")}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => openURL("https://instagram.com")}
            >
              <Image
                source={require("../assets/instagram.png")}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default VacantesForm;
