import { View, FlatList } from "react-native";
import { useContext } from "react";

import { BookingContext } from "../../util/booking-context";
import { AuthContext } from "../../util/auth-context";
import BookingItem from "../../components/ProviderUpdateBooking/BookingItem";
import { BOOKINGS } from "../../data/dummy-data";

const ProviderUpdateBookingScreen = () => {
  const bookingCtx = useContext(BookingContext);
  const authCtx = useContext(AuthContext);

  const renderBookingItem = (itemData) => {
    const item = itemData.item;

    const bookingItemProps = {
      categoryData: item.category,
      date: item.date,
      session: item.session,
      address: item.address,
    };

    return <BookingItem {...bookingItemProps} />;
  };

  console.log(bookingCtx.bookings);
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
