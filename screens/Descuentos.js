import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, Linking } from 'react-native';
import styles from '../styles/styles';

const screenHeight = Dimensions.get('window').height; // Obtiene el alto de la pantalla

const openURL = (url) => {
  Linking.openURL(url).catch(err => console.error("No se pudo abrir la URL:", err));
};

const descuentos = [
  { id: '1', name: 'Cinepolis', image: require('../assets/descuento.png') },
  { id: '2', name: 'Burger King', image: require('../assets/descuento.png') },
  { id: '3', name: 'KFC', image: require('../assets/descuento.png') },
  { id: '4', name: 'Dominos', image: require('../assets/descuento.png') },
  { id: '5', name: 'Starbucks', image: require('../assets/descuento.png') },
  { id: '6', name: 'Café Europa', image: require('../assets/descuento.png') },
  { id: '7', name: 'Cinemex', image: require('../assets/descuento.png') },
  { id: '8', name: 'Oxxo', image: require('../assets/descuento.png') }
];

const Descuentos = () => {

  return (

    <View style={[styles.container, { height: screenHeight }]}>

      {/* Encabezado */}
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
        <View>
          <Text>Hola Mundo - Tarjeta Joven</Text>
        </View>
      </ScrollView>

      {/* Barra inferior */}
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

export default Descuentos;