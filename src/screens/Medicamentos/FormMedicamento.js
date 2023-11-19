import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function FormMedicamento({ navigation, route }) {
  const { acao, medicamento: medicamentoAntigo } = route.params;

  const [nome, setNome] = useState("");
  const [dosagem, setDosagem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [efeitos, setEfeitos] = useState("");
  const [fabricante, setFabricante] = useState("");

  const [showMensagemErro, setShowMensagemErro] = useState(false);

  useEffect(() => {
    console.log("medicamento -> ", medicamentoAntigo);

    if (medicamentoAntigo) {
      setNome(medicamentoAntigo.nome);
      setDosagem(medicamentoAntigo.dosagem);
      setDescricao(medicamentoAntigo.descricao);
      setEfeitos(medicamentoAntigo.efeitos);
      setFabricante(medicamentoAntigo.fabricante);
    }
  }, []);

  function salvar() {
    if (nome === "" || dosagem === "" || efeitos === "" || descricao === "" || fabricante === "") {
      setShowMensagemErro(true);
    } else {
      setShowMensagemErro(false);

      const novoMedicamento = {
        nome: nome,
        dosagem: dosagem,
        efeitos: efeitos,
        descricao: descricao,
        fabricante: fabricante
      };

      const objetoEmString = JSON.stringify(novoMedicamento);
      console.log(
        "🚀 ~ file: FormMedicamento.js:47 ~ salvar ~ objetoEmString:",
        objetoEmString
      );

      console.log(typeof objetoEmString);

      const objeto = JSON.parse(objetoEmString);
      console.log("🚀 ~ file: FormMedicamento.js:52 ~ salvar ~ objeto:", objeto);

      console.log(typeof objeto);

      if (medicamentoAntigo) {
        acao(medicamentoAntigo, novoMedicamento);
      } else {
        acao(novoMedicamento);
      }

      Toast.show({
        type: "success",
        text1: "Medicamento cadastrado com sucesso!",
      });

      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {medicamentoAntigo ? "Editar Medicamento" : "Adicionar Medicamento"}
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          label={"Nome"}
          mode="outlined"
          value={nome}
          onChangeText={(text) => setNome(text)}
          onFocus={() => setShowMensagemErro(false)}
        />

        <TextInput
          style={styles.input}
          label={"Dosagem"}
          mode="outlined"
          value={dosagem}
          onChangeText={(text) => setDosagem(text)}
          onFocus={() => setShowMensagemErro(false)}
        />

        <TextInput
          style={styles.input}
          label={"Efeitos"}
          mode="outlined"
          value={efeitos}
          onChangeText={(text) => setEfeitos(text)}
          onFocus={() => setShowMensagemErro(false)}
        />

        <TextInput
          style={styles.input}
          label={"Descrição"}
          mode="outlined"
          value={descricao}
          onChangeText={(text) => setDescricao(text)}
          onFocus={() => setShowMensagemErro(false)}
        />

        <TextInput
          style={styles.input}
          label={"Fabricante"}
          mode="outlined"
          value={fabricante}
          onChangeText={(text) => setFabricante(text)}
          onFocus={() => setShowMensagemErro(false)}
        />

        {showMensagemErro && (
          <Text style={{ color: "red", textAlign: "center" }}>
            Todos os campos são obrigatórios!
          </Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          mode="contained-tonal"
          onPress={() => navigation.goBack()}
        >
          Voltar
        </Button>

        <Button style={styles.button} mode="contained" onPress={salvar}>
          Salvar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    margin: 10,
  },
  inputContainer: {
    width: "90%",
    flex: 1,
  },
  input: {
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "90%",
    gap: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
  },
});
