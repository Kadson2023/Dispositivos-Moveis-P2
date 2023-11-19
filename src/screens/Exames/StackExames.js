import { createStackNavigator } from "@react-navigation/stack";
import ListaExames from "./ListaExames";
import FormExame from "./FormExame";

const Stack = createStackNavigator();

export default function StackMedicosAsyncStorage() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ListaExames"
    >
      <Stack.Screen name="ListaExames" component={ListaExames} />
      <Stack.Screen name="FormExame" component={FormExame} />
      
    </Stack.Navigator>
  );
}
