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

export default function ListaConsultas({ navigation, route }) {
  const [consultas, setConsultas] = useState([]);
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false);
  const [consultaASerExcluida, setConsultaASerExcluida] = useState(null);

  useEffect(() => {
    loadConsultas();
  }, []);

  async function loadConsultas() {
    const response = await AsyncStorage.getItem("consultas");
    console.log(
      "🚀 ~ file: ListaConsultasAsyncStorage.js:21 ~ loadConsultas ~ response:",
      response
    );
    const consultasStorage = response ? JSON.parse(response) : [];
    setConsultas(consultasStorage);

    const consultasFormatadas = consultasStorage.map((consulta) => ({
      ...consulta,
      data: new Date(consulta.data), // Converter a string para objeto Date
    }));
    setConsultas(consultasFormatadas);
  }

  const showModal = () => setShowModalExcluirUsuario(true);

  const hideModal = () => setShowModalExcluirUsuario(false);

  async function adicionarConsulta(consulta) {
    let novaListaConsultas = consultas;
    novaListaConsultas.push(consulta);
    await AsyncStorage.setItem("consultas", JSON.stringify(novaListaConsultas));
    setConsultas(novaListaConsultas);
  }

  async function editarConsulta(consultaAntiga, novosDados) {
    console.log("CONSULTA ANTIGA -> ", consultaAntiga);
    console.log("DADOS NOVOS -> ", novosDados);

    const novaListaConsultas = consultas.map((consulta) => {
      if (consulta == consultaAntiga) {
        return novosDados;
      } else {
        return consulta;
      }
    });

    await AsyncStorage.setItem("consultas", JSON.stringify(novaListaConsultas));
    setConsultas(novaListaConsultas);
  }

  async function excluirConsulta(consulta) {
    const novaListaConsultas = consultas.filter((p) => p !== consulta);
    await AsyncStorage.setItem("consultas", JSON.stringify(novaListaConsultas));
    setConsultas(novaListaConsultas);
    Toast.show({
      type: "success",
      text1: "Consulta excluída com sucesso!",
    });
  }

  function handleExluirConsulta() {
    excluirConsulta(consultaASerExcluida);
    setConsultaASerExcluida(null);
    hideModal();
  }

  return (
    <>
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          Lista de Consultas
        </Text>

        <FlatList
          style={styles.list}
          data={consultas}
          renderItem={({ item }) => (
            <Card mode="outlined" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.textContainer}>
                  <Avatar.Image
                    size={50}
                    source={require("../../../assets/logoconsulta.jpg")}
                  />
                  <Text variant="titleMedium" style={styles.text}>
                    {item?.paciente}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    Data:{" "}
                    {item.data instanceof Date
                      ? item.data.toLocaleDateString()
                      : "Data não disponível"}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    Médico: {item?.medico}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    Motivo: {item.motivo}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    Observações: {item.observacoes}
                  </Text>
                  <Divider style={styles.divider} />
                </View>
              </Card.Content>
              <Card.Actions style={styles.buttonsContainer}>
                <View style={styles.buttonsWrapper}>
                  <Button
                    onPress={() =>
                      navigation.push("FormConsulta", {
                        acao: editarConsulta,
                        consulta: item,
                      })
                    }
                    style={styles.editButton}
                    labelStyle={styles.buttonLabel}
                  >
                    Editar
                  </Button>
                  <Button
                    onPress={() => {
                      setConsultaASerExcluida(item);
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
            navigation.push("FormConsulta", {
              acao: adicionarConsulta,
            })
          }
        />

        {/* Modal Excluir Usuário */}
        <Portal>
          <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
            <Dialog.Title>Atenção!</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Tem certeza que deseja excluir este consulta?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideModal}>VOLTAR</Button>
              <Button onPress={handleExluirConsulta}>SIM</Button>
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
    backgroundColor: "rgba(76, 175, 80, 0.2)",
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
