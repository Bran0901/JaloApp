import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Descuentos from "../screens/Descuentos";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="descuentos" component={Descuentos} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
