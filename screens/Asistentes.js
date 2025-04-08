import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import styles from "../styles/stylesAsistentes/stylesAsistentes"; // crea o ajusta este archivo de estilos
import Encabezado from "../screens/Encabezado";
import { useRoute } from "@react-navigation/native";
import { Button, Card, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const Asistentes = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { eventoId, eventoNombre } = route.params;

  const [asistentes, setAsistentes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "asistentes"),
      where("nombreEvento", "==", eventoNombre)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAsistentes(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [eventoId]);

  return (
    <View style={styles.container}>
      <Encabezado />
      <View style={styles.general}>
        <Icon
          name="arrow-left"
          size={30}
          color="black"
          onPress={() => navigation.navigate("Eventos")}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Asistentes a {eventoNombre}</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#6a0f49" />
      ) : asistentes.length === 0 ? (
        <Text style={styles.emptyText}>No hay asistentes registrados aún.</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate("Graficas", {
                asistentes,
                eventoNombre,
              })
            }
            style={styles.button2}
          >
            Ver gráficas
          </Button>
          {asistentes.map((asistente) => (
            <Card key={asistente.id} style={styles.card}>
              <Card.Title
                title={asistente.nombreCompleto}
                subtitle={asistente.correo}
              />
              <Text style={styles.cardText}>Edad: {asistente.edad}</Text>
              <Text style={styles.cardText}>Sexo: {asistente.sexo}</Text>
              <Text style={styles.cardText}>
                Municipio: {asistente.municipio}
              </Text>
              <Text style={styles.cardText}>
                Institución: {asistente.institucion}
              </Text>
              <Text style={styles.cardText}>
                Teléfono: {asistente.telefono}
              </Text>
            </Card>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Asistentes;
