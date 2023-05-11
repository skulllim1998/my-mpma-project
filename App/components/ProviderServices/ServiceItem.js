import { View, Text, StyleSheet, Pressable } from "react-native";

import { GlobalStyles } from "../../constants/Styles";

const ServiceItem = ({ name, description, price_range }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.paragraph}>{description}</Text>
      <Text style={styles.paragraph}>{price_range}</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Edit</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ServiceItem;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 15,
    backgroundColor: GlobalStyles.colors.yellow,
    elevation: 16,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 15,
  },
  title: {
    marginHorizontal: 20,
    marginTop: 20,
    fontSize: GlobalStyles.textHeading,
  },
  paragraph: {
    margin: 20,
    fontSize: GlobalStyles.textParagraph,
  },
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
});
