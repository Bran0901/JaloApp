import React, { useEffect, useState } from 'react';
import { 
  View, Text, Image, TouchableOpacity, ScrollView, Dimensions, TextInput, 
  Modal, Alert, ActivityIndicator 
} from 'react-native';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import styles from '../styles/stylesEventos/stylesEventos';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const screenHeight = Dimensions.get('window').height;

const Eventos = () => {
  const navigation = useNavigation();
  const [eventos, setEventos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvento, setSelectedEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'eventos'),
      (snapshot) => {
        const eventosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEventos(eventosData);
        setLoading(false);
      },
      (error) => {
        console.error('Error obteniendo eventos:', error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const deleteEvento = async (id) => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar este evento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'eventos', id));
              Alert.alert('Eliminado', 'El evento ha sido eliminado.');
              setSelectedEvento(null);
            } catch (error) {
              console.error('Error al eliminar:', error);
              Alert.alert('Error', 'No se pudo eliminar el evento.');
            }
          }
        }
      ]
    );
  };

  const filteredEventos = eventos.filter(evento =>
    evento.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    evento.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
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
          placeholder="Buscar evento por nombre"
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
          {filteredEventos.map((evento) => (
            <TouchableOpacity 
              key={evento.id}   
              style={styles.card} 
              onPress={() => setSelectedEvento(evento)}
            >
              <Text style={styles.cardTitle}>{evento.nombre}</Text>
              <Text style={styles.cardText}>Descripción: {evento.descripcion}</Text>
              <Text style={styles.cardText}>Fecha: {moment(evento.fecha).format('DD/MM/YYYY')}</Text>
              <Text style={styles.cardText}>Ubicación: {evento.ubicacion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('EventosForm')}
      >
        <Text style={styles.addButtonText}>Agregar Evento</Text>
      </TouchableOpacity>

      {/* Modal para mostrar detalles del evento seleccionado */}
      <Modal 
        visible={!!selectedEvento} 
        transparent 
        animationType="slide"
        onRequestClose={() => setSelectedEvento(null)}
      >
        <TouchableOpacity 
          style={styles.modalContainer} 
          activeOpacity={1} 
          onPress={() => setSelectedEvento(null)}
        >
          <View style={styles.modalContent}>
            {selectedEvento && (
              <>
                <Text style={styles.cardTitle}>{selectedEvento.nombre}</Text>
                <Text style={styles.cardText}>Descripción: {selectedEvento.descripcion}</Text>
                <Text style={styles.cardText}>Fecha: {selectedEvento.fecha}</Text>
                <Text style={styles.cardText}>Ubicación: {selectedEvento.ubicacion}</Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.updateButton]} 
                    onPress={() => {
                      navigation.navigate('EventosForm', { evento: selectedEvento });
                      setSelectedEvento(null);
                    }}
                  >
                    <Text style={styles.buttonText}>Actualizar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.modalButton, styles.deleteButton]} 
                    onPress={() => deleteEvento(selectedEvento.id)}
                  >
                    <Text style={styles.buttonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedEvento(null)}>
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

export default Eventos;
