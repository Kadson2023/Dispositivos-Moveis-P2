import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function FormMedico({ navigation, route }) {
  const { acao, medico: medicoAntigo } = route.params;

  const [nome, setNome] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [crm, setCrm] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  const [showMensagemErro, setShowMensagemErro] = useState(false);

  useEffect(() => {
    console.log("medico -> ", medicoAntigo);

    if (medicoAntigo) {
      setNome(medicoAntigo.nome);
      setEspecialidade(medicoAntigo.especialidade);
      setCrm(medicoAntigo.crm);
      setEndereco(medicoAntigo.endereco);
      setTelefone(medicoAntigo.telefone);
    }
  }, []);

  function salvar() {
    if (nome === "" || especialidade === "" || endereco === "" || crm === "" || telefone === "") {
      setShowMensagemErro(true);
    } else {
      setShowMensagemErro(false);

      const novoMedico = {
        nome: nome,
        especialidade: especialidade,
        endereco: endereco,
        crm: crm,
        telefone: telefone
      };

      const objetoEmString = JSON.stringify(novoMedico);
      console.log(
        "🚀 ~ file: FormMedico.js:47 ~ salvar ~ objetoEmString:",
        objetoEmString
      );

      console.log(typeof objetoEmString);

      const objeto = JSON.parse(objetoEmString);
      console.log("🚀 ~ file: FormMedico.js:52 ~ salvar ~ objeto:", objeto);

      console.log(typeof objeto);

      if (medicoAntigo) {
        acao(medicoAntigo, novoMedico);
      } else {
        acao(novoMedico);
      }

      Toast.show({
        type: "success",
        text1: "Médico cadastrado com sucesso!",
      });

      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {medicoAntigo ? "Editar Médico" : "Adicionar Médico"}
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
          label={"Especialidade"}
          mode="outlined"
          value={especialidade}
          onChangeText={(text) => setEspecialidade(text)}
          onFocus={() => setShowMensagemErro(false)}
        />

        <TextInput
          style={styles.input}
          label={"Endereço"}
          mode="outlined"
          value={endereco}
          onChangeText={(text) => setEndereco(text)}
          onFocus={() => setShowMensagemErro(false)}
        />

        <TextInput
          style={styles.input}
          label={"Crm"}
          mode="outlined"
          value={crm}
          onChangeText={(text) => setCrm(text)}
          onFocus={() => setShowMensagemErro(false)}
        />

        <TextInput
          style={styles.input}
          label={"Telefone"}
          mode="outlined"
          value={telefone}
          onChangeText={(text) => setTelefone(text)}
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
