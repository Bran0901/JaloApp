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
import styles from "../styles/stylesEventos/stylesEventosForm";
import stylesForm from "../styles/stylesFormularios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Encabezado from "../screens/Encabezado";

const openURL = (url) => {
  Linking.openURL(url).catch((err) =>
    console.error("No se pudo abrir la URL:", err)
  );
};

const EventosForm = ({ navigation, route }) => {
  const evento = route.params?.evento || null;
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState(null);
  const [ubicacion, setUbicacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  useEffect(() => {
    if (evento) {
      setNombre(evento.nombre);
      setFecha(evento.fecha ? new Date(evento.fecha) : null);
      setUbicacion(evento.ubicacion);
      setDescripcion(evento.descripcion);
    }
  }, [evento]);

  const handleGuardar = async () => {
    if (!nombre || !fecha || !ubicacion || !descripcion) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    try {
      if (evento) {
        await updateDoc(doc(db, "eventos", evento.id), {
          nombre,
          fecha: fecha.toISOString().split("T")[0],
          ubicacion,
          descripcion,
        });
        Alert.alert("Éxito", "Evento actualizado correctamente.");
      } else {
        await addDoc(collection(db, "eventos"), {
          nombre,
          fecha: fecha.toISOString().split("T")[0],
          ubicacion,
          descripcion,
          creadoEn: new Date().toISOString(),
        });
        Alert.alert("Éxito", "Evento guardado correctamente.");
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error al guardar el evento:", error);
      Alert.alert("Error", "No se pudo guardar el evento.");
    }
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

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Card style={styles.formContainer}>
              <Card.Content>
                <Text style={styles.titleForm}>
                  {evento ? "Editar Evento" : "Agregar Evento"}
                </Text>

                <ScrollView
                  contentContainerStyle={styles.scrollContent}
                  keyboardShouldPersistTaps="handled"
                >
                  <Text style={styles.textForm}>Nombre</Text>
                  <TextInput
                    style={styles.inputForm}
                    placeholder="Ingrese el nombre"
                    value={nombre}
                    onChangeText={setNombre}
                  />

                  <Text style={styles.textForm}>Fecha</Text>
                  <TouchableOpacity
                    onPress={() => setMostrarCalendario(true)}
                    style={styles.inputForm}
                  >
                    <Text style={{ color: "#555" }}>
                      {moment(fecha).format("DD/MM/YYYY")}
                    </Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={mostrarCalendario}
                    mode="date"
                    onConfirm={(date) => {
                      setFecha(date);
                      setMostrarCalendario(false);
                    }}
                    onCancel={() => setMostrarCalendario(false)}
                  />

                  <Text style={styles.textForm}>Ubicación</Text>
                  <TextInput
                    style={styles.inputForm}
                    placeholder="Ingrese la ubicación"
                    value={ubicacion}
                    onChangeText={setUbicacion}
                  />

                  <Text style={styles.textForm}>Descripción</Text>
                  <TextInput
                    style={styles.inputForm}
                    placeholder="Ingrese la descripcion"
                    value={descripcion}
                    onChangeText={setDescripcion}
                    multiline
                    numberOfLines={4}
                    placeholderTextColor="#94949b"
                  />
                </ScrollView>
                <View style={styles.buttonContainerForm}>
                  <TouchableOpacity
                    style={styles.addButtonForm}
                    onPress={handleGuardar}
                  >
                    <Text style={styles.buttonTextForm}>
                      {evento ? "Actualizar" : "Agregar"}
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
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EventosForm;
