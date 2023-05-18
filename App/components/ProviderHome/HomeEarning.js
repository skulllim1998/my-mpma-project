import { StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";

import { GlobalStyles } from "../../constants/Styles";
import { BookingContext } from "../../util/booking-context";

const HomeEarning = () => {
  const bookingCtx = useContext(BookingContext);
  const navigation = useNavigation();
  const [totalEarning, setTotalEarning] = useState(0);

  useEffect(() => {
    calculateEarning();
  }, []);

  const calculateEarning = () => {
    let total = 0;
    bookingCtx.paymentCompletedBookings.forEach((booking) => {
      total = total + booking.price;
    });
    setTotalEarning(total);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your total earnings</Text>
      <Text style={styles.paragraph}>RM {totalEarning}</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text
            style={styles.text}
            onPress={() => {
              navigation.navigate("ProviderEarning");
            }}
          >
            View More
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeEarning;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 30,
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
    fontSize: GlobalStyles.textHeading,
  },
  paragraph: {
    margin: 20,
    fontSize: GlobalStyles.textHeading,
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
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
