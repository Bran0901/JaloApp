import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window'); // Obtiene tamaño de la pantalla

const stylesCuenta = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C83182',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    height: height * 0.12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingTop: 35,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    flex: 2,
    alignItems: 'center',
  },
  logo: {
    maxWidth: 200,
    height: 50,
    resizeMode: 'contain',
  },
  userIcon: {
    maxWidth: 50,
    height: 50,
    resizeMode: 'contain',
  },
  titleLogo: {
    maxWidth: 120,
    height: 60,
    resizeMode: 'contain',
  },  
  separator: {
    width: '100%',
    height: 4,
    backgroundColor: '#6A0F49',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#FDEEEE',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  input2: {
    width: '100%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
  },
  boton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  textoBoton: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    height: height * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: '5%',
    paddingVertical: 10,
    bottom: 0,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  socialIcon: {
    maxWidth: 40,
    height: 35,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
});

export default stylesCuenta;
