import { View, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/Styles";
import Buttons from "./Buttons";

const CustomerForm = () => {
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
      <Buttons />
    </>
  );
};

export default CustomerForm;

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
