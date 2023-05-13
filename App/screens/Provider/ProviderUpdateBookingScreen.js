import { View, FlatList } from "react-native";
import { useContext } from "react";

import { BookingContext } from "../../util/booking-context";
import { AuthContext } from "../../util/auth-context";
import BookingItem from "../../components/ProviderUpdateBooking/BookingItem";
import { BOOKINGS } from "../../data/dummy-data";
import { ServiceContext } from "../../util/service-context";
import { updateBookingPrice } from "../../util/bookingHttp";

const ProviderUpdateBookingScreen = () => {
  const bookingCtx = useContext(BookingContext);
  const authCtx = useContext(AuthContext);
  const serviceCtx = useContext(ServiceContext);

  const renderBookingItem = (itemData) => {
    const item = itemData.item;
    const findServiceById = serviceCtx.services.find(
      (service) => service.id === item.service_id
    );

    const bookingItemProps = {
      id: item.id,
      categoryData: findServiceById.category,
      date: item.date,
      session: item.session,
      address: item.address,
      onUpdateBookingPrice: updateBookingPriceHandler,
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

  return (
    <View>
      <FlatList
        data={bookingCtx.bookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingItem}
      />
    </View>
  );
};

export default ProviderUpdateBookingScreen;
