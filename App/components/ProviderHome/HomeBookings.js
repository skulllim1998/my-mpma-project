import { StyleSheet, View, Text } from "react-native";

import { GlobalStyles } from "../../constants/Styles";

const HomeBookings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your bookings</Text>
    </View>
  );
};

export default HomeBookings;

const styles = StyleSheet.create({
  container: {
    margin: 30,
    height: 200,
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
  },
  paragraph: {
    margin: 20,
    fontSize: GlobalStyles.paragraph,
  },
});
