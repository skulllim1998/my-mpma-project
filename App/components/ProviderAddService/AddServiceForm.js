import { View, TextInput, Text, StyleSheet } from "react-native";
import { useState } from "react";

import { GlobalStyles } from "../../constants/Styles";
import ServiceCreate from "../../models/serviceCreate";

const AddServiceForm = ({ editedService, onSetEditedService }) => {
  //   const [inputs, setInputs] = useState({
  //     name: "",
  //     description: "",
  //   });

  //   const inputChangedHandler = (inputIdentifier, enteredInput) => {
  //     setInputs((currentInputs) => {
  //       return {
  //         ...currentInputs,
  //         [inputIdentifier]: enteredInput,
  //       };
  //     });
  //   };
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const nameChangedHandler = (enteredName) => {
    setName(enteredName);
    onSetEditedService(
      new ServiceCreate(
        enteredName,
        description,
        editedService.price_range,
        editedService.category
      )
    );
  };

  const descriptionChangedHandler = (enteredDescription) => {
    setDescription(enteredDescription);
    onSetEditedService(
      new ServiceCreate(
        name,
        enteredDescription,
        editedService.price_range,
        editedService.category
      )
    );
  };

  return (
    <View>
      <Text style={styles.title}>Set name for your service:</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          onChangeText={nameChangedHandler}
          value={name}
        />
      </View>
      <Text style={styles.title}>Set description for your service:</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Description"
          multiline={true}
          numberOfLines={5}
          onChangeText={descriptionChangedHandler}
          value={description}
        />
      </View>
    </View>
  );
};

export default AddServiceForm;

const styles = StyleSheet.create({
  title: {
    marginLeft: 40,
    marginVertical: 30,
    fontSize: GlobalStyles.textHeading,
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    color: "#120438",
    borderRadius: 10,
    width: "90%",
    padding: 10,
  },
  container: {
    marginLeft: 40,
  },
  containerTitle: {
    fontSize: GlobalStyles.textHeading,
    marginHorizontal: 10,
  },
});
