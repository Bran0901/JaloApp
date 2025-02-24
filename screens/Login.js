import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, Linking, TextInput, Alert, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from '../styles/styles';
import { db } from '../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

const screenHeight = Dimensions.get('window').height;

const openURL = (url) => {
  Linking.openURL(url).catch(err => console.error("No se pudo abrir la URL:", err));
};

const Login = () => {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [correo, setCorreo] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const validarCorreo = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegistro = async () => {
    if (!nombre || !fechaNacimiento || !correo) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
    if (!validarCorreo(correo)) {
      Alert.alert('Error', 'Por favor, ingrese un correo válido.');
      return;
    }
    try {
      await addDoc(collection(db, 'usuarios'), {
        nombre,
        fechaNacimiento: fechaNacimiento.toISOString().split('T')[0], // Guarda solo la fecha en formato YYYY-MM-DD
        correo,
      });
      setMensajeExito('Registro exitoso. ¡Bienvenido!');
      setNombre('');
      setFechaNacimiento(new Date());
      setCorreo('');
      setTimeout(() => setMensajeExito(''), 5000);
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario.');
    }
  };

  return (
    
    <View style={[styles.container, { height: screenHeight }]}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/jovenes.png')} style={styles.logo} />
        </View>
        <View style={styles.titleContainer}>
          <Image source={require('../assets/jaloLogo.png')} style={styles.titleLogo} />
        </View>
        <TouchableOpacity style={styles.imageContainer}>
          <Image source={require('../assets/usuario-seguro.png')} style={styles.userIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Bienvenido a la Jalo App</Text>
        <Image source={require('../assets/jaloLogo.png')} style={{ width: 100, height: 100, marginBottom: 40 }} />
        <Text style={styles.title}>INICIAR SESION</Text>

        {mensajeExito ? <Text style={{ color: 'white', marginBottom: 10, fontSize:20 }}>{mensajeExito}</Text> : null}

        <View style={styles.card}>
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
            <Text style={{ color: '#555' }}>{fechaNacimiento.toLocaleDateString()}</Text>
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
            onChangeText={setCorreo}
            keyboardType="email-address"
          />
          
          <TouchableOpacity onPress={handleRegistro} style={styles.boton}>
            <Text style={styles.textoBoton}>Registrar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <View style={styles.separator} />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => openURL('https://twitter.com')}>
          <Image source={require('../assets/x.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => openURL('https://facebook.com')}>
          <Image source={require('../assets/facebook.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => openURL('https://instagram.com')}>
          <Image source={require('../assets/instagram.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
