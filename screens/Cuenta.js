import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, Linking } from 'react-native';
import styles from '../styles/styles'; // Importa los estilos
import { withDecay } from 'react-native-reanimated';

const screenHeight = Dimensions.get('window').height; // Obtiene el alto de la pantalla

const openURL = (url) => {
  Linking.openURL(url).catch(err => console.error("No se pudo abrir la URL:", err));
};

const Cuenta = () => {

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

          <Image source={require('../assets/jaloLogo.png')} style={{ width: 200, height: 200, marginBottom:30, }} />

          <Text style={styles.title}>Bienvenido a la Jalo App</Text>

          
          
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

export default Cuenta;
