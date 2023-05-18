import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { useState, useContext, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/Styles";
import GetBookingsPage from "../../components/Customer/CustomerBooking/GetBookings";
import { AuthContext } from "../../util/auth-context";

function CustomerHomeScreen() {
  const navigation = useNavigation();
  const [appIsReady, setAppIsReady] = useState(true);

  const authCtx = useContext(AuthContext);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container}>
        <View style={styles.newBookingPressableView}>
          <Pressable 
            style={styles.newBookingPressable} 
            onPress={() => {
              navigation.navigate("ViewServices");
            }}
          >
            <Text>New Booking</Text>
          </Pressable>
        </View>
        <GetBookingsPage token={authCtx} />
    </View>
  );
};

export default CustomerHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4
  },
  newBookingPressableView: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 10
  },
  newBookingPressable: {
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'chartreuse',
    padding: 10
  },
});
