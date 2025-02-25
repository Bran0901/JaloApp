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
import { db } from "../firebaseConfig"; // Asegúrate de tener la configuración de Firebase aquí
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

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

    try {
      await addDoc(collection(db, "descuentos"), {
        empresa: empresa.trim(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        direccion: direccion.trim(),
        fechaInicio: fechaInicio.toISOString().split("T")[0], // Formato de fecha en ISO
        fechaFin: fechaFin.toISOString().split("T")[0], // Formato de fecha en ISO
      });

      Alert.alert("Éxito", "Descuento agregado exitosamente.");
      setEmpresa("");
      setTitulo("");
      setDescripcion("");
      setDireccion("");
      setFechaInicio(new Date());
      setFechaFin(new Date());

      navigation.navigate("Descuentos"); // Redirige al listado de descuentos
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
        {/* Header */}
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

        {/* Formulario */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Agregar Descuento</Text>

          {/* Empresa */}
          <Text>Empresa</Text>
          <TextInput
            style={styles.input}
            value={empresa}
            onChangeText={setEmpresa}
          />

          {/* Título */}
          <Text>Título</Text>
          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
          />

          {/* Descripción */}
          <Text>Descripción</Text>
          <TextInput
            style={styles.input}
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
          />

          {/* Fecha de inicio */}
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

            {/* Fecha de fin */}
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

          {/* Dirección */}
          <Text>Dirección</Text>
          <TextInput
            style={styles.input}
            value={direccion}
            onChangeText={setDireccion}
          />

          {/* Botones */}
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
