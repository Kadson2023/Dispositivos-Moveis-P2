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

export default function ListaMedicos({ navigation, route }) {
  const [medicos, setMedicos] = useState([]);
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false);
  const [medicoASerExcluido, setMedicoASerExcluido] = useState(null);

  useEffect(() => {
    loadMedicos();
  }, []);

  async function loadMedicos() {
    const response = await AsyncStorage.getItem("medicos");
    console.log(
      "🚀 ~ file: ListaMedicosAsyncStorage.js:21 ~ loadMedicos ~ response:",
      response
    );
    const medicosStorage = response ? JSON.parse(response) : [];
    setMedicos(medicosStorage);
  }

  const showModal = () => setShowModalExcluirUsuario(true);

  const hideModal = () => setShowModalExcluirUsuario(false);

  async function adicionarMedico(medico) {
    let novaListaMedicos = medicos;
    novaListaMedicos.push(medico);
    await AsyncStorage.setItem("medicos", JSON.stringify(novaListaMedicos));
    setMedicos(novaListaMedicos);
  }

  async function editarMedico(medicoAntigo, novosDados) {
    console.log("MÉDICO ANTIGO -> ", medicoAntigo);
    console.log("DADOS NOVOS -> ", novosDados);

    const novaListaMedicos = medicos.map((medico) => {
      if (medico == medicoAntigo) {
        return novosDados;
      } else {
        return medico;
      }
    });

    await AsyncStorage.setItem("medicos", JSON.stringify(novaListaMedicos));
    setMedicos(novaListaMedicos);
  }

  async function excluirMedico(medico) {
    const novaListaMedicos = medicos.filter((p) => p !== medico);
    await AsyncStorage.setItem("medicos", JSON.stringify(novaListaMedicos));
    setMedicos(novaListaMedicos);
    Toast.show({
      type: "success",
      text1: "Médico excluído com sucesso!",
    });
  }

  function handleExluirMedico() {
    excluirMedico(medicoASerExcluido);
    setMedicoASerExcluido(null);
    hideModal();
  }

  return (
    <>
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          Lista de Médicos
        </Text>

        <FlatList
          style={styles.list}
          data={medicos}
          renderItem={({ item }) => (
            <Card mode="outlined" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.textContainer}>
                <Avatar.Image size={50} source={require('../../../assets/logomedico.png')} />
                  <Text variant="titleMedium" style={styles.text}>
                    {item?.nome}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    Especialidade: {item?.especialidade}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    Telefone: {item.telefone}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    Endereço: {item?.endereco}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    CRM: {item.crm}
                  </Text>
                </View>
              </Card.Content>
              <Card.Actions style={styles.buttonsContainer}>
                <View style={styles.buttonsWrapper}>
                  <Button
                    onPress={() =>
                      navigation.push("FormMedico", {
                        acao: editarMedico,
                        medico: item,
                      })
                    }
                    style={styles.editButton}
                    labelStyle={styles.buttonLabel}
                  >
                    Editar
                  </Button>
                  <Button
                    onPress={() => {
                      setMedicoASerExcluido(item);
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
            navigation.push("FormMedico", {
              acao: adicionarMedico,
            })
          }
        />

        {/* Modal Excluir Usuário */}
        <Portal>
          <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
            <Dialog.Title>Atenção!</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Tem certeza que deseja excluir este medico?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideModal}>VOLTAR</Button>
              <Button onPress={handleExluirMedico}>SIM</Button>
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