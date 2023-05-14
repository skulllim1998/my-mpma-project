import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/Styles";

const BookingItem = ({ id, price, date, status }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View>
          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.paragraphTitle}>Date</Text>
              <Text style={styles.paragraph}>{date}</Text>
            </View>
            {price !== null && (
              <View>
                <Text style={styles.paragraphTitle}>Price</Text>
                <Text style={styles.paragraph}>RM {price}</Text>
              </View>
            )}
          </View>
          <View>
            <Text style={styles.paragraphTitle}>Status</Text>
            <Text style={styles.paragraph}>{status}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button}>
            <Text
              style={styles.text}
              onPress={() => {
                navigation.navigate("ProviderBookingDetail", {
                  booking_id: id,
                });
              }}
            >
              View More
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default BookingItem;

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
  rowContainer: {
    flexDirection: "row",
  },
  title: {
    marginHorizontal: 20,
    marginTop: 20,
    fontSize: GlobalStyles.textHeading,
  },
  paragraphTitle: {
    margin: 10,
    fontSize: GlobalStyles.textHeading,
    fontWeight: "bold",
  },
  paragraph: {
    margin: 10,
    fontSize: GlobalStyles.textHeading,
  },
  buttonContainer: { alignItems: "center", justifyContent: "center" },
  button: {
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
