import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useState, useEffect, useContext, useCallback } from "react";
import DialogInput from "react-native-dialog-input";
import * as SplashScreen from "expo-splash-screen";

import { GlobalStyles } from "../../constants/Styles";
import { AuthContext } from "../../util/auth-context";
import { BookingContext } from "../../util/booking-context";
import { getBookingDetail } from "../../util/bookingHttp";

const ProviderBookingDetailScreen = ({ route }) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState("");
  const [bookingDetail, setBookingDetail] = useState({});
  const booking_id = route.params.booking_id;
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

  //console.log(bookingDetail.data.date);

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
            onRejectBookingHandler(id, { booking_id: id });
          },
        },
      ],
      { cancelable: false }
    );
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

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text
            style={styles.text}
            onPress={() => {
              setVisible(true);
            }}
          >
            Accept
          </Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.text} onPress={displayAlert}>
            Reject
          </Text>
        </Pressable>
      </View>

      <DialogInput
        isDialogVisible={visible}
        title={"Accept Booking"}
        message={"Please set a booking price."}
        hintInput={"Enter price"}
        textInputProps={{ keyboardType: "numeric" }}
        submitInput={(inputText) => {
          setInput(inputText);
          setVisible(false);
          onUpdateBookingPrice(id, { booking_id: id, price: inputText });
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
