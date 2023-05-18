import { View, TextInput, StyleSheet, Button, Alert } from "react-native";
import { useState } from "react";

import { GlobalStyles } from "../../constants/Styles";
import ProviderCreate from "../../models/providerCreate";
import Buttons from "./Buttons";
import { createProvider } from "../../util/providerHttp";

const ProviderForm = () => {
  const [inputs, setInputs] = useState({
    compName: "",
    phoneNo: "",
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
    const editedProvider = new ProviderCreate(
      inputs.compName,
      inputs.phoneNo,
      inputs.email,
      inputs.password
    );

    try {
      const createdProvider = await createProvider(editedProvider);
      if (createdProvider !== null) {
        Alert.alert("Register", "Account created successfully.");
      }
    } catch (error) {
      Alert.alert("Register Failed", "Something went wrong.");
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder="Company Name"
            onChangeText={inputChangedHandler.bind(this, "compName")}
            value={inputs.compName}
          />
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder="Phone Number"
            onChangeText={inputChangedHandler.bind(this, "phoneNo")}
            value={inputs.phoneNo}
          />
        </View>
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
    flex: 3,
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
