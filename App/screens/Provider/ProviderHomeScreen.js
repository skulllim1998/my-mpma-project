import { View, StyleSheet } from "react-native";
import { useEffect, useContext, useState } from "react";

import HomeHeaderTitle from "../../components/ProviderHome/HomeHeaderTitle";
import HomeEarning from "../../components/ProviderHome/HomeEarning";
import HomeBookings from "../../components/ProviderHome/HomeBookings";
import { getServicesByAdmin } from "../../util/serviceHttp";
import { AuthContext } from "../../util/auth-context";
import { serviceItems } from "../../util/serviceHttp";
import { ServiceContext } from "../../util/service-context";

const ProviderHomeScreen = () => {
  const authCtx = useContext(AuthContext);
  const serviceCtx = useContext(ServiceContext);

  useEffect(() => {
    const fetchServices = async () => {
      const services = await getServicesByAdmin(authCtx.token);
      serviceCtx.setService(services);
    };
    fetchServices();
  }, []);

  return (
    <View style={styles.container}>
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
