import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Dimensions } from 'react-native'; // Para hacer todo responsivo
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles'; // Importa los estilos

const screenHeight = Dimensions.get('window').height; // Obtiene el alto de la pantalla

const openURL = (url) => {
  Linking.openURL(url).catch(err => console.error("No se pudo abrir la URL:", err));
};

const Inicio = () => {
  const navigation = useNavigation();

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

        <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('Cuenta')}>
          <Image source={require('../assets/usuario-seguro.png')} style={styles.userIcon} />
        </TouchableOpacity>

      </View>

      {/* Línea divisoria */}
      <View style={styles.separator} />

      {/* Contenido desplazable */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        <View style={styles.buttonGrid}>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TarjetaJoven')}>
            <Text style={styles.title2}>Tarjeta Joven</Text>
            <Image source={require('../assets/tarjeta.png')} style={styles.icon} />
          </TouchableOpacity> 

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Perfil')}>
            <Text style={styles.title2}>Perfil</Text>
            <Image source={require('../assets/perfil.png')} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Descuentos')}>
            <Text style={styles.title2}>Descuentos</Text>
            <Image source={require('../assets/descuento.png')} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Vacantes')}>
            <Text style={styles.title2}>Vacantes</Text>
            <Image source={require('../assets/vacante.png')} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Eventos')}>
            <Text style={styles.title2}>Eventos</Text>
            <Image source={require('../assets/evento.png')} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Mapa')}>
            <Text style={styles.title2}>Mapa</Text>
            <Image source={require('../assets/mapa.png')} style={styles.icon} />
          </TouchableOpacity>

        </View>

        {/* Botón Otros */}
        <TouchableOpacity style={styles.otrosButton} onPress={() => navigation.navigate('Otro')}>
            <Text style={styles.title2}>Otro</Text>
            <Image source={require('../assets/otro.png')} style={styles.icon} />
        </TouchableOpacity>


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

export default Inicio;
