import React, { useState } from "react";
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
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import styles from "../styles/styles";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Encabezado from "../screens/Encabezado";

const screenHeight = Dimensions.get("window").height;

const openURL = (url) => {
  Linking.openURL(url).catch((err) =>
    console.error("No se pudo abrir la URL:", err)
  );
};

const Login = () => {
  const navigation = useNavigation();
  const [correo, setCorreo] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [cargando, setCargando] = useState(false);
  const [correoOCurp, setCorreoOCurp] = useState("");
  const [contrasena, setContrasena] = useState("");

  const validarCorreo = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    if (!correoOCurp.trim() || !contrasena.trim()) {
      Alert.alert("Error", "Por favor, ingrese sus datos.");
      return;
    }

    // Validar el formato del correo
    if (!validarCorreo(correoOCurp.trim())) {
      Alert.alert("Error", "Por favor, ingrese un correo electrónico válido.");
      return;
    }

    setCargando(true);
    try {
      // Intentar iniciar sesión con Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        correoOCurp.trim(),
        contrasena.trim()
      );
      const user = userCredential.user;

      console.log("Usuario autenticado:", user);
      setMensajeExito("Inicio de sesión exitoso");

      setTimeout(() => {
        setMensajeExito("");
        navigation.navigate("Inicio");
      }, 2000);
    } catch (error) {
      Alert.alert("Error", "Correo o contraseña incorrectos.");
      console.error("Error de autenticación:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, { height: screenHeight }]}>
          {/* Encabezado */}
          <Encabezado />

          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.card}>
              <Text style={styles.title}>INICIAR SESIÓN</Text>

              {mensajeExito ? (
                <Text
                  style={{ color: "white", marginBottom: 10, fontSize: 20 }}
                >
                  {mensajeExito}
                </Text>
              ) : null}

              <Text style={styles.title2}>Correo Electrónico</Text>
              <TextInput
                style={styles.input2}
                value={correoOCurp}
                onChangeText={(text) => setCorreoOCurp(text.trim())}
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Text style={styles.title2}>Contraseña</Text>
              <TextInput
                style={styles.input2}
                value={contrasena}
                onChangeText={setContrasena}
                secureTextEntry
              />

              {/* Indicador de carga o botón */}
              <View>
                {cargando ? (
                  <ActivityIndicator size="large" color="#fff" />
                ) : (
                  <TouchableOpacity
                    onPress={handleLogin}
                    style={[
                      correoOCurp.trim() === "" || contrasena.trim() === ""
                        ? { opacity: 0.5 }
                        : {},
                    ]}
                    disabled={
                      correoOCurp.trim() === "" || contrasena.trim() === ""
                    }
                  >
                    <Text style={styles.textoBoton}>Iniciar Sesión</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>

          <View style={styles.separator} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
