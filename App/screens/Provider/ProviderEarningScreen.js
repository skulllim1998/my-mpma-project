import { View, Text, StyleSheet, FlatList } from "react-native";
import { useContext, useState, useEffect } from "react";

import { GlobalStyles } from "../../constants/Styles";
import { BookingContext } from "../../util/booking-context";
import EarningItem from "../../components/ProviderEarning/EarningItem";

const ProviderEarningScreen = () => {
  const bookingCtx = useContext(BookingContext);
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

  const renderEarningItem = (itemData) => {
    const item = itemData.item;

    const earningItemProps = {
      price: item.price,
      date: item.date,
      address: item.address,
    };

    return <EarningItem {...earningItemProps} />;
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Your total earnings</Text>
        <Text style={styles.paragraph}>RM {totalEarning}</Text>
      </View>
      <Text style={styles.earningTitle}>Earning History</Text>
      <View style={styles.flatListContainer}>
        <FlatList
          data={bookingCtx.paymentCompletedBookings}
          keyExtractor={(item) => item.id}
          renderItem={renderEarningItem}
        />
      </View>
    </View>
  );
};

export default ProviderEarningScreen;

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 30,
    borderRadius: 15,
    backgroundColor: GlobalStyles.colors.yellow,
    elevation: 16,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 15,
  },
  flatListContainer: {
    flex: 4,
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
    margin: 20,
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
  earningTitle: {
    marginHorizontal: 30,
    marginVertical: 10,
    fontSize: GlobalStyles.textHeading,
    fontWeight: "bold",
  },
});
