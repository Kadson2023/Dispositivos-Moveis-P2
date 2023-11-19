import { createStackNavigator } from "@react-navigation/stack";
import FormPaciente from "./FormPaciente.js";
import ListaPacientes from "./ListaPacientes.js";

const Stack = createStackNavigator();

export default function StackPacientesAsyncStorage() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ListaPacientes"
    >
      <Stack.Screen name="ListaPacientes" component={ListaPacientes} />
      <Stack.Screen name="FormPaciente" component={FormPaciente} />
      
    </Stack.Navigator>
  );
}
