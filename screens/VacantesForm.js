import React, { useState, useEffect } from "react";
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
import { Card } from "react-native-paper";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import styles from "../styles/stylesVacantes/stylesVacantesForm";
import Encabezado from "../screens/Encabezado";

const VacantesForm = ({ navigation, route }) => {
  const vacante = route.params?.vacante || null;
  const [nombre, setNombre] = useState("");
  const [cargo, setCargo] = useState("");
  const [salario, setSalario] = useState("");
  const [requisitos, setRequisitos] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [contacto, setContacto] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [categoria, setCategoria] = useState("");
  const [linkUbicacion, setLinkUbicacion] = useState("");

  useEffect(() => {
    if (vacante) {
      setNombre(vacante.nombre);
      setCargo(vacante.cargo);
      setSalario(vacante.salario);
      setRequisitos(vacante.requisitos);
      setExperiencia(vacante.experiencia);
      setUbicacion(vacante.ubicacion);
      setContacto(vacante.contacto);
      setEmpresa(vacante.empresa);
      setCategoria(vacante.categoria || "");
      setLinkUbicacion(vacante.linkUbicacion || "");
    }
  }, [vacante]);

  const handleGuardar = async () => {
    if (
      !nombre ||
      !cargo ||
      !salario ||
      !requisitos ||
      !experiencia ||
      !ubicacion ||
      !contacto ||
      !empresa ||
      !categoria ||
      !linkUbicacion
    ) {
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
          ubicacion,
          contacto,
          empresa,
          categoria,
          linkUbicacion,
        });
        Alert.alert("Éxito", "Vacante actualizada correctamente.");
      } else {
        await addDoc(collection(db, "vacantes"), {
          nombre,
          cargo,
          salario: getFormattedSalary(),
          requisitos,
          experiencia,
          ubicacion,
          contacto,
          empresa,
          categoria,
          linkUbicacion,
          creadoPor: auth.currentUser.uid
        });
        Alert.alert("Éxito", "Vacante guardada correctamente.");
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error al guardar la vacante:", error);
      Alert.alert("Error", "No se pudo guardar la vacante.");
    }
  };

  const handleSalarioChange = (text) => {
    setSalario(text.replace(/[^0-9.]/g, ""));
  };

  const getFormattedSalary = () => {
    return salario ? `$${parseFloat(salario || 0).toFixed(2)}` : "";
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Encabezado />
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.title}>
                  {vacante ? "Editar Vacante" : "Agregar Vacante"}
                </Text>

                <Text style={styles.title2}>Empresa</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa el nombre de la empresa"
                  value={empresa}
                  onChangeText={setEmpresa}
                />

                <Text style={styles.title2}>Vacante</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa el nombre de la vacante"
                  value={nombre}
                  onChangeText={setNombre}
                />

                <Text style={styles.title2}>Categoría</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa la categoría"
                  value={categoria}
                  onChangeText={setCategoria}
                />

                <Text style={styles.title2}>Contacto</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa el contacto"
                  value={contacto}
                  onChangeText={setContacto}
                />

                <Text style={styles.title2}>Cargo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa el cargo"
                  value={cargo}
                  onChangeText={setCargo}
                />

                <Text style={styles.title2}>Salario</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa el salario"
                  value={salario}
                  onChangeText={handleSalarioChange}
                  keyboardType="numeric"
                />

                <Text style={styles.title2}>Requisitos</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa los requisitos"
                  value={requisitos}
                  onChangeText={setRequisitos}
                  multiline
                  numberOfLines={4}
                />

                <Text style={styles.title2}>Experiencia</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa la experiencia"
                  value={experiencia}
                  onChangeText={setExperiencia}
                  multiline
                  numberOfLines={4}
                />

                <Text style={styles.title2}>Ubicación</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa la ubicación"
                  value={ubicacion}
                  onChangeText={setUbicacion}
                />

                <Text style={styles.title2}>Link de Ubicación</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa el link de ubicación"
                  value={linkUbicacion}
                  onChangeText={setLinkUbicacion}
                />

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleGuardar}
                  >
                    <Text style={styles.buttonText}>
                      {vacante ? "Actualizar" : "Agregar"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VacantesForm;
