import React, { useState, useEffect } from "react";
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
import { doc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Encabezado from "../screens/Encabezado";

const DescuentoFormAct = ({ route }) => {
  const { selectedItem } = route.params; // Recibe el descuento seleccionado del modal

  const [fechaInicio, setFechaInicio] = useState(
    new Date(selectedItem.fechaInicio)
  );
  const [fechaFin, setFechaFin] = useState(new Date(selectedItem.fechaFin));
  const [showInicio, setShowInicio] = useState(false);
  const [showFin, setShowFin] = useState(false);

  const [empresa, setEmpresa] = useState(selectedItem.empresa);
  const [titulo, setTitulo] = useState(selectedItem.titulo);
  const [descripcion, setDescripcion] = useState(selectedItem.descripcion);
  const [direccion, setDireccion] = useState(selectedItem.direccion);
  const [categoria, setCategoria] = useState(selectedItem.categoria); // Nuevo campo
  const [linkUbicacion, setLinkUbicacion] = useState(
    selectedItem.linkUbicacion
  ); // Nuevo campo

  const navigation = useNavigation();

  const handleActualizarDescuento = async () => {
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

    // Muestra el alert de confirmación
    Alert.alert(
      "Confirmación",
      "¿Está seguro que desea actualizar el descuento?",
      [
        {
          text: "Sí",
          onPress: async () => {
            try {
              const descuentoRef = doc(db, "descuentos", selectedItem.id);
              await updateDoc(descuentoRef, {
                empresa: empresa.trim(),
                titulo: titulo.trim(),
                descripcion: descripcion.trim(),
                direccion: direccion.trim(),
                fechaInicio: fechaInicio.toISOString().split("T")[0],
                fechaFin: fechaFin.toISOString().split("T")[0],
              });

              Alert.alert("Éxito", "Descuento actualizado exitosamente.");
              navigation.navigate("Descuentos");
            } catch (error) {
              console.error("Error al actualizar descuento:", error);
              Alert.alert(
                "Error",
                "Hubo un problema al actualizar el descuento."
              );
            }
          },
        },
        {
          text: "No",
          onPress: () => {},
        },
      ]
    );
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
          <Text style={styles.title}>Actualizar Descuento</Text>
          <Text style={styles.text}>Empresa</Text>
          <TextInput
            style={styles.input}
            value={empresa}
            onChangeText={setEmpresa}
          />

          <Text style={styles.text}>Título</Text>
          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
          />

          <Text style={styles.text}>Descripción</Text>
          <TextInput
            style={styles.input}
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
          />

          <Text style={styles.text}>Categoría</Text>
          <TextInput
            style={styles.input}
            value={categoria}
            onChangeText={setCategoria}
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

          <Text style={styles.text}>Dirección</Text>
          <TextInput
            style={styles.input}
            value={direccion}
            onChangeText={setDireccion}
          />

          <Text style={styles.text}>Link de Ubicación</Text>
          <TextInput
            style={styles.input}
            value={linkUbicacion}
            onChangeText={setLinkUbicacion}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleActualizarDescuento}
            >
              <Text style={styles.buttonText}>Actualizar</Text>
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

export default DescuentoFormAct;
