import React, { useState, useCallback } from "react";
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
import styles from "../styles/stylesCuenta";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import Encabezado from "../screens/Encabezado";

const Cuenta = () => {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [correo, setCorreo] = useState("");
  const [curp, setCurp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const validarCorreo = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validarCurp = (curp) => /^[A-Z0-9]{18}$/i.test(curp);

  const handleRegistro = useCallback(async () => {
    if (!nombre.trim() || !correo.trim() || !curp.trim() || !password || !confirmPassword) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
  
    if (!validarCorreo(correo)) {
      Alert.alert("Error", "Correo no válido.");
      return;
    }
  
    if (!validarCurp(curp)) {
      Alert.alert("Error", "El CURP debe tener 18 caracteres.");
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
  
    const edad = moment().diff(moment(fechaNacimiento), "years");
    if (edad < 18) {
      Alert.alert("Error", "Debes ser mayor de 18 años.");
      return;
    }
  
    try {
      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, correo.trim(), password.trim());
      const user = userCredential.user;
  
      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: nombre.trim(),
        fechaNacimiento: fechaNacimiento.toISOString().split("T")[0],
        correo: correo.trim().toLowerCase(),
        curp: curp.trim().toUpperCase(),
        uid: user.uid, // Guardamos el UID del usuario
      });
  
      ToastAndroid.show("Registro exitoso", ToastAndroid.LONG);
      setNombre("");
      setFechaNacimiento(new Date());
      setCorreo("");
      setCurp("");
      setPassword("");
      setConfirmPassword("");
  
      setTimeout(() => navigation.navigate("Login"), 2000);
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar el usuario.");
      console.error("Error en registro:", error);
    }
  }, [nombre, fechaNacimiento, correo, curp, password, confirmPassword]);


  return (
    <View style={styles.container}>
      <Encabezado />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <View style={styles.card}>
              <Text style={styles.title}>REGÍSTRATE</Text>
              <TextInput style={styles.input2} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
              <TouchableOpacity onPress={() => setMostrarCalendario(true)} style={styles.input2}>
                <Text style={{ color: "#555" }}>{moment(fechaNacimiento).format("DD/MM/YYYY")}</Text>
              </TouchableOpacity>
              <DateTimePickerModal isVisible={mostrarCalendario} mode="date" onConfirm={(date) => {
                setFechaNacimiento(date);
                setMostrarCalendario(false);
              }} onCancel={() => setMostrarCalendario(false)} />
              <TextInput style={styles.input2} placeholder="Correo Electrónico" value={correo} onChangeText={setCorreo} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
              <TextInput style={styles.input2} placeholder="CURP" value={curp} onChangeText={setCurp} autoCapitalize="characters" maxLength={18} />
              <TextInput style={styles.input2} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
              <TextInput style={styles.input2} placeholder="Confirmar Contraseña" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
              <TouchableOpacity onPress={handleRegistro} style={styles.addButton}><Text style={styles.buttonText}>Registrar</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Bienvenida")} style={styles.cancelButton}><Text style={styles.buttonText}>Cancelar</Text></TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Cuenta;
