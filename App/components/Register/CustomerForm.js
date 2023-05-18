import { View, TextInput, StyleSheet, Alert } from "react-native";
import { useState } from "react";

import { GlobalStyles } from "../../constants/Styles";
import RegisterCustomer from "../../models/registerCustomer";
import Buttons from "./Buttons";
import { registerNewCustomer } from "../../util/customerHttp";

const CustomerForm = () => {

  //storing the input data on regsitration form for customer
  const [inputs, setInputs] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
    phoneNumber: ""
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const inputChangedHandler = (inputIdentifier, enteredInput) => {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: enteredInput,
      };
    });
  }

  const saveForm = async () => {
    const newCustomerDetails = new RegisterCustomer(
      inputs.name,
      inputs.address,
      inputs.email,
      inputs.password,
      inputs.phoneNumber
    );
    console.log(newCustomerDetails)
    
    if(inputs.password != confirmPassword) {
      alert("Password and Confirm Password do not match.")
      Alert.alert("Register Failed", "Password and Confirm Password do not match.");
      return;
    }

    try {
      const newCustomer = await registerNewCustomer(newCustomerDetails);
      console.log(newCustomer)
      if (newCustomer !== null) {
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
            placeholder="Name"
            onChangeText={inputChangedHandler.bind(this, "name")}
            value={inputs.name} />
        </View>
        <View style={styles.container}>
          <TextInput 
            style={styles.textInput}
            placeholder="Address"
            onChangeText={inputChangedHandler.bind(this, "address")}
            value={inputs.address} />
        </View>
        <View style={styles.container}>
          <TextInput 
            style={styles.textInput}
            placeholder="Phone Number"
            onChangeText={inputChangedHandler.bind(this, "phoneNumber")}
            value={inputs.phoneNumber} />
        </View>
        <View style={styles.container}>
          <TextInput 
            style={styles.textInput}
            placeholder="Email"
            onChangeText={inputChangedHandler.bind(this, "email")}
            value={inputs.email} />
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
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Confirm Password"
            onChangeText= {confirmPasswordText => setConfirmPassword(confirmPasswordText)}
            value={confirmPassword}
          />
        </View>
      </View>
      <Buttons  onSaveForm={saveForm} />
    </>
  );
};

export default CustomerForm;

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
