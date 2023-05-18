import { View, TextInput, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";

import { GlobalStyles } from "../../constants/Styles";
import Buttons from "./Buttons";
import {customerLogin} from "../../util/customerHttp";
import { AuthContext } from "../../util/auth-context";

const CustomerForm = () => {
  const navigation = useNavigation();

  const [inputs, setInputs] = useState({
    email: "roshanmanohar.10v@gmail.com",
    password: "password",
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
    
    const loginDetails = { email: inputs.email, password: inputs.password };
    console.log(loginDetails)
    
    try {
      const customerToken = await customerLogin(loginDetails);
      console.log(customerToken)
      
      if (Object.keys(customerToken)[0] === "message") {
        Alert.alert("Sign In", customerToken.message);
      } else if (Object.keys(customerToken)[0] === "token") {
        authCtx.authenticate(customerToken.token, "customer");
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
