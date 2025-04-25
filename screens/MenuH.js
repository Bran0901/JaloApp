import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Linking,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/stylesMenu"; // Importa los estilos
import Icon from "react-native-vector-icons/FontAwesome"; // Importa la librería de íconos

const MenuScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.overlay}>
      {/* Contenedor del menú */}
      <View style={styles.menuContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.cardMenu}>
            {/* Encabezado del menú con botón de regreso */}
            <View style={styles.headerContainer}>
              <Icon
                name="arrow-left"
                size={30}
                color="black"
                onPress={() => navigation.goBack()}
                style={{ marginRight: 10 }}
              />
              <Text style={styles.title}>Menú</Text>
            </View>

            {/* Logo principal */}
            <Image
              source={require("../assets/jovenes.png")}
              style={styles.logo}
            />

            {/* Redes sociales */}
            <Text style={styles.menuText}>
              ¡Visita nuestras redes sociales!
            </Text>
            <View style={styles.iconRow}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://www.facebook.com/share/1AEySY45Tg/")
                }
              >
                <Icon
                  style={styles.iconRed}
                  name="facebook"
                  size={35}
                  color="#3b5998"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    "https://www.instagram.com/gobmichoacan/?hl=es"
                  )
                }
              >
                <Icon
                  style={styles.iconRed}
                  name="instagram"
                  size={35}
                  color="#1DA1F2"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://x.com/IJUMICHoficial?s=09")
                }
              >
                <Icon
                  style={styles.iconRed}
                  name="twitter"
                  size={35}
                  color="#1DA1F2"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://t.me/GobiernodeMichoacan")
                }
              >
                <Icon
                  style={styles.iconRed}
                  name="telegram"
                  size={35}
                  color="#1DA1F2"
                />
              </TouchableOpacity>
            </View>

            {/* Sitio web */}
            <Text style={styles.menuText}>
              ¡Dale un vistazo a nuestro sitio web!
            </Text>
            <View style={styles.containerWeb}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://jovenes.michoacan.gob.mx/")
                }
              >
                <View style={styles.linkContainer}>
                  <Icon
                    style={styles.icon}
                    name="at"
                    size={35}
                    color="#3b5998"
                  />
                  <Text style={styles.iconTextLink}>jovenes.michoacan</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Contacto */}
            <Text style={styles.menuText}>¡Contáctanos para saber más!</Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("mailto:juventudmichoacan2127@gmail.com")
              }
            >
              <View style={styles.iconTextContainer}>
                <Icon
                  style={styles.icon}
                  name="envelope"
                  size={35}
                  color="#3b5998"
                />
                <Text style={styles.iconText}>
                  juventudmichoacan2127@gmail.com
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL("tel:4433135656")}>
              <View style={styles.iconTextContainerPhone}>
                <Icon
                  style={styles.icon}
                  name="phone"
                  size={35}
                  color="#3b5998"
                />
                <Text style={styles.iconTextPhone}>4433135656</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://maps.app.goo.gl/N27GRBpUL3DFZP47A")
              }
            >
              <View style={styles.iconTextContainerUbi}>
                <Icon
                  style={styles.icon}
                  name="tag"
                  size={35}
                  color="#3b5998"
                />
                <Text style={styles.iconText}>
                  Perif. Paseo de la República 2451, Camelinas, 58290 Morelia,
                  Mich.
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MenuScreen;
