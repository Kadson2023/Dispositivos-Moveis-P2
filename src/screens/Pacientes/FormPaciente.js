import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  nome: Yup.string().required("O Nome é obrigatório!"),
  idade: Yup.number()
    .required("A idade é obrigatória!")
    .positive("A idade deve ser um número positivo!")
    .integer("A idade deve ser um número inteiro!"),
  endereco: Yup.string().required("O endereço é obrigatório!"),
  email: Yup.string().required("O e-mail é obrigatório!"),
  medicacoes: Yup.string().required("As medicações são obrigatórias!"),
  cpf: Yup.string().required("O CPF é obrigatório!"),
  telefone: Yup.string().required("O telefone é obrigatório!"),
});

export default function FormPaciente({ navigation, route }) {
  const { acao, paciente: pacienteAntigo } = route.params;

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [medicacoes, setMedicacoes] = useState("");
  const [showMensagemErro, setShowMensagemErro] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (pacienteAntigo) {
      setNome(pacienteAntigo.nome);
      setIdade(pacienteAntigo.idade.toString());
      setEndereco(pacienteAntigo.endereco);
      setEmail(pacienteAntigo.email);
      setMedicacoes(pacienteAntigo.medicacoes);
      setCpf(pacienteAntigo.cpf);
      setTelefone(pacienteAntigo.telefone);
    }
  }, [pacienteAntigo]);

  async function handleValidation() {
    try {
      await validationSchema.validate(
        { nome, idade, endereco, email, medicacoes, cpf, telefone },
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
          idade: idadeNumber,
          endereco,
          email,
          medicacoes,
          cpf,
          telefone
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
        {errors.nome && <Text style={{ color: "red" }}>{errors.nome}</Text>}

        <TextInput
          style={styles.input}
          label={"CPF"}
          mode="outlined"
          placeholder="000.000.000-00"
          value={cpf}
          onChangeText={(text) => setCpf(text)}
          onFocus={() => setShowMensagemErro(false)}
          render={(props) => (
            <TextInputMask 
            {...props}
            type={'cpf'}
            />
          )}
        />
        {errors.cpf && <Text style={{ color: "red" }}>{errors.cpf}</Text>}

        <TextInput
          style={styles.input}
          label={"Telefone"}
          mode="outlined"
          placeholder="(00) 0 0000-0000"
          value={telefone}
          onChangeText={(text) => setTelefone(text)}
          onFocus={() => setShowMensagemErro(false)}
          render={(props) => (
            <TextInputMask 
            {...props}
            type={'cel-phone'}
            />
          )}
        />
        {errors.telefone && <Text style={{ color: "red" }}>{errors.telefone}</Text>}

        <TextInput
          style={styles.input}
          label={"Idade"}
          mode="outlined"
          keyboardType="numeric"
          value={idade}
          onChangeText={(text) => setIdade(text)}
          onFocus={() => setShowMensagemErro(false)}
        />
        {errors.idade && <Text style={{ color: "red" }}>{errors.idade}</Text>}

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
          label={"Email"}
          mode="outlined"
          value={email}
          onChangeText={(text) => setEmail(text)}
          onFocus={() => setShowMensagemErro(false)}
        />
        {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}

        <TextInput
          style={styles.input}
          label={"Medicações"}
          mode="outlined"
          value={medicacoes}
          onChangeText={(text) => setMedicacoes(text)}
          onFocus={() => setShowMensagemErro(false)}
        />
        {errors.medicacoes && <Text style={{ color: "red" }}>{errors.medicacoes}</Text>}

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