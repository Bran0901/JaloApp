import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ToastAndroid,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import styles from "../styles/stylesCuenta"; // Asegúrate de tener los mismos estilos
import Encabezado from "../screens/Encabezado";

const CuentaForm = () => {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [correo, setCorreo] = useState("");
  const [curp, setCurp] = useState("");
  const [sexo, setSexo] = useState(""); // Sexo que puedes modificar
  const [telefono, setTelefono] = useState(""); // Teléfono
  const [estado, setEstado] = useState(""); // Estado
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, "usuarios", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setNombre(data.nombre || "");
            setCurp(data.curp || "");
            setCorreo(data.correo || "");
            setSexo(data.sexo || "");
            setEstado(data.estado || "");
            setTelefono(data.telefono || "");
            if (data.fechaNacimiento) {
              setFechaNacimiento(new Date(data.fechaNacimiento));
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

  const handleActualizar = useCallback(async () => {
    if (!nombre.trim() || !correo.trim() || !curp.trim()) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    const edad = moment().diff(moment(fechaNacimiento), "years");
    if (edad < 18) {
      Alert.alert("Error", "Debes ser mayor de 18 años.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "usuarios", user.uid);
        await updateDoc(docRef, {
          nombre: nombre.trim(),
          fechaNacimiento: fechaNacimiento.toISOString().split("T")[0],
          correo: correo.trim().toLowerCase(),
          curp: curp.trim().toUpperCase(),
          sexo,
          estado,
          telefono,
        });

        ToastAndroid.show("Perfil actualizado", ToastAndroid.LONG);
        navigation.goBack(); // Vuelve al perfil
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el perfil.");
      console.error("Error al actualizar el perfil:", error);
    }
  }, [nombre, fechaNacimiento, correo, curp, sexo, telefono, estado]);

  return (
    <View style={styles.container}>
      <Encabezado />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.card}>
              <Text style={styles.title}>EDITAR PERFIL</Text>
              <Text style={styles.title2}>Nombre completo</Text>
              <TextInput
                style={styles.input2}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
              />
              <Text style={styles.title2}>Fecha de nacimiento</Text>
              <TouchableOpacity
                onPress={() => setMostrarCalendario(true)}
                style={styles.input2}
              >
                <Text style={{ color: "#555" }}>
                  {moment(fechaNacimiento).format("DD/MM/YYYY")}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={mostrarCalendario}
                mode="date"
                onConfirm={(date) => {
                  setFechaNacimiento(date);
                  setMostrarCalendario(false);
                }}
                onCancel={() => setMostrarCalendario(false)}
              />
              <Text style={styles.title2}>Correo electrónico</Text>
              <TextInput
                style={styles.input2}
                placeholder="Correo Electrónico"
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.title2}>CURP</Text>
              <TextInput
                style={styles.input2}
                placeholder="CURP"
                value={curp}
                onChangeText={setCurp}
                autoCapitalize="characters"
                maxLength={18}
              />
              <Text style={styles.title2}>Sexo</Text>
              <TextInput
                style={styles.input2}
                placeholder="Sexo"
                value={sexo}
                onChangeText={setSexo}
              />
              <Text style={styles.title2}>Teléfono</Text>
              <TextInput
                style={styles.input2}
                placeholder="Teléfono"
                value={telefono}
                onChangeText={setTelefono}
                keyboardType="phone-pad"
              />
              <Text style={styles.title2}>Estado y localidad</Text>
              <TextInput
                style={styles.input2}
                placeholder="Estado"
                value={estado}
                onChangeText={setEstado}
              />
              <TouchableOpacity
                onPress={handleActualizar}
                style={styles.addButton}
              >
                <Text style={styles.buttonText}>Actualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.cancelButton}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CuentaForm;
