import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image, 
  Linking, Dimensions, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform
} from 'react-native';
import { Card } from 'react-native-paper';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import styles from '../styles/stylesVacantes/stylesVacantesForm';

const screenWidth = Dimensions.get('window').width;

const openURL = (url) => {
  Linking.openURL(url).catch(err => console.error("No se pudo abrir la URL:", err));
};

const VacantesForm = ({ navigation, route }) => {
  const vacante = route.params?.vacante || null;
  const [nombre, setNombre] = useState('');
  const [cargo, setCargo] = useState('');
  const [salario, setSalario] = useState('');
  const [requisitos, setRequisitos] = useState('');
  const [experiencia, setExperiencia] = useState('');

  useEffect(() => {
    if (vacante) {
      setNombre(vacante.nombre);
      setCargo(vacante.cargo);
      setSalario(vacante.salario);
      setRequisitos(vacante.requisitos);
      setExperiencia(vacante.experiencia);
    }
  }, [vacante]);

  const handleGuardar = async () => {
    if (!nombre || !cargo || !salario || !requisitos || !experiencia) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      if (vacante) {
        await updateDoc(doc(db, 'vacantes', vacante.id), {
          nombre,
          cargo,
          salario,
          requisitos,
          experiencia,
        });
        Alert.alert('Éxito', 'Vacante actualizada correctamente.');
      } else {
        await addDoc(collection(db, 'vacantes'), {
          nombre,
          cargo,
          salario,
          requisitos,
          experiencia,
          fecha: new Date().toISOString(),
        });
        Alert.alert('Éxito', 'Vacante guardada correctamente.');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar la vacante:', error);
      Alert.alert('Error', 'No se pudo guardar la vacante.');
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
            <View style={styles.imageContainer}>
              <Image source={require('../assets/jovenes.png')} style={styles.logo} />
            </View>
            <View style={styles.titleContainer}>
              <Image source={require('../assets/jaloLogo.png')} style={styles.titleLogo} />
            </View>
            <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('Cuenta')}>
              <Image source={require('../assets/usuario-seguro.png')} style={styles.userIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.cardWrapper}>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.title}>{vacante ? 'Editar Vacante' : 'Agregar Vacante'}</Text>

                <ScrollView 
                  style={{ maxHeight: 350 }} 
                  contentContainerStyle={styles.scrollContent}
                  keyboardShouldPersistTaps="handled"
                >
                  <TextInput 
                    style={styles.input} 
                    placeholder="Nombre" 
                    value={nombre} 
                    onChangeText={setNombre} 
                    placeholderTextColor="#94949b"
                  />
                  <TextInput 
                    style={styles.input} 
                    placeholder="Cargo" 
                    value={cargo} 
                    onChangeText={setCargo} 
                    placeholderTextColor="#94949b"
                  />
                  <TextInput 
                    style={styles.input} 
                    placeholder="Salario" 
                    value={salario} 
                    onChangeText={setSalario}
                    keyboardType="numeric" 
                    placeholderTextColor="#94949b"
                  />
                  <TextInput 
                    style={styles.input} 
                    placeholder="Requisitos" 
                    value={requisitos} 
                    onChangeText={setRequisitos} 
                    placeholderTextColor="#94949b"
                  />
                  <TextInput 
                    style={styles.input} 
                    placeholder="Experiencia" 
                    value={experiencia} 
                    onChangeText={setExperiencia} 
                    placeholderTextColor="#94949b"
                  />
                </ScrollView>

                <TouchableOpacity style={styles.button} onPress={handleGuardar}>
                  <Text style={styles.buttonText}>{vacante ? 'Actualizar Vacante' : 'Guardar Vacante'}</Text>
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

export default VacantesForm;
