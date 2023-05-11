import { View, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";

import { GlobalStyles } from "../../constants/Styles";
import Buttons from "./Buttons";
import { loginProvider } from "../../util/providerHttp";
import { AuthContext } from "../../util/auth-context";

const ProviderForm = () => {
  const navigation = useNavigation();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const authCtx = useContext(AuthContext);

  const inputChangedHandler = (inputIdentifier, enteredInput) => {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: enteredInput,
      };
    });
  };

  const saveForm = async () => {
    const editedProvider = { email: inputs.email, password: inputs.password };

    try {
      const response = await loginProvider(editedProvider);
      if (response.message === "Email not recognised") {
        Alert.alert("Sign In", response.message);
      } else {
        authCtx.authenticate(response.token, "provider");
        navigation.navigate("ProviderScreens");
      }
    } catch (error) {
      Alert.alert("Sign In Failed", "Something went wrong.");
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={inputChangedHandler.bind(this, "email")}
            value={inputs.email}
          />
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={inputChangedHandler.bind(this, "password")}
            value={inputs.password}
          />
        </View>
      </View>
      <Buttons onSaveForm={saveForm} />
    </>
  );
};

export default ProviderForm;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1.5,
    justifyContent: "center",
  },
  textInput: {
    color: "#120438",
    borderRadius: 15,
    padding: 10,
    margin: 10,
    backgroundColor: GlobalStyles.colors.white,
  },
  container: {
    marginHorizontal: 30,
  },
  containerTitle: {
    fontSize: GlobalStyles.textHeading,
    marginHorizontal: 10,
  },
});
