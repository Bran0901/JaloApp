import React from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { PieChart } from "react-native-chart-kit";
import Encabezado from "../screens/Encabezado";
import styles from "../styles/stylesGraficas";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const { width } = Dimensions.get("window");

const Graficas = () => {
  const route = useRoute();
  const { asistentes } = route.params;
  const { eventoId, eventoNombre } = route.params;

  const colores = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#6a0f49",
    "#c34a36",
    "#00C49F",
    "#FFD700",
    "#8A2BE2",
    "#A52A2A",
  ];

  // Agrupar edades en rangos
  const agruparEdades = () => {
    const rangos = {
      "18-21": 0,
      "22-25": 0,
      "26-29": 0,
      /*"31-35": 0,
      "36-40": 0,
      "41+": 0,*/
    };

    asistentes.forEach(({ edad }) => {
      const e = parseInt(edad);
      if (e >= 15 && e <= 20) rangos["18-21"]++;
      else if (e >= 21 && e <= 25) rangos["22-25"]++;
      else if (e >= 26 && e <= 30) rangos["26-29"]++;
      /*else if (e >= 31 && e <= 35) rangos["31-35"]++;
      else if (e >= 36 && e <= 40) rangos["36-40"]++;
      else if (e >= 41) rangos["41+"]++;*/
    });

    return rangos;
  };

  // Conteo simple por campo (sexo, municipio, etc.)
  const contarPorCampo = (campo) => {
    const conteo = {};
    asistentes.forEach((a) => {
      const valor = a[campo];
      conteo[valor] = (conteo[valor] || 0) + 1;
    });
    return conteo;
  };

  // Preparar datos para la gráfica, con porcentajes
  const prepararDatos = (datos) => {
    const total = Object.values(datos).reduce((sum, val) => sum + val, 0);
    return Object.entries(datos).map(([key, value], index) => ({
      name: `${key} (${((value / total) * 100).toFixed(1)}%)`,
      population: value,
      color: colores[index % colores.length],
      legendFontColor: "#333",
      legendFontSize: 12,
    }));
  };

  // Preparar todas las gráficas
  const datosEdad = prepararDatos(agruparEdades());
  const datosSexo = prepararDatos(contarPorCampo("sexo"));
  const datosMunicipio = prepararDatos(contarPorCampo("municipio"));
  const datosInstitucion = prepararDatos(contarPorCampo("institucion"));
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Encabezado />
      <View style={styles.general}>
        <Icon
          name="arrow-left"
          size={30}
          color="black"
          onPress={() =>
            navigation.navigate("Asistentes", {
              asistentes,
              eventoNombre,
            })
          } // Navega a la pantalla de inicio
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.generalTitle}>Gráficas de asistencia</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>
      <View style={styles.containerGeneral}>
        <Text style={styles.title}>Gráfica por Edad</Text>
        <PieChart
          data={datosEdad}
          width={width * 0.85}
          height={150}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="-15"
          absolute
          hasLegend
        />

        <Text style={styles.title}>Gráfica por Sexo</Text>
        <PieChart
          data={datosSexo}
          width={width * 0.85}
          height={150}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="-15"
          absolute
          hasLegend
        />

        <Text style={styles.title}>Gráfica por Municipio</Text>
        <PieChart
          data={datosMunicipio}
          width={width * 0.85}
          height={150}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="-15"
          absolute
          hasLegend
        />

        <Text style={styles.title}>Gráfica por Institución</Text>
        <PieChart
          data={datosInstitucion}
          width={screenWidth}
          height={150}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="-15"
          absolute
          hasLegend
        />
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(106, 15, 73, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  useShadowColorFromDataset: false,
};

export default Graficas;
