import { View, FlatList, StyleSheet } from "react-native";

import BookingItem from "./BookingItem";

const OnGoingBookingsList = ({ bookingCtx, serviceCtx }) => {
  const renderBookingItem = (itemData) => {
    const item = itemData.item;
    const findServiceById = serviceCtx.services.find(
      (service) => service.id === item.service_id
    );

    if (findServiceById !== undefined) {
      const bookingItemProps = {
        id: item.id,
        categoryData: findServiceById.category,
        price: item.price,
        date: item.date,
        session: item.session,
        address: item.address,
      };
      return <BookingItem {...bookingItemProps} />;
    }
    const bookingItemProps = {
      id: item.id,
      categoryData: "No category",
      price: item.price,
      date: item.date,
      session: item.session,
      address: item.address,
    };
    return <BookingItem {...bookingItemProps} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bookingCtx.onGoingBookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingItem}
      />
    </View>
  );
};

export default OnGoingBookingsList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 5,
  },
});
