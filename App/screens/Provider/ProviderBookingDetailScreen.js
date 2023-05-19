import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useState, useEffect, useContext, useCallback } from "react";
import DialogInput from "react-native-dialog-input";
import * as SplashScreen from "expo-splash-screen";

import { GlobalStyles } from "../../constants/Styles";
import { AuthContext } from "../../util/auth-context";
import { BookingContext } from "../../util/booking-context";
import { getBookingDetail } from "../../util/bookingHttp";
import QuotationBtns from "../../components/ProviderBookingDetail/QuotationBtns";
import CompletionBtns from "../../components/ProviderBookingDetail/CompletionBtns";
import {
  updateBookingPrice,
  rejectBooking,
  updateCompletedBooking,
} from "../../util/bookingHttp";

const ProviderBookingDetailScreen = ({ route, navigation }) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState("");
  const [bookingDetail, setBookingDetail] = useState({});

  const booking_id = route.params.booking_id;
  const status = route.params.status;
  const authCtx = useContext(AuthContext);
  const bookingCtx = useContext(BookingContext);

  useEffect(() => {
    const fetchApi = async () => {
      await SplashScreen.preventAutoHideAsync();
      const detail = await getBookingDetail(authCtx.token, {
        booking_id: booking_id,
      });
      setBookingDetail(detail);
      setAppIsReady(true);
    };
    fetchApi();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const displayAlert = () => {
    Alert.alert(
      "Reject Booking",
      "Do you want to reject booking?",
      [
        {
          text: "Cancel",
          onPress: this._doSomethingSerious,
        },
        {
          text: "Reject",
          onPress: () => {
            rejectBookingHandler(booking_id, { booking_id: booking_id });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const displayCompletedAlert = () => {
    Alert.alert(
      "Complete Booking",
      "Do you want to set booking to completed?",
      [
        {
          text: "Cancel",
          onPress: this._doSomethingSerious,
        },
        {
          text: "Completed",
          onPress: () => {
            updateCompletedBookingHandler(booking_id, {
              booking_id: booking_id,
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const updateBookingPriceHandler = async (id, bookingData) => {
    const updatedBookingData = await updateBookingPrice(
      authCtx.token,
      bookingData
    );
    if (updatedBookingData.data !== null) {
      bookingCtx.updateOnGoingBooking(id, {
        price: bookingData.price,
        status: updatedBookingData.data.status,
      });
      Alert.alert("Accept Booking", "Booking price updated successfully.");
      navigation.goBack();
    }
  };

  const rejectBookingHandler = async (id, bookingData) => {
    const rejectedBookingData = await rejectBooking(authCtx.token, bookingData);
    if (rejectedBookingData.data !== null) {
      bookingCtx.addCompletedBooking(rejectedBookingData.data);
      bookingCtx.deleteOnGoingBooking(rejectedBookingData.data.id);
      Alert.alert("Reject Booking", "Booking rejected successfully.");
      navigation.goBack();
    }
  };

  const updateCompletedBookingHandler = async (id, bookingData) => {
    const updatedBookingData = await updateCompletedBooking(
      authCtx.token,
      bookingData
    );
    if (updatedBookingData.data !== null) {
      console.log(updatedBookingData)
      bookingCtx.updateOnGoingBooking(id, {
        status: updatedBookingData.data.status,
      });
      Alert.alert("Complete Booking", "Booking completed successfully.");
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View>
        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.paragraphTitle}>Date</Text>
            <Text style={styles.paragraph}>{bookingDetail.data.date}</Text>
          </View>
          <View>
            <Text style={styles.paragraphTitle}>Timeslot</Text>
            <Text style={styles.paragraph}>{bookingDetail.data.session}</Text>
          </View>
          <View>
            <Text style={styles.paragraphTitle}>Price</Text>
            <Text style={styles.paragraph}>RM {bookingDetail.data.price}</Text>
          </View>
        </View>
        <Text style={styles.paragraphTitle}>Address</Text>
        <Text style={styles.paragraph}>{bookingDetail.data.address}</Text>
        <Text style={styles.paragraphTitle}>Status</Text>
        <Text style={styles.paragraph}>{bookingDetail.data.status}</Text>
        <Text style={styles.paragraphTitle}>Customer</Text>
        <Text style={styles.paragraph}>{bookingDetail.data.user_id.email}</Text>
        <Text style={styles.paragraphTitle}>Customer Phone</Text>
        <Text style={styles.paragraph}>
          {bookingDetail.data.user_id.phone_number}
        </Text>
        <Text style={styles.paragraphTitle}>Service category</Text>
        <Text style={styles.paragraph}>
          {bookingDetail.data.service_id.category}
        </Text>
        <Text style={styles.paragraphTitle}>Service description</Text>
        <Text style={styles.paragraph}>
          {bookingDetail.data.service_id.description}
        </Text>
      </View>

      {status === "pending quotation" && (
        <QuotationBtns
          onDisplayAlert={displayAlert}
          onSetVisible={setVisible}
        />
      )}
      {status === "pending job completion" && (
        <CompletionBtns
          onDisplayCompletedAlert={displayCompletedAlert}
          onDisplayAlert={displayAlert}
        />
      )}

      <DialogInput
        isDialogVisible={visible}
        title={"Accept Booking"}
        message={"Please set a booking price."}
        hintInput={"Enter price"}
        textInputProps={{ keyboardType: "numeric" }}
        submitInput={(inputText) => {
          setInput(inputText);
          setVisible(false);
          updateBookingPriceHandler(booking_id, {
            booking_id: booking_id,
            price: inputText,
          });
        }}
        closeDialog={() => setVisible(false)}
      ></DialogInput>
    </View>
  );
};

export default ProviderBookingDetailScreen;

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
