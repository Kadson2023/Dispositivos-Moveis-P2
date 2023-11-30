import { validateYupSchema } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  nome: Yup.string().required("O Nome é obrigatório!"),
  especialidade: Yup.string.required(),
  crm: Yup.string().required("O endereço é obrigatório!"),
  endereco: Yup.string().required("O e-mail é obrigatório!"),
  telefone: Yup.string().required("O telefone é obrigatório!"),
});


export default function FormMedico({ navigation, route }) {
  const { acao, medico: medicoAntigo } = route.params;

  const [nome, setNome] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [crm, setCrm] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  const [showMensagemErro, setShowMensagemErro] = useState(false);
  const [errors, setErrors] = useState({});

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

  async function handleValidation() {
    try {
      await validationSchema.validate(
        { nome, especialidade, crm, endereco, telefone },
        { abortEarly: false }
      );
      return true;
    } catch (error) {
      const formattedErrors = {};
      error.inner.forEach((err) => {
        formattedErrors[err.path] = err.message;
      });
      setErrors(formattedErrors);
      return false;
    }
  }

  function salvar() {
    handleValidation().then((isValid) => {
      if (isValid) {
        const idadeNumber = parseInt(idade, 10);
        const novoPaciente = {
          nome,
          especialidade,
          crm,
          endereco,
          telefone,
        };

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
      } else {
        setShowMensagemErro(true);
      }
    });
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
        {errors.nome && <Text style={{ color: "red" }}>{errors.nome}</Text>}

        <TextInput
          style={styles.input}
          label={"Especialidade"}
          mode="outlined"
          value={especialidade}
          onChangeText={(text) => setEspecialidade(text)}
          onFocus={() => setShowMensagemErro(false)}
        />
        {errors.especialidade && <Text style={{ color: "red" }}>{errors.especialidade}</Text>}

        <TextInput
          style={styles.input}
          label={"Endereço"}
          mode="outlined"
          value={endereco}
          onChangeText={(text) => setEndereco(text)}
          onFocus={() => setShowMensagemErro(false)}
        />
        {errors.endereco && <Text style={{ color: "red" }}>{errors.endereco}</Text>}

        <TextInput
          style={styles.input}
          label={"Crm"}
          mode="outlined"
          value={crm}
          onChangeText={(text) => setCrm(text)}
          onFocus={() => setShowMensagemErro(false)}
        />
        {errors.crm && <Text style={{ color: "red" }}>{errors.crm}</Text>}

        <TextInput
          style={styles.input}
          label={"Telefone"}
          mode="outlined"
          value={telefone}
          onChangeText={(text) => setTelefone(text)}
          onFocus={() => setShowMensagemErro(false)}
        />
        {errors.telefone && <Text style={{ color: "red" }}>{errors.telefone}</Text>}

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
