import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function FormConsulta({ navigation, route }) {
  const { acao, consulta: consultaAntiga } = route.params;

  const [data, setData] = useState("");
  const [medico, setMedico] = useState("");
  const [paciente, setPaciente] = useState("");
  const [motivo, setMotivo] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [showMensagemErro, setShowMensagemErro] = useState(false);

  useEffect(() => {
    console.log("consulta -> ", consultaAntiga);

    if (consultaAntiga) {
      setPaciente(consultaAntiga.paciente);
      setMotivo(consultaAntiga.motivo);
      setData(consultaAntiga.data);
      setMedico(consultaAntiga.medico);
      setObservacoes(consultaAntiga.observacoes);
    }
  }, []);

  function salvar() {
    if (
      paciente === "" ||
      data === "" ||
      medico === "" ||
      motivo === "" ||
      observacoes === ""
    ) {
      setShowMensagemErro(true);
    } else {
      setShowMensagemErro(false);

      const novaConsulta = {
        paciente: paciente,
        data: data,
        medico: medico,
        motivo: motivo,
        observacoes: observacoes,
      };

      const objetoEmString = JSON.stringify(novaConsulta);
      console.log(
        "🚀 ~ file: FormConsulta.js:47 ~ salvar ~ objetoEmString:",
        objetoEmString
      );

      console.log(typeof objetoEmString);

      const objeto = JSON.parse(objetoEmString);
      console.log("🚀 ~ file: FormConsulta.js:52 ~ salvar ~ objeto:", objeto);

      console.log(typeof objeto);

      if (consultaAntiga) {
        acao(consultaAntiga, novaConsulta);
      } else {
        acao(novaConsulta);
      }

      Toast.show({
        type: "success",
        text1: "Consulta cadastrada com sucesso!",
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
        {consultaAntiga ? "Editar Consulta" : "Adicionar Consulta"}
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          label={"Paciente"}
          mode="outlined"
          value={paciente}
          onChangeText={(text) => setPaciente(text)}
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
          label={"Motivo"}
          mode="outlined"
          value={motivo}
          onChangeText={(text) => setMotivo(text)}
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

        <TextInput
          style={styles.input}
          label={"Observações"}
          mode="outlined"
          value={observacoes}
          onChangeText={(text) => setObservacoes(text)}
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
