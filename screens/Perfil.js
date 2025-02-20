import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, Linking } from 'react-native';
import styles from '../styles/styles'; // Importa los estilos

const screenHeight = Dimensions.get('window').height; // Obtiene el alto de la pantalla

const openURL = (url) => {
  Linking.openURL(url).catch(err => console.error("No se pudo abrir la URL:", err));
};

const Perfil = () => {

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
        <View style={styles.container}>
          <Text style={styles.title}>MI PERFIL</Text>
          
          <Image source={require('../assets/perfil2.png')} style={styles.avatar} />
          
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.text}>Brandon Constantino Quintana</Text>
          
          <Text style={styles.label}>Edad:</Text>
          <Text style={styles.text}>20</Text>
          
          <Text style={styles.label}>Correo:</Text>
          <Text style={styles.text}>brandon@hotmail.com</Text>
          
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

export default Perfil;
