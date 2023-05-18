import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/Styles";

const Buttons = ({ onSaveForm }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.back}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.text}>Back</Text>
      </Pressable>
      <Pressable style={styles.signIn} onPress={onSaveForm}>
        <Text style={styles.text}>Register</Text>
      </Pressable>
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    flex: 1,
  },
  back: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    height: 60,
    marginHorizontal: 20,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: GlobalStyles.colors.yellow,
  },
  signIn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    height: 60,
    marginHorizontal: 20,
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
