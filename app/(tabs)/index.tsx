import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import axios from "axios";

const App = () => {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setAddress(response.data);
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress(null);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
      }}
      //Estilização do fundo
    >
      <TextInput
        style={{
          borderColor: "black",
          borderWidth: 1,
          borderRadius: 2,
          width: 150,
        }}
        //estilização do text input
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />
      <Button title="Buscar Endereço" onPress={fetchAddress} />
      {address && (
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 4,
            width: 200,
            height: 110,
            marginTop: 7,
          }}
          //Estilização da View dos resultados
        >
          <Text style={{ marginTop: 2, marginLeft: 6 }}>
            CEP: {address.cep}
          </Text>
          <Text style={{ marginTop: 2, marginLeft: 6 }}>
            Rua: {address.logradouro}
          </Text>
          <Text style={{ marginTop: 2, marginLeft: 6 }}>
            Bairro: {address.bairro}
          </Text>
          <Text style={{ marginTop: 2, marginLeft: 6 }}>
            Cidade: {address.localidade}
          </Text>
          <Text style={{ marginTop: 2, marginLeft: 6 }}>
            Estado: {address.uf}
          </Text>
        </View>
        //Estilização dos resultados 
      )}
    </View>
  );
};

export default App;
