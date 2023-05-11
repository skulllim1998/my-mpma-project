import { View, StyleSheet } from "react-native";
import { useState } from "react";

import { GlobalStyles } from "../constants/Styles";
import RegisterTitle from "../components/Register/RegisterTitle";
import CustomerForm from "../components/Register/CustomerForm";

const RegisterScreen = () => {
  const [components, setComponents] = useState(<CustomerForm />);

  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 0.5 }}></View>
      <RegisterTitle onSetComponents={setComponents} />
      {components}
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "yellow",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.black,
  },
});
