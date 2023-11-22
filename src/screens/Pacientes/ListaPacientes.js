import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Dialog,
  Divider,
  FAB,
  Portal,
  Text,
} from "react-native-paper";
import Toast from "react-native-toast-message";

export default function ListaPacientes({ navigation, route }) {
  const [pacientes, setPacientes] = useState([]);
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false);
  const [pacienteASerExcluido, setPacienteASerExcluido] = useState(null);

  useEffect(() => {
    loadPacientes();
  }, []);

  async function loadPacientes() {
    const response = await AsyncStorage.getItem("pacientes");
    console.log(
      "🚀 ~ file: ListaPacientesAsyncStorage.js:21 ~ loadPacientes ~ response:",
      response
    );
    const pacientesStorage = response ? JSON.parse(response) : [];
    setPacientes(pacientesStorage);
  }

  const showModal = () => setShowModalExcluirUsuario(true);

  const hideModal = () => setShowModalExcluirUsuario(false);

  async function adicionarPaciente(paciente) {
    let novaListaPacientes = pacientes;
    novaListaPacientes.push(paciente);
    await AsyncStorage.setItem("pacientes", JSON.stringify(novaListaPacientes));
    setPacientes(novaListaPacientes);
  }

  async function editarPaciente(pacienteAntigo, novosDados) {
    console.log("PACIENTE ANTIGO -> ", pacienteAntigo);
    console.log("DADOS NOVOS -> ", novosDados);

    const novaListaPacientes = pacientes.map((paciente) => {
      if (paciente == pacienteAntigo) {
        return novosDados;
      } else {
        return paciente;
      }
    });

    await AsyncStorage.setItem("pacientes", JSON.stringify(novaListaPacientes));
    setPacientes(novaListaPacientes);
  }

  async function excluirPaciente(paciente) {
    const novaListaPacientes = pacientes.filter((p) => p !== paciente);
    await AsyncStorage.setItem("pacientes", JSON.stringify(novaListaPacientes));
    setPacientes(novaListaPacientes);
    Toast.show({
      type: "success",
      text1: "Paciente excluído com sucesso!",
    });
  }

  function handleExluirPaciente() {
    excluirPaciente(pacienteASerExcluido);
    setPacienteASerExcluido(null);
    hideModal();
  }

  return (
    <>
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          Lista de Pacientes
        </Text>

        <FlatList
          style={styles.list}
          data={pacientes}
          renderItem={({ item }) => (
            <Card mode="outlined" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.textContainer}>
                  <Avatar.Icon
                    icon="account-circle"
                    size={50}
                    style={styles.avatar}
                  />
                  <Text variant="titleMedium" style={styles.text}>
                    {item?.nome}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    Idade: {item?.idade}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    Endereço: {item?.endereco}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    CPF: {item.cpf}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    E-mail: {item.email}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    Telefone: {item.telefone}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    Medicações: {item.medicacoes}
                  </Text>
                </View>
              </Card.Content>
              <Card.Actions style={styles.buttonsContainer}>
                <View style={styles.buttonsWrapper}>
                  <Button
                    onPress={() =>
                      navigation.push("FormPaciente", {
                        acao: editarPaciente,
                        paciente: item,
                      })
                    }
                    style={styles.editButton}
                    labelStyle={styles.buttonLabel}
                  >
                    Editar
                  </Button>
                  <Button
                    onPress={() => {
                      setPacienteASerExcluido(item);
                      showModal();
                    }}
                    style={styles.deleteButton}
                    labelStyle={styles.buttonLabel}
                  >
                    Excluir
                  </Button>
                </View>
              </Card.Actions>
            </Card>
          )}
        />

        {/* Botão Flutuante */}
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() =>
            navigation.push("FormPaciente", {
              acao: adicionarPaciente,
            })
          }
        />

        {/* Modal Excluir Usuário */}
        <Portal>
          <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
            <Dialog.Title>Atenção!</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Tem certeza que deseja excluir este paciente?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideModal}>VOLTAR</Button>
              <Button onPress={handleExluirPaciente}>SIM</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: 'rgba(76, 175, 80, 0.2)'
  },
  title: {
    fontWeight: "bold",
    margin: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  list: {
    width: "90%",
  },
  card: {
    marginTop: 15,
    backgroundColor: "#4CAF50",
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "gray",
    marginBottom: 10,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  divider: {
    borderBottomColor: "#fff", 
    borderBottomWidth: 1,
    width: "100%", 
    marginVertical: 15, 
  },
  buttonsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  editButton: {
    backgroundColor: "gray",
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "red",
  },
  buttonLabel: {
    color: "#fff",
    fontWeight: "bold",
  },
});