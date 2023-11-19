import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import Home from "../screens/Home";
import StackPacientes from "../screens/Pacientes/StackPacientes";
import StackMedicos from "../screens/Medicos/StackMedicos";
import StackMedicamentos from "../screens/Medicamentos/StackMedicamentos";
import StackExames from "../screens/Exames/StackExames";
import StackConsultas from "../screens/Consultas/StackConsultas";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Início">
      <Drawer.Screen name="Início" component={Home} />
      <Drawer.Screen name="Pacientes" component={StackPacientes} />
      <Drawer.Screen name="Médicos" component={StackMedicos} />
      <Drawer.Screen name="Medicamentos" component={StackMedicamentos} />
      <Drawer.Screen name="Exames" component={StackExames} />
      <Drawer.Screen name="Consultas" component={StackConsultas} />
    </Drawer.Navigator>
  );
}
