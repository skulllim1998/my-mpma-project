import { View, Text, StyleSheet, Pressable, Image, Alert } from "react-native";

import { GlobalStyles } from "../../constants/Styles";

const EarningItem = ({ date, price, address }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image
          style={styles.icon}
          source={require("../../../assets/booking1.png")}
        />
        <View>
          <View style={styles.rowContainer}>
            <Text style={styles.paragraph}>{date}</Text>
            <Text style={styles.title}>+ RM {price}</Text>
          </View>
          <Text style={styles.title}>{address}</Text>
        </View>
      </View>
    </View>
  );
};

export default EarningItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: GlobalStyles.colors.yellow,
    elevation: 16,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 15,
  },
  rowContainer: {
    flexDirection: "row",
  },
  title: {
    marginHorizontal: 20,
    margin: 20,
    fontSize: GlobalStyles.textHeading,
  },
  paragraph: {
    margin: 20,
    fontSize: GlobalStyles.textHeading,
    fontWeight: "bold",
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
  icon: {
    width: 70,
    height: 70,
    margin: 20,
  },
});
