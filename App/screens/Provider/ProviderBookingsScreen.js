import { View, StyleSheet } from "react-native";
import { useContext, useState } from "react";

import { BookingContext } from "../../util/booking-context";
import { AuthContext } from "../../util/auth-context";
import { ServiceContext } from "../../util/service-context";
import BookingsBar from "../../components/ProviderBookings/BookingsBar";
import OnGoingBookingsList from "../../components/ProviderBookings/OnGoingBookingsList";

const ProviderBookingsScreen = () => {
  const bookingCtx = useContext(BookingContext);
  const authCtx = useContext(AuthContext);
  const serviceCtx = useContext(ServiceContext);
  const [components, setComponents] = useState(
    <OnGoingBookingsList bookingCtx={bookingCtx} serviceCtx={serviceCtx} />
  );

  return (
    <View style={styles.mainContainer}>
      <BookingsBar
        onSetComponents={setComponents}
        bookingCtx={bookingCtx}
        serviceCtx={serviceCtx}
      />
      {components}
    </View>
  );
};

export default ProviderBookingsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
