import React, { useState } from 'react';
import { 
  View, Text, Image, TouchableOpacity, ScrollView, Dimensions, 
  Linking, TextInput, Alert, KeyboardAvoidingView, Platform, 
  Keyboard, TouchableWithoutFeedback, ActivityIndicator 
} from 'react-native';
import styles from '../styles/styles';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;

const openURL = (url) => {
  Linking.openURL(url).catch(err => console.error("No se pudo abrir la URL:", err));
};

const Login = () => {
  const navigation = useNavigation();
  const [correo, setCorreo] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [cargando, setCargando] = useState(false);

  const validarCorreo = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    if (!correo.trim()) {
      Alert.alert('Error', 'Por favor, ingrese su correo.');
      return;
    }
    if (!validarCorreo(correo.trim())) {
      Alert.alert('Error', 'Por favor, ingrese un correo válido.');
      return;
    }
  
    setCargando(true); // Activamos el indicador de carga
    try {
      const usuariosRef = collection(db, 'usuarios');
      const q = query(usuariosRef, where("correo", "==", correo.trim()));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        setMensajeExito('Inicio de sesión exitoso');
        setCorreo('');
        setTimeout(() => {
          setMensajeExito('');
          navigation.navigate('Inicio'); // Asegura que el destino es correcto
        }, 2000);
      } else {
        Alert.alert('Error', 'Correo no encontrado en la base de datos');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo iniciar sesión');
    } finally {
      setCargando(false); // Asegura que el indicador de carga se desactive siempre
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, { height: screenHeight }]}>
          
          <View style={styles.header}>
            <View style={styles.imageContainer}>
              <Image source={require('../assets/jovenes.png')} style={styles.logo} />
            </View>
            <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.navigate('Inicio')}>
              <Image source={require('../assets/jaloLogo.png')} style={styles.titleLogo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageContainer}>
              <Image source={require('../assets/usuario-seguro.png')} style={styles.userIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Bienvenido a la Jalo App</Text>
            <Image source={require('../assets/jaloLogo.png')} style={{ width: 100, height: 100, marginBottom: 40 }} />
            <Text style={styles.title}>INICIAR SESIÓN</Text>

            {mensajeExito ? <Text style={{ color: 'white', marginBottom: 10, fontSize: 20 }}>{mensajeExito}</Text> : null}

            <View style={styles.card}>
              <Text style={styles.title2}>Correo Electrónico</Text>
              <TextInput 
                style={styles.input2}
                placeholder="Ingrese su correo"
                value={correo}
                onChangeText={(text) => setCorreo(text.toLowerCase())}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false} 
              />

              {/* Indicador de carga o botón */}
              <View>
                {cargando ? (
                  <ActivityIndicator size="large" color="#fff" />
                ) : (
                  <TouchableOpacity 
                    onPress={handleLogin} 
                    style={[styles.boton, correo.trim() === '' && { opacity: 0.5 }]}
                    disabled={correo.trim() === ''}
                  >
                    <Text style={styles.textoBoton}>Iniciar Sesión</Text>
                  </TouchableOpacity>
                )}
              </View>
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
