import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, Linking } from 'react-native';
import styles from '../styles/styles'; // Importa los estilos

const screenHeight = Dimensions.get('window').height;

const openURL = (url) => {
  Linking.openURL(url).catch(err => console.error("No se pudo abrir la URL:", err));
};

const Vacantes = () => {

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

export default Vacantes;
