import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function FormExame({ navigation, route }) {
  const { acao, exame: exameAntigo } = route.params;

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [medico, setMedico] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [showMensagemErro, setShowMensagemErro] = useState(false);

  useEffect(() => {
    console.log("exame -> ", exameAntigo);

    if (exameAntigo) {
      setNome(exameAntigo.nome);
      setDescricao(exameAntigo.descricao);
      setData(exameAntigo.data);
      setMedico(exameAntigo.medico);
    }
  }, []);

  function salvar() {
    if (nome === "" || data === "" || medico === "" || descricao === "") {
      setShowMensagemErro(true);
    } else {
      setShowMensagemErro(false);

      const novoExame = {
        nome: nome,
        data: data,
        medico: medico,
        descricao: descricao,
      };

      const objetoEmString = JSON.stringify(novoExame);
      console.log(
        "🚀 ~ file: FormExame.js:47 ~ salvar ~ objetoEmString:",
        objetoEmString
      );

      console.log(typeof objetoEmString);

      const objeto = JSON.parse(objetoEmString);
      console.log("🚀 ~ file: FormExame.js:52 ~ salvar ~ objeto:", objeto);

      console.log(typeof objeto);

      if (exameAntigo) {
        acao(exameAntigo, novoExame);
      } else {
        acao(novoExame);
      }

      Toast.show({
        type: "success",
        text1: "Exame cadastrado com sucesso!",
      });

      navigation.goBack();
    }
  }

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setData(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {exameAntigo ? "Editar Exame" : "Adicionar Exame"}
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

        <Button
          title="Selecionar Data"
          onPress={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={data || new Date()} // Use a default date if data is undefined
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        <TextInput
          style={styles.input}
          label="Data"
          mode="outlined"
          value={data ? data.toLocaleDateString() : ""} // Check if data is defined before calling toLocaleDateString
          onFocus={() => setShowDatePicker(true)}
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
          label={"Médico"}
          mode="outlined"
          value={medico}
          onChangeText={(text) => setMedico(text)}
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
