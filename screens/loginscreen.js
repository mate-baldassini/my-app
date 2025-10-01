import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles";

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    if (user === "admin" && pass === "1234") {
      navigation.replace("Home");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Login</Text>
      <TextInput
        placeholder="Usuario"
        value={user}
        onChangeText={setUser}
        style={globalStyles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={pass}
        secureTextEntry
        onChangeText={setPass}
        style={globalStyles.input}
      />
      <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}
