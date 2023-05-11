import { View, TextInput, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/Styles";
import Buttons from "./Buttons";

const CustomerForm = () => {
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <TextInput style={styles.textInput} placeholder="Name" />
        </View>
        <View style={styles.container}>
          <TextInput style={styles.textInput} placeholder="Address" />
        </View>
        <View style={styles.container}>
          <TextInput style={styles.textInput} placeholder="Email" />
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Password"
          />
        </View>
        <View style={styles.container}>
          <TextInput style={styles.textInput} placeholder="Phone Number" />
        </View>
      </View>
      <Buttons />
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
