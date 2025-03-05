import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image, 
  Linking, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform
} from 'react-native';
import { Card } from 'react-native-paper';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import styles from '../styles/stylesProgramas/stylesProgramasForm';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const openURL = (url) => {
  Linking.openURL(url).catch(err => console.error("No se pudo abrir la URL:", err));
};

const ProgramasForm = ({ navigation, route }) => {
  const programa = route.params?.programa || null;
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  useEffect(() => {
    if (programa) {
      setNombre(programa.nombre);
      setFecha(new Date(programa.fecha));
      setUbicacion(programa.ubicacion);
      setDescripcion(programa.descripcion);
    }
  }, [programa]);

  const handleGuardar = async () => {
    if (!nombre || !fecha || !ubicacion || !descripcion) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      if (programa) {
        await updateDoc(doc(db, 'programas', programa.id), {
          nombre,
          fecha: fecha.toISOString().split('T')[0],
          ubicacion,
          descripcion,
        });
        Alert.alert('Éxito', 'Programa actualizado correctamente.');
      } else {
        await addDoc(collection(db, 'programas'), {
          nombre,
          fecha: fecha.toISOString().split('T')[0],
          ubicacion,
          descripcion,
          creadoEn: new Date().toISOString(),
        });
        Alert.alert('Éxito', 'Programa guardado correctamente.');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar el programa:', error);
      Alert.alert('Error', 'No se pudo guardar el programa.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={require('../assets/jovenes.png')} style={styles.logo} />
            <Image source={require('../assets/jaloLogo.png')} style={styles.titleLogo} />
            <TouchableOpacity onPress={() => navigation.navigate('Cuenta')}>
              <Image source={require('../assets/usuario-seguro.png')} style={styles.userIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.cardWrapper}>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.title}>{programa ? 'Editar Programa' : 'Agregar Programa'}</Text>

                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                  <Text style={styles.title2}>Nombre</Text>
                  <TextInput style={styles.input} placeholder="Ingrese el nombre" value={nombre} onChangeText={setNombre} />
                  
                  <Text style={styles.title2}>Fecha</Text>
                  <TouchableOpacity onPress={() => setMostrarCalendario(true)} style={{ paddingTop: 10, width: '100%', height: 40, borderWidth: 1, borderRadius: 5, marginBottom: 20, backgroundColor: '#FFFFFF', alignItems:'center' }}>
                    <Text style={{ color: '#555' }}>{moment(fecha).format('DD/MM/YYYY')}</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal 
                    isVisible={mostrarCalendario} 
                    mode="date" 
                    onConfirm={(date) => {
                      setFecha(date);
                      setMostrarCalendario(false);
                    }}
                    onCancel={() => setMostrarCalendario(false)}
                  />
                  
                  <Text style={styles.title2}>Ubicación</Text>
                  <TextInput style={styles.input} placeholder="Ingrese la ubicación" value={ubicacion} onChangeText={setUbicacion} />
                  
                  <Text style={styles.title2}>Descripción</Text>
                  <TextInput style={styles.input2} placeholder="Ingrese la descripcion" value={descripcion} onChangeText={setDescripcion} multiline numberOfLines={4} 
                      placeholderTextColor="#94949b" />
                </ScrollView>

                <TouchableOpacity style={styles.button} onPress={handleGuardar}>
                  <Text style={styles.buttonText}>{programa ? 'Actualizar Programa' : 'Guardar Programa'}</Text>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          </View>

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

export default ProgramasForm;
