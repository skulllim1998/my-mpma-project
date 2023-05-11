import { View, Text, StyleSheet, Pressable, Button } from "react-native";

import { GlobalStyles } from "../../constants/Styles";

const SaveBtn = ({ onSaveForm }) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onSaveForm}>
        <Text style={styles.text}>Save</Text>
      </Pressable>
    </View>
  );
};

export default SaveBtn;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    width: "40%",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 32,
    margin: 10,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: GlobalStyles.colors.black,
  },
  text: {
    fontSize: GlobalStyles.textParagraph,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
});
