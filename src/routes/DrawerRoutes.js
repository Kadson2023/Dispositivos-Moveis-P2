import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import Home from '../screens/Home'
import StackPacientes from '../screens/Pacientes/StackPacientes'

const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='Início'>
            <Drawer.Screen name="Início" component={Home} />
            <Drawer.Screen name="Pacientes" component={StackPacientes} />
        </Drawer.Navigator>
    )
}