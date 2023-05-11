import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";

import { GlobalStyles } from "../constants/Styles";
import SignInForm from "../components/SignIn/SignInForm";
import Buttons from "../components/SignIn/Buttons";
import SignInTitle from "../components/SignIn/SignInTitle";
import CustomerForm from "../components/SignIn/CustomerForm";

const SignInScreen = () => {
  const [components, setComponents] = useState(<CustomerForm />);

  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 0.5 }}></View>
      <SignInTitle onSetComponents={setComponents} />
      {components}
      <View style={{ flex: 1 }}></View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.black,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    color: GlobalStyles.colors.white,
    fontSize: 30,
    fontWeight: "bold",
  },
});
