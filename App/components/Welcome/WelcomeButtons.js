import { View, Text, Pressable, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/Styles";

const WelcomeButtons = ({ onNavigateScreen }) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.signIn}
        onPress={() => onNavigateScreen("SignIn")}
      >
        <Text style={styles.text}>Sign In</Text>
      </Pressable>
      <Pressable
        style={styles.register}
        onPress={() => onNavigateScreen("Register")}
      >
        <Text style={styles.text}>Register</Text>
      </Pressable>
    </View>
  );
};

export default WelcomeButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
  },
  signIn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    margin: 30,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: GlobalStyles.colors.lightblue,
  },
  register: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    margin: 30,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: GlobalStyles.colors.yellow,
  },
  text: {
    fontSize: GlobalStyles.textHeading,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: GlobalStyles.colors.black,
    fontWeight: "bold",
  },
});
