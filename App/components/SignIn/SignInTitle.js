import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

import { GlobalStyles } from "../../constants/Styles";
import CustomerForm from "./CustomerForm";
import ProviderForm from "./ProviderForm";

const SignInTitle = ({ onSetComponents }) => {
  const [colors, setColors] = useState({
    customerColor: GlobalStyles.colors.yellow,
    providerColor: "",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIGN IN</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.customer, { backgroundColor: colors.customerColor }]}
          onPress={() => {
            setColors({
              customerColor: GlobalStyles.colors.yellow,
              providerColor: GlobalStyles.colors.white,
            });
            onSetComponents(<CustomerForm />);
          }}
        >
          <Text style={styles.text}>Customer</Text>
        </Pressable>
        <Pressable
          style={[styles.provider, { backgroundColor: colors.providerColor }]}
          onPress={() => {
            setColors({
              customerColor: GlobalStyles.colors.white,
              providerColor: GlobalStyles.colors.yellow,
            });
            onSetComponents(<ProviderForm />);
          }}
        >
          <Text style={styles.text}>Provider</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignInTitle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: GlobalStyles.colors.white,
    fontSize: 30,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: GlobalStyles.colors.white,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 5,
    borderRadius: 30,
  },
  customer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    marginLeft: 10,
    borderRadius: 30,
  },
  provider: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    marginRight: 10,
    borderRadius: 30,
  },
  text: {
    fontSize: GlobalStyles.textHeading,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: GlobalStyles.colors.black,
    fontWeight: "bold",
  },
});
