import React, { useEffect, useState } from 'react';
import { 
  View, Text, Image, TouchableOpacity, ScrollView, Dimensions, TextInput, 
  Modal, Alert, ActivityIndicator 
} from 'react-native';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import styles from '../styles/stylesProgramas/stylesProgramas';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const screenHeight = Dimensions.get('window').height;

const Programas = () => {
  const navigation = useNavigation();
  const [programas, setProgramas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrograma, setSelectedPrograma] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'programas'),
      (snapshot) => {
        const programasData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProgramas(programasData);
        setLoading(false);
      },
      (error) => {
        console.error('Error obteniendo programas:', error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const deletePrograma = async (id) => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar este programa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'programas', id));
              Alert.alert('Eliminado', 'El programa ha sido eliminado.');
              setSelectedPrograma(null);
            } catch (error) {
              console.error('Error al eliminar:', error);
              Alert.alert('Error', 'No se pudo eliminar el programa.');
            }
          }
        }
      ]
    );
  };

  const filteredProgramas = programas.filter(programa =>
    programa.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    programa.descripcion?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { height: screenHeight }]}> 
      
      {/* Header */}
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

      {/* Barra de búsqueda */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar programa por nombre"
          placeholderTextColor="#94949b"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Indicador de carga */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingBottom: 100 }]} showsVerticalScrollIndicator={false}>
          {filteredProgramas.map((programa) => (
            <TouchableOpacity 
              key={programa.id}   
              style={styles.card} 
              onPress={() => setSelectedPrograma(programa)}
            >
              <Text style={styles.cardTitle}>{programa.nombre}</Text>
              <Text style={styles.cardText}>Descripción: {programa.descripcion}</Text>
              <Text style={styles.cardText}>Fecha: {moment(programa.fecha).format('DD/MM/YYYY')}</Text>
              <Text style={styles.cardText}>Ubicación: {programa.ubicacion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('ProgramasForm')}
      >
        <Text style={styles.addButtonText}>Agregar Programa</Text>
      </TouchableOpacity>

      {/* Modal para mostrar detalles del programa seleccionado */}
      <Modal 
        visible={!!selectedPrograma} 
        transparent 
        animationType="slide"
        onRequestClose={() => setSelectedPrograma(null)}
      >
        <TouchableOpacity 
          style={styles.modalContainer} 
          activeOpacity={1} 
          onPress={() => setSelectedPrograma(null)}
        >
          <View style={styles.modalContent}>
            {selectedPrograma && (
              <>
                <Text style={styles.cardTitle}>{selectedPrograma.nombre}</Text>
                <Text style={styles.cardText}>Descripción: {selectedPrograma.descripcion}</Text>
                <Text style={styles.cardText}>Fecha: {moment(selectedPrograma.fecha).format('DD/MM/YYYY')}</Text>
                <Text style={styles.cardText}>Ubicación: {selectedPrograma.ubicacion}</Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.updateButton]} 
                    onPress={() => {
                      navigation.navigate('ProgramasForm', { programa: selectedPrograma });
                      setSelectedPrograma(null);
                    }}
                  >
                    <Text style={styles.buttonText}>Actualizar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.modalButton, styles.deleteButton]} 
                    onPress={() => deletePrograma(selectedPrograma.id)}
                  >
                    <Text style={styles.buttonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedPrograma(null)}>
                  <Text style={styles.buttonText}>Cerrar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>

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

export default Programas;