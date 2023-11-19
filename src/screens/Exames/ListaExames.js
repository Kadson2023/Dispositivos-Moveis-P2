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

export default function ListaExames({ navigation, route }) {
  const [exames, setExames] = useState([]);
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false);
  const [exameASerExcluido, setExameASerExcluido] = useState(null);

  useEffect(() => {
    loadExames();
  }, []);

  async function loadExames() {
    const response = await AsyncStorage.getItem("exames");
    console.log(
      "🚀 ~ file: ListaExamesAsyncStorage.js:21 ~ loadExames ~ response:",
      response
    );
    const examesStorage = response ? JSON.parse(response) : [];
    setExames(examesStorage);
  }

  const showModal = () => setShowModalExcluirUsuario(true);

  const hideModal = () => setShowModalExcluirUsuario(false);

  async function adicionarExame(exame) {
    let novaListaExames = exames;
    novaListaExames.push(exame);
    await AsyncStorage.setItem("exames", JSON.stringify(novaListaExames));
    setExames(novaListaExames);
  }

  async function editarExame(exameAntigo, novosDados) {
    console.log("EXAME ANTIGO -> ", exameAntigo);
    console.log("DADOS NOVOS -> ", novosDados);

    const novaListaExames = exames.map((exame) => {
      if (exame == exameAntigo) {
        return novosDados;
      } else {
        return exame;
      }
    });

    await AsyncStorage.setItem("exames", JSON.stringify(novaListaExames));
    setExames(novaListaExames);
  }

  async function excluirExame(exame) {
    const novaListaExames = exames.filter((p) => p !== exame);
    await AsyncStorage.setItem("exames", JSON.stringify(novaListaExames));
    setExames(novaListaExames);
    Toast.show({
      type: "success",
      text1: "Exame excluído com sucesso!",
    });
  }

  function handleExluirExame() {
    excluirExame(exameASerExcluido);
    setExameASerExcluido(null);
    hideModal();
  }

  return (
    <>
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          Lista de Exames
        </Text>

        <FlatList
          style={styles.list}
          data={exames}
          renderItem={({ item }) => (
            <Card mode="outlined" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.textContainer}>
                <Avatar.Image size={50} source={require('../../../assets/logoexame.png')} />
                  <Text variant="titleMedium" style={styles.text}>
                    {item?.nome}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    Data: {item?.data}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    Descrição: {item.descricao}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text variant="bodyLarge" style={styles.text}>
                    Médico: {item?.medico}
                  </Text>
                  <Divider style={styles.divider} />
                </View>
              </Card.Content>
              <Card.Actions style={styles.buttonsContainer}>
                <View style={styles.buttonsWrapper}>
                  <Button
                    onPress={() =>
                      navigation.push("FormExame", {
                        acao: editarExame,
                        exame: item,
                      })
                    }
                    style={styles.editButton}
                    labelStyle={styles.buttonLabel}
                  >
                    Editar
                  </Button>
                  <Button
                    onPress={() => {
                      setExameASerExcluido(item);
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
            navigation.push("FormExame", {
              acao: adicionarExame,
            })
          }
        />

        {/* Modal Excluir Usuário */}
        <Portal>
          <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
            <Dialog.Title>Atenção!</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Tem certeza que deseja excluir este exame?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideModal}>VOLTAR</Button>
              <Button onPress={handleExluirExame}>SIM</Button>
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