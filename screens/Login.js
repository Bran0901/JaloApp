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

  const validarCorreo = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    if (!correo.trim()) {
      Alert.alert("Error", "Por favor, ingrese su correo.");
      return;
    }
    if (!validarCorreo(correo.trim())) {
      Alert.alert("Error", "Por favor, ingrese un correo válido.");
      return;
    }

    setCargando(true); // Activamos el indicador de carga
    try {
      const usuariosRef = collection(db, "usuarios");
      const q = query(usuariosRef, where("correo", "==", correo.trim()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setMensajeExito("Inicio de sesión exitoso");
        setCorreo("");
        setTimeout(() => {
          setMensajeExito("");
          navigation.navigate("Inicio"); // Asegura que el destino es correcto
        }, 2000);
      } else {
        Alert.alert("Error", "Correo no encontrado en la base de datos");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "No se pudo iniciar sesión");
    } finally {
      setCargando(false); // Asegura que el indicador de carga se desactive siempre
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
                value={correo}
                onChangeText={(text) => setCorreo(text.toLowerCase())}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Text style={styles.title2}>Contraseña</Text>
              <TextInput style={styles.input2} />

              {/* Indicador de carga o botón */}
              <View>
                {cargando ? (
                  <ActivityIndicator size="large" color="#fff" />
                ) : (
                  <TouchableOpacity
                    onPress={handleLogin}
                    style={[correo.trim() === "" && { opacity: 0.5 }]}
                    disabled={correo.trim() === ""}
                  >
                    <Text style={styles.textoBoton}>Iniciar Sesión</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>

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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
