import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function FormPaciente({ navigation, route }) {
  const { acao, paciente: pacienteAntigo } = route.params;

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [alergias, setAlergias] = useState("");
  const [medicacoes, setMedicacoes] = useState("");

  const [showMensagemErro, setShowMensagemErro] = useState(false);

  useEffect(() => {
    console.log("paciente -> ", pacienteAntigo);

    if (pacienteAntigo) {
      setNome(pacienteAntigo.nome);
      setIdade(pacienteAntigo.idade);
      setEndereco(pacienteAntigo.endereco);
      setAlergias(pacienteAntigo.alergias);
      setMedicacoes(pacienteAntigo.medicacoes);
    }
  }, []);

  function salvar() {
    if (nome === "" || idade === "" || endereco === "" || alergias === "" || medicacoes === "") {
      setShowMensagemErro(true);
    } else {
      setShowMensagemErro(false);

      const novoPaciente = {
        nome: nome,
        idade: idade,
        endereco: endereco,
        alergias: alergias,
        medicacoes: medicacoes
      };

      const objetoEmString = JSON.stringify(novoPaciente);
      console.log(
        "🚀 ~ file: FormPaciente.js:47 ~ salvar ~ objetoEmString:",
        objetoEmString
      );

      console.log(typeof objetoEmString);

      const objeto = JSON.parse(objetoEmString);
      console.log("🚀 ~ file: FormPaciente.js:52 ~ salvar ~ objeto:", objeto);

      console.log(typeof objeto);

      if (pacienteAntigo) {
        acao(pacienteAntigo, novoPaciente);
      } else {
        acao(novoPaciente);
      }

      Toast.show({
        type: "success",
        text1: "Paciente cadastrado com sucesso!",
      });

      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {pacienteAntigo ? "Editar Paciente" : "Adicionar Paciente"}
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
          label={"Idade"}
          mode="outlined"
          keyboardType="numeric"
          value={idade}
          onChangeText={(text) => setIdade(text)}
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
          label={"Alergias"}
          mode="outlined"
          value={alergias}
          onChangeText={(text) => setAlergias(text)}
          onFocus={() => setShowMensagemErro(false)}
        />

        <TextInput
          style={styles.input}
          label={"Medicações"}
          mode="outlined"
          value={medicacoes}
          onChangeText={(text) => setMedicacoes(text)}
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
