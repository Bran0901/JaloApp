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
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import Encabezado from "../screens/Encabezado";
import Encabezado2 from "../screens/Encabezado2";

const Cuenta = () => {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [correo, setCorreo] = useState("");
  const [curp, setCurp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [invitationCode, setInvitationCode] = useState("");
  const [sexo, setSexo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [estado, setEstado] = useState("");

  const validarCorreo = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validarCurp = (curp) => /^[A-Z0-9]{18}$/i.test(curp);

  const handleRegistro = useCallback(async () => {
    if (
      !nombre.trim() ||
      !correo.trim() ||
      !curp.trim() ||
      !sexo.trim() ||
      !telefono.trim() ||
      !estado.trim() ||
      !password ||
      !confirmPassword ||
      !fechaNacimiento ||
      isNaN(new Date(fechaNacimiento))
    ) {
      Alert.alert(
        "Error",
        "Por favor, completa todos los campos obligatorios."
      );
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
      let userRole = "usuario"; // Rol por defecto

      if (invitationCode.trim()) {
        // Si el usuario ingresó un código, validarlo en Firestore
        const codeRef = doc(db, "codes", invitationCode.trim());
        const codeSnap = await getDoc(codeRef);

        if (!codeSnap.exists()) {
          Alert.alert("Error", "Código de invitación inválido.");
          return;
        }

        const codeData = codeSnap.data();
        if (codeData.used) {
          Alert.alert("Error", "El código de invitación ya fue usado.");
          return;
        }

        userRole = codeData.role; // Asignar el rol del código válido
        await updateDoc(codeRef, { used: true }); // Marcar código como usado
      }

      // 🔥 Registrar usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        correo.trim(),
        password.trim()
      );
      const user = userCredential.user;

      // 🚀 Guardar usuario en Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: nombre.trim(),
        fechaNacimiento: fechaNacimiento.toISOString().split("T")[0],
        correo: correo.trim().toLowerCase(),
        curp: curp.trim().toUpperCase(),
        uid: user.uid,
        role: userRole, // Guardar el rol
        sexo: sexo.trim(),
        telefono: telefono.trim(),
        estado: estado.trim(),
      });

      ToastAndroid.show("Registro exitoso", ToastAndroid.LONG);
      setNombre("");
      setFechaNacimiento(new Date());
      setCorreo("");
      setCurp("");
      setPassword("");
      setConfirmPassword("");
      setInvitationCode("");
      setSexo("");
      setTelefono("");
      setEstado("");

      setTimeout(() => navigation.replace("Login"), 2000);
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar el usuario.");
      console.error("Error en registro:", error);
    }
  }, [
    nombre,
    fechaNacimiento,
    correo,
    curp,
    password,
    confirmPassword,
    invitationCode,
  ]);

  return (
    <View style={styles.container}>
      <Encabezado2 />
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
              <Text style={styles.title}>REGÍSTRATE</Text>
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
              <Text style={styles.title2}>CURP</Text>
              <TextInput
                style={styles.input2}
                placeholder="CURP"
                value={curp}
                onChangeText={setCurp}
                autoCapitalize="characters"
                maxLength={18}
              />
              <Text style={styles.title2}>Género</Text>
              <TextInput
                style={styles.input2}
                placeholder="Masculino / Femenino / Otro"
                value={sexo}
                onChangeText={setSexo}
              />

              <Text style={styles.title2}>Estado</Text>
              <TextInput
                style={styles.input2}
                placeholder="Estado de residencia"
                value={estado}
                onChangeText={setEstado}
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
              <Text style={styles.title2}>Teléfono</Text>
              <TextInput
                style={styles.input2}
                placeholder="Teléfono"
                value={telefono}
                onChangeText={setTelefono}
                keyboardType="phone-pad"
              />
              <Text style={styles.title2}>Contraseña</Text>
              <TextInput
                style={styles.input2}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Text style={styles.title2}>Confirmar contraseña</Text>
              <TextInput
                style={styles.input2}
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />

              <Text style={styles.title2}>Código de invitación (opcional)</Text>
              <TextInput
                style={styles.input2}
                placeholder="Código de invitación"
                value={invitationCode}
                onChangeText={setInvitationCode}
                autoCapitalize="characters"
              />

              <TouchableOpacity
                onPress={handleRegistro}
                style={styles.addButton}
              >
                <Text style={styles.buttonText}>Registrar</Text>
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

export default Cuenta;
