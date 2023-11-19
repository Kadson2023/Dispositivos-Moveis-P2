import { createStackNavigator } from "@react-navigation/stack";
import ListaMedicamentos from "./ListaMedicamentos";
import FormMedicamento from "./FormMedicamento";

const Stack = createStackNavigator();

export default function StackMedicosAsyncStorage() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ListaMedicamentos"
    >
      <Stack.Screen name="ListaMedicamentos" component={ListaMedicamentos} />
      <Stack.Screen name="FormMedicamento" component={FormMedicamento} />
      
    </Stack.Navigator>
  );
}
