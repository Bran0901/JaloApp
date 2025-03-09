import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../styles/stylesDescuento/stylesForm";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Encabezado from "../screens/Encabezado";

const DescuentosForm = () => {
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [showInicio, setShowInicio] = useState(false);
  const [showFin, setShowFin] = useState(false);

  const [empresa, setEmpresa] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [direccion, setDireccion] = useState("");

  const navigation = useNavigation();

  const handleAgregarDescuento = async () => {
    if (
      !empresa.trim() ||
      !titulo.trim() ||
      !descripcion.trim() ||
      !direccion.trim()
    ) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    if (fechaFin < fechaInicio) {
      Alert.alert(
        "Error",
        "La fecha de fin no puede ser anterior a la fecha de inicio."
      );
      return;
    }

    try {
      await addDoc(collection(db, "descuentos"), {
        empresa: empresa.trim(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        direccion: direccion.trim(),
        fechaInicio: fechaInicio.toISOString().split("T")[0],
        fechaFin: fechaFin.toISOString().split("T")[0],
      });

      Alert.alert("Éxito", "Descuento agregado exitosamente.");
      setEmpresa("");
      setTitulo("");
      setDescripcion("");
      setDireccion("");
      setFechaInicio(new Date());
      setFechaFin(new Date());

      navigation.navigate("Descuentos");
    } catch (error) {
      console.error("Error al agregar descuento:", error);
      Alert.alert("Error", "Hubo un problema al agregar el descuento.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Encabezado */}
        <Encabezado />

        <View style={styles.formContainer}>
          <Text style={styles.title}>Agregar Descuento</Text>
          <Text>Empresa</Text>
          <TextInput
            style={styles.input}
            value={empresa}
            onChangeText={setEmpresa}
          />

          <Text>Título</Text>
          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
          />

          <Text>Descripción</Text>
          <TextInput
            style={styles.input}
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
          />

          <View style={styles.row}>
            <View>
              <Text>Fecha de inicio</Text>
              <TouchableOpacity
                onPress={() => setShowInicio(true)}
                style={styles.input}
              >
                <Text>{fechaInicio.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {showInicio && (
                <DateTimePicker
                  value={fechaInicio}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowInicio(false);
                    if (selectedDate) setFechaInicio(selectedDate);
                  }}
                />
              )}
            </View>

            <View>
              <Text>Fecha de fin</Text>
              <TouchableOpacity
                onPress={() => setShowFin(true)}
                style={styles.input}
              >
                <Text>{fechaFin.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {showFin && (
                <DateTimePicker
                  value={fechaFin}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowFin(false);
                    if (selectedDate) setFechaFin(selectedDate);
                  }}
                />
              )}
            </View>
          </View>

          <Text>Dirección</Text>
          <TextInput
            style={styles.input}
            value={direccion}
            onChangeText={setDireccion}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAgregarDescuento}
            >
              <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.navigate("Descuentos")}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DescuentosForm;
