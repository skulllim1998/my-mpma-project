import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/Styles";
import Buttons from "./Buttons";
import { loginProvider } from "../../util/providerHttp";

const SignInForm = () => {
  const navigation = useNavigation();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

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
    const response = await loginProvider(editedProvider);
    if (response.message === "Email not recognised") {
      alert(response.message);
    } else {
      navigation.navigate("ProviderScreens");
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

export default SignInForm;

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
