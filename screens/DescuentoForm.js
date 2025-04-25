import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
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

  // Estados para los campos
  const [empresa, setEmpresa] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [categoria, setCategoria] = useState(""); // Nuevo campo
  const [linkUbicacion, setLinkUbicacion] = useState(""); // Nuevo campo

  const navigation = useNavigation();

  const handleAgregarDescuento = async () => {
    if (
      !empresa.trim() ||
      !titulo.trim() ||
      !descripcion.trim() ||
      !direccion.trim() ||
      !categoria.trim() || // Validación del nuevo campo
      !linkUbicacion.trim() // Validación del nuevo campo
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
        categoria: categoria.trim(), // Nuevo campo
        linkUbicacion: linkUbicacion.trim(), // Nuevo campo
        fechaInicio: fechaInicio.toISOString().split("T")[0],
        fechaFin: fechaFin.toISOString().split("T")[0],
      });

      Alert.alert("Éxito", "Descuento agregado exitosamente.");

      // Limpiar los campos después de guardar
      setEmpresa("");
      setTitulo("");
      setDescripcion("");
      setDireccion("");
      setCategoria(""); // Nuevo campo
      setLinkUbicacion(""); // Nuevo campo
      setFechaInicio(new Date());
      setFechaFin(new Date());

      navigation.replace("Descuentos");
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
        <Encabezado />
        <View style={styles.formContainer}>
          <Text style={styles.title}>Agregar Descuento</Text>

          <Text style={styles.text}>Empresa</Text>
          <TextInput
            style={styles.input}
            value={empresa}
            onChangeText={setEmpresa}
            placeholder="Ingrese la empresa"
            placeholderTextColor="#94949b"
          />

          <Text style={styles.text}>Título</Text>
          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Ingrese el título"
            placeholderTextColor="#94949b"
          />

          <Text style={styles.text}>Descripción</Text>
          <TextInput
            style={styles.input}
            value={descripcion}
            onChangeText={setDescripcion}
            placeholder="Ingrese la descripción"
            placeholderTextColor="#94949b"
            multiline
          />

          <Text style={styles.text}>Categoría</Text>
          <TextInput
            style={styles.input}
            value={categoria}
            onChangeText={setCategoria}
            placeholder="Ingrese la categoria"
            placeholderTextColor="#94949b"
          />

          <Text style={styles.text}>Dirección</Text>
          <TextInput
            style={styles.input}
            value={direccion}
            onChangeText={setDireccion}
            placeholder="Ingrese la dirección"
            placeholderTextColor="#94949b"
          />

          <Text style={styles.text}>Link de Ubicación</Text>
          <TextInput
            style={styles.input}
            value={linkUbicacion}
            onChangeText={setLinkUbicacion}
            placeholder="Ingrese el enlace de ubicación"
            placeholderTextColor="#94949b"
          />

          <View style={styles.row}>
            <View>
              <Text style={styles.text}>Fecha de inicio</Text>
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
              <Text style={styles.text}>Fecha de fin</Text>
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

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAgregarDescuento}
            >
              <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
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
