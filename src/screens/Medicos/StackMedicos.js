import { createStackNavigator } from "@react-navigation/stack";
import FormMedico from "./FormMedico.js";
import ListaMedicos from "./ListaMedicos.js";

const Stack = createStackNavigator();

export default function StackMedicosAsyncStorage() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ListaMedicos"
    >
      <Stack.Screen name="ListaMedicos" component={ListaMedicos} />
      <Stack.Screen name="FormMedico" component={FormMedico} />
      
    </Stack.Navigator>
  );
}
