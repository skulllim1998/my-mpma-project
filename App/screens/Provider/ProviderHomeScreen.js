import { View, StyleSheet } from "react-native";
import { useEffect, useContext, useState, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

import HomeHeaderTitle from "../../components/ProviderHome/HomeHeaderTitle";
import HomeEarning from "../../components/ProviderHome/HomeEarning";
import HomeBookings from "../../components/ProviderHome/HomeBookings";
import { getServicesByAdmin } from "../../util/serviceHttp";
import { AuthContext } from "../../util/auth-context";
import { serviceItems } from "../../util/serviceHttp";
import { ServiceContext } from "../../util/service-context";
import { BookingContext } from "../../util/booking-context";
import { getPendingBookings } from "../../util/bookingHttp";

const ProviderHomeScreen = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const authCtx = useContext(AuthContext);
  const serviceCtx = useContext(ServiceContext);
  const bookingCtx = useContext(BookingContext);

  useEffect(() => {
    const fetchApis = async () => {
      await SplashScreen.preventAutoHideAsync();
      const services = await getServicesByAdmin(authCtx.token);
      serviceCtx.setService(services);
      const pendingBookings = await getPendingBookings(authCtx.token);
      bookingCtx.setBooking(pendingBookings);
      setAppIsReady(true);
    };
    fetchApis();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <HomeHeaderTitle />
      <View style={styles.content}>
        <HomeEarning />
        <HomeBookings />
      </View>
    </View>
  );
};

export default ProviderHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 5,
  },
});
