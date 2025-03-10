import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
  TextInput,
  Alert,
  StyleSheet,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from "../styles/stylesCuenta";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Encabezado from "../screens/Encabezado";

const screenHeight = Dimensions.get("window").height;

const openURL = (url) => {
  Linking.openURL(url).catch((err) =>
    console.error("No se pudo abrir la URL:", err)
  );
};

const Cuenta = () => {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [correo, setCorreo] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const validarCorreo = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegistro = useCallback(async () => {
    if (!nombre.trim() || !correo.trim()) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    if (!validarCorreo(correo)) {
      Alert.alert("Error", "Correo no válido.");
      return;
    }

    const edad = moment().diff(moment(fechaNacimiento), "years");
    if (edad < 18) {
      Alert.alert("Error", "Debes ser mayor de 18 años.");
      return;
    }

    try {
      await addDoc(collection(db, "usuarios"), {
        nombre: nombre.trim(),
        fechaNacimiento: fechaNacimiento.toISOString().split("T")[0],
        correo: correo.trim().toLowerCase(),
      });

      ToastAndroid.show("Registro exitoso", ToastAndroid.LONG);
      setNombre("");
      setFechaNacimiento(new Date());
      setCorreo("");

      setTimeout(() => navigation.navigate("Login"), 2000);
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar el usuario.");
    }
  }, [nombre, fechaNacimiento, correo]);

  return (
    <View style={[styles.container, { height: screenHeight }]}>
      {/* Encabezado */}
      <Encabezado />
      <View style={styles.separator} />

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
            {mensajeExito ? (
              <Text style={{ color: "white", marginBottom: 10, fontSize: 20 }}>
                {mensajeExito}
              </Text>
            ) : null}

            <View style={styles.card}>
              <Text style={styles.title}>REGÍSTRATE</Text>
              <Text style={styles.title2}>Nombre</Text>
              <TextInput
                style={styles.input2}
                placeholder="Ingrese su nombre"
                value={nombre}
                onChangeText={setNombre}
              />

              <Text style={styles.title2}>Fecha de Nacimiento</Text>
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

              <Text style={styles.title2}>Correo Electrónico</Text>
              <TextInput
                style={styles.input2}
                placeholder="Ingrese su correo"
                value={correo}
                onChangeText={(text) => setCorreo(text.trim().toLowerCase())}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TouchableOpacity
                onPress={handleRegistro}
                style={styles.addButton}
              >
                <Text style={styles.buttonText}>Registrar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Bienvenida")}
                style={styles.cancelButton}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View style={styles.separator} />

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
  );
};

export default Cuenta;
