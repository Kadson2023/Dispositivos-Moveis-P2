import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function Home({ navigation }) {
  const handleNavigation = (routeName) => {
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/hosplogo.png')}
        style={styles.logo}
      />
      <View style={styles.separator} />
      <View style={styles.content}>
        <Text style={styles.title}>Seja bem-vindo ao Hospital Home DF!</Text>
        <Text style={styles.description}>Sua saúde é nossa prioridade.</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigation('Consultas')}
          >
            <Text style={styles.buttonText}>Consultas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigation('Exames')}
          >
            <Text style={styles.buttonText}>Exames</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigation('Funcionarios')}
          >
            <Text style={styles.buttonText}>Funcionários</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigation('Medicos')}
          >
            <Text style={styles.buttonText}>Médicos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigation('Pacientes')}
          >
            <Text style={styles.buttonText}>Pacientes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  separator: {
    height: 1,
    backgroundColor: '#fff', // Cor da linha branca
    marginHorizontal: 20,
    marginTop: 10,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 20,
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.5)', // Cor de fundo para os títulos e botões
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '55%',
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});
