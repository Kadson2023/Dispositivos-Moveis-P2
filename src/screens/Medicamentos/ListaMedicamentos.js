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

export default function ListaMedicamentos({ navigation, route }) {
  const [medicamentos, setMedicamentos] = useState([]);
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false);
  const [medicamentoASerExcluido, setMedicamentoASerExcluido] = useState(null);

  useEffect(() => {
    loadMedicamentos();
  }, []);

  async function loadMedicamentos() {
    const response = await AsyncStorage.getItem("medicamentos");
    console.log(
      "🚀 ~ file: ListaMedicamentosAsyncStorage.js:21 ~ loadMedicamentos ~ response:",
      response
    );
    const medicamentosStorage = response ? JSON.parse(response) : [];
    setMedicamentos(medicamentosStorage);
  }

  const showModal = () => setShowModalExcluirUsuario(true);

  const hideModal = () => setShowModalExcluirUsuario(false);

  async function adicionarMedicamento(medicamento) {
    let novaListaMedicamentos = medicamentos;
    novaListaMedicamentos.push(medicamento);
    await AsyncStorage.setItem("medicamentos", JSON.stringify(novaListaMedicamentos));
    setMedicamentos(novaListaMedicamentos);
  }

  async function editarMedicamento(medicamentoAntigo, novosDados) {
    console.log("MEDICAMENTO ANTIGO -> ", medicamentoAntigo);
    console.log("DADOS NOVOS -> ", novosDados);

    const novaListaMedicamentos = medicamentos.map((medicamento) => {
      if (medicamento == medicamentoAntigo) {
        return novosDados;
      } else {
        return medicamento;
      }
    });

    await AsyncStorage.setItem("medicamentos", JSON.stringify(novaListaMedicamentos));
    setMedicamentos(novaListaMedicamentos);
  }

  async function excluirMedicamento(medicamento) {
    const novaListaMedicamentos = medicamentos.filter((p) => p !== medicamento);
    await AsyncStorage.setItem("medicamentos", JSON.stringify(novaListaMedicamentos));
    setMedicamentos(novaListaMedicamentos);
    Toast.show({
      type: "success",
      text1: "Medicamento excluído com sucesso!",
    });
  }

  function handleExluirMedicamento() {
    excluirMedicamento(medicamentoASerExcluido);
    setMedicamentoASerExcluido(null);
    hideModal();
  }

  return (
    <>
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          Lista de Medicamentos
        </Text>

        <FlatList
          style={styles.list}
          data={medicamentos}
          renderItem={({ item }) => (
            <Card mode="outlined" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.textContainer}>
                <Avatar.Image size={50} source={require('../../../assets/logomedicamento.png')} />
                  <Text variant="titleMedium" style={styles.text}>
                    {item?.nome}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    Dosagem: {item?.dosagem}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    Efeitos: {item.efeitos}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    Descrição: {item?.descricao}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    Fabricante: {item.fabricante}
                  </Text>
                </View>
              </Card.Content>
              <Card.Actions style={styles.buttonsContainer}>
                <View style={styles.buttonsWrapper}>
                  <Button
                    onPress={() =>
                      navigation.push("FormMedicamento", {
                        acao: editarMedicamento,
                        medicamento: item,
                      })
                    }
                    style={styles.editButton}
                    labelStyle={styles.buttonLabel}
                  >
                    Editar
                  </Button>
                  <Button
                    onPress={() => {
                      setMedicamentoASerExcluido(item);
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
            navigation.push("FormMedicamento", {
              acao: adicionarMedicamento,
            })
          }
        />

        {/* Modal Excluir Usuário */}
        <Portal>
          <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
            <Dialog.Title>Atenção!</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Tem certeza que deseja excluir este medicamento?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideModal}>VOLTAR</Button>
              <Button onPress={handleExluirMedicamento}>SIM</Button>
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
      borderBottomColor: "#fff", // Cor da linha separadora
      borderBottomWidth: 1,
      width: "100%", // Largura total
      marginVertical: 15, // Espaçamento vertical das linhas
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