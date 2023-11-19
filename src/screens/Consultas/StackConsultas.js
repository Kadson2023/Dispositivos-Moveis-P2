import { createStackNavigator } from "@react-navigation/stack";
import ListaConsultas from "./ListaConsultas";
import FormConsulta from "./FormConsulta";

const Stack = createStackNavigator();

export default function StackMedicosAsyncStorage() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ListaConsultas"
    >
      <Stack.Screen name="ListaConsultas" component={ListaConsultas} />
      <Stack.Screen name="FormConsulta" component={FormConsulta} />
      
    </Stack.Navigator>
  );
}
