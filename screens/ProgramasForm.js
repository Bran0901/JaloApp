import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Card } from "react-native-paper";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import styles from "../styles/stylesProgramas/stylesProgramasForm";
import Encabezado from "../screens/Encabezado";

const ProgramasForm = ({ navigation, route }) => {
  const programa = route.params?.programa || null;
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [url, setUrl] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    if (programa) {
      setNombre(programa.nombre);
      setEmpresa(programa.empresa || "");
      setUrl(programa.url || "");
      setUbicacion(programa.ubicacion || "");
      setDescripcion(programa.descripcion || "");
      setCategoria(programa.categoria || "");
    }
  }, [programa]);

  const handleGuardar = async () => {
    if (
      !nombre ||
      !empresa ||
      !url ||
      !ubicacion ||
      !descripcion ||
      !categoria
    ) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    try {
      if (programa) {
        await updateDoc(doc(db, "programas", programa.id), {
          nombre,
          empresa,
          url,
          ubicacion,
          descripcion,
          categoria,
        });
        Alert.alert("Éxito", "Programa actualizado correctamente.");
      } else {
        await addDoc(collection(db, "programas"), {
          nombre,
          empresa,
          url,
          ubicacion,
          descripcion,
          categoria,
          creadoEn: new Date().toISOString(),
        });
        Alert.alert("Éxito", "Programa guardado correctamente.");
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error al guardar el programa:", error);
      Alert.alert("Error", "No se pudo guardar el programa.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <Encabezado />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Card style={styles.formContainer}>
              <Card.Content>
                <Text style={styles.titleForm}>
                  {programa ? "Editar Programa" : "Agregar Programa"}
                </Text>

                <Text style={styles.textForm}>Empresa</Text>
                <TextInput
                  style={styles.inputForm}
                  placeholder="Ingrese el nombre de la empresa"
                  value={empresa}
                  onChangeText={setEmpresa}
                />

                <Text style={styles.textForm}>Programa</Text>
                <TextInput
                  style={styles.inputForm}
                  placeholder="Ingrese el nombre del programa"
                  value={nombre}
                  onChangeText={setNombre}
                />

                <Text style={styles.textForm}>URL</Text>
                <TextInput
                  style={styles.inputForm}
                  placeholder="Ingrese la URL"
                  value={url}
                  onChangeText={setUrl}
                  keyboardType="url"
                  autoCapitalize="none"
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
                  placeholder="Ingrese la descripción"
                  value={descripcion}
                  onChangeText={setDescripcion}
                  multiline
                  numberOfLines={4}
                />

                <Text style={styles.textForm}>Categoría</Text>
                <TextInput
                  style={styles.inputForm}
                  placeholder="Ingrese la categoría"
                  value={categoria}
                  onChangeText={setCategoria}
                />

                <View style={styles.buttonContainerForm}>
                  <TouchableOpacity
                    style={styles.addButtonForm}
                    onPress={handleGuardar}
                  >
                    <Text style={styles.buttonTextForm}>
                      {programa ? "Actualizar" : "Agregar"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButtonForm}
                    onPress={() => navigation.navigate("Programas")}
                  >
                    <Text style={styles.buttonTextForm}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProgramasForm;
