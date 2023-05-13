import { View, FlatList, Alert, Image, StyleSheet } from "react-native";
import { useContext } from "react";

import { BookingContext } from "../../util/booking-context";
import { AuthContext } from "../../util/auth-context";
import BookingItem from "../../components/ProviderUpdateBooking/BookingItem";
import { BOOKINGS } from "../../data/dummy-data";
import { ServiceContext } from "../../util/service-context";
import { updateBookingPrice, rejectBooking } from "../../util/bookingHttp";

const ProviderUpdateBookingScreen = () => {
  const bookingCtx = useContext(BookingContext);
  const authCtx = useContext(AuthContext);
  const serviceCtx = useContext(ServiceContext);
  const pendingBookings = bookingCtx.bookings.filter(
    (booking) => booking.status.toLowerCase() === "pending quotation"
  );

  const renderBookingItem = (itemData) => {
    const item = itemData.item;
    const findServiceById = serviceCtx.services.find(
      (service) => service.id === item.service_id
    );

    if (findServiceById !== undefined) {
      const bookingItemProps = {
        id: item.id,
        categoryData: findServiceById.category,
        date: item.date,
        session: item.session,
        address: item.address,
        onUpdateBookingPrice: updateBookingPriceHandler,
        onRejectBookingHandler: rejectBookingHandler,
      };
      return <BookingItem {...bookingItemProps} />;
    }
    const bookingItemProps = {
      id: item.id,
      categoryData: "No category",
      date: item.date,
      session: item.session,
      address: item.address,
      onUpdateBookingPrice: updateBookingPriceHandler,
      onRejectBookingHandler: rejectBookingHandler,
    };
    return <BookingItem {...bookingItemProps} />;
  };

  const updateBookingPriceHandler = async (id, bookingData) => {
    const updatedBookingData = await updateBookingPrice(
      authCtx.token,
      bookingData
    );
    if (updatedBookingData.data !== null) {
      bookingCtx.updateBooking(id, {
        price: bookingData.price,
        status: "pending customer approval",
      });
      Alert.alert("Accept Booking", "Booking price updated successfully.");
    }
  };

  const rejectBookingHandler = async (id, bookingData) => {
    const rejectedBookingData = await rejectBooking(authCtx.token, bookingData);
    if (rejectedBookingData.data !== null) {
      bookingCtx.updateBooking(id, {
        status: "admin reject",
      });
      Alert.alert("Reject Booking", "Booking rejected successfully.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          style={styles.icon}
          source={require("../../../assets/pending2.png")}
        />
      </View>
      <View style={styles.bookingsList}>
        <FlatList
          data={pendingBookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBookingItem}
        />
      </View>
    </View>
  );
};

export default ProviderUpdateBookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: { flex: 1, justifyContent: "center", alignItems: "center" },
  bookingsList: {
    flex: 5,
  },
  icon: {
    width: 130,
    height: 130,
  },
});
