import { View, Pressable, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/Styles";

const CompletionBtns = ({ onDisplayCompletedAlert, onDisplayAlert }) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button}>
        <Text style={styles.text} onPress={onDisplayCompletedAlert}>
          Completed
        </Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.text} onPress={onDisplayAlert}>
          Reject
        </Text>
      </Pressable>
    </View>
  );
};

export default CompletionBtns;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 32,
    margin: 10,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: GlobalStyles.colors.black,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
  icon: {
    width: 70,
    height: 70,
    margin: 20,
  },
});
