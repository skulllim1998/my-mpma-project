import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useContext, useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

import CustomerHomeScreen from "../screens/Customer/CustomerHomeScreen";
import CustomerBookingsScreen from "../screens/Customer/CustomerBookingScreen";
import CustomerProfileScreen from "../screens/Customer/CustomerProfileScreen";

import ProviderHomeScreen from "../screens/Provider/ProviderHomeScreen";
import HomeHeaderIcon from "../components/ProviderHome/HomeHeaderIcon";
import ProviderServicesScreen from "../screens/Provider/ProviderServicesScreen";
import { GlobalStyles } from "../constants/Styles";
import AddService from "../components/ProviderServices/AddService";
import ProviderCategoryScreen from "../screens/Provider/ProviderCategoryScreen";
import ProviderAddServiceScreen from "../screens/Provider/ProviderAddServiceScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignInScreen from "../screens/SignInScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { AuthContext } from "../util/auth-context";
import ProviderUpdateBookingScreen from "../screens/Provider/ProviderUpdateBookingScreen";
import ProviderBookingsScreen from "../screens/Provider/ProviderBookingsScreen";
import AcceptBooking from "../components/ProviderBookings/AcceptBooking";
import ProviderBookingDetailScreen from "../screens/Provider/ProviderBookingDetailScreen";
import ProviderEarningScreen from "../screens/Provider/ProviderEarningScreen";
import ProviderProfileScreen from "../screens/Provider/ProviderProfileScreen";
import NewBookingPage from "../components/Customer/CustomerBooking/NewBooking";
import ViewServicesPage from "../components/Customer/CustomerBooking/ViewServices";
import ViewSubServicesPage from "../components/Customer/CustomerBooking/ViewSubServices";
import ViewAvailableServicesPage from "../components/Customer/CustomerBooking/ViewAvailableServices";
import GetBookingsPage from "../components/Customer/CustomerBooking/GetBookings";
import ViewBookingPage from "../components/Customer/CustomerBooking/ViewBooking";
import ResetPasswordPage from "../components/Customer/CustomerPassword/ResetPassword";


const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ProviderScreens = () => {
  return (
    <BottomTabs.Navigator screenOptions={styles.mainHeader}>
      <BottomTabs.Screen
        name="ProviderHome"
        component={ProviderHomeScreen}
        options={styles.homeHeader}
      />
      <BottomTabs.Screen
        name="ProviderServices"
        component={ProviderServicesScreen}
        options={styles.servicesHeader}
      />
      <BottomTabs.Screen
        name="ProviderBookings"
        component={ProviderBookingsScreen}
        options={styles.bookingsHeader}
      />
      <BottomTabs.Screen
        name="ProviderProfile"
        component={ProviderProfileScreen}
        options={styles.profileHeader}
      />
    </BottomTabs.Navigator>
  );
};

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator screenOptions={styles.allHeader}>
      <Stack.Screen
        name="ProviderScreens"
        component={ProviderScreens}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProviderCategory"
        component={ProviderCategoryScreen}
        options={styles.categoryHeader}
      />
      <Stack.Screen
        name="ProviderAddService"
        component={ProviderAddServiceScreen}
        options={({ route }) => {
          const categoryItem = route.params.category;
          return { title: categoryItem.title };
        }}
      />
      <Stack.Screen
        name="ProviderBookingDetail"
        component={ProviderBookingDetailScreen}
        options={styles.bookingDetailHeader}
      />
      <Stack.Screen
        name="ProviderUpdateBooking"
        component={ProviderUpdateBookingScreen}
        options={styles.pendingBookingHeader}
      />
      <Stack.Screen
        name="ProviderEarning"
        component={ProviderEarningScreen}
        options={styles.earningHeader}
      />
    </Stack.Navigator>
  );
};

const CustomerBottomNavigator = () => {
  return (
    <BottomTabs.Navigator screenOptions={styles.mainHeader}>
      <BottomTabs.Screen
        name="CustomerHome"
        component={CustomerHomeScreen}
        options={styles.customerHomeHeader}
      />
      <BottomTabs.Screen
        name="CustomerBookings"
        component={CustomerBookingsScreen}
        options={styles.customerBookingHeader}
      />
      <BottomTabs.Screen
        name="CustomerProfile"
        component={CustomerProfileScreen}
        options={styles.customerProfileHeader}
      />
    </BottomTabs.Navigator>
  );
};

const CustomerStack = () => {
  return (
    <Stack.Navigator screenOptions={styles.allHeader}>
      <Stack.Screen
        name="CustomerBottomNavigator"
        component={CustomerBottomNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewBooking"
        component={NewBookingPage}
        options={styles.categoryHeader}
      />
      <Stack.Screen
        name="ViewServices"
        component={ViewServicesPage}
        options={{title: "Services"}}
      />
      <Stack.Screen
        name="ViewSubServices"
        component={ViewSubServicesPage}
        options={{title: "Sub Services"}}
      />
      <Stack.Screen
        name="ViewAvailableServices"
        component={ViewAvailableServicesPage}
        options={{title: "Providers"}}
      />
      <Stack.Screen
        name="GetBookings"
        component={GetBookingsPage}
        options={{title: "Bookings"}}
      />
      <Stack.Screen
        name="ViewBooking"
        component={ViewBookingPage}
        options={{title: "Booking"}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordPage}
        options={{title: "Reset Password"}}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={styles.allHeader}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const NavigationBar = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchTokenRole = async () => {
      await SplashScreen.preventAutoHideAsync();
      const storedToken = await AsyncStorage.getItem("token");
      const storedRole = await AsyncStorage.getItem("role");

      if (storedToken !== null && storedRole !== null) {
        authCtx.authenticate(storedToken, storedRole);
      }
      setAppIsReady(true);
    };
    fetchTokenRole();
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
    <NavigationContainer onReady={onLayoutRootView}>
      {authCtx.isAuthenticated && authCtx.role === "provider" ? (
        <AuthenticatedStack />
      ) : authCtx.isAuthenticated && authCtx.role === "customer" ? (
        <CustomerStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  mainHeader: {
    headerStyle: {
      backgroundColor: GlobalStyles.colors.black,
    },
    headerTintColor: GlobalStyles.colors.white,
    tabBarStyle: { backgroundColor: GlobalStyles.colors.black },
    tabBarActiveTintColor: GlobalStyles.colors.white,
  },
  allHeader: {
    headerStyle: {
      backgroundColor: GlobalStyles.colors.black,
    },
    headerTintColor: GlobalStyles.colors.white,
  },
  homeHeader: {
    title: "Home",
    tabBarLabel: "Home",
    tabBarIcon: ({ color, size }) => (
      <MaterialIcons name="home" size={34} color={GlobalStyles.colors.white} />
    ),
  },
  servicesHeader: {
    tabBarLabel: "Services",
    headerTitle: () => <AddService />,
    tabBarIcon: ({ color, size }) => (
      <FontAwesome5 name="tools" size={26} color={GlobalStyles.colors.white} />
    ),
  },
  categoryHeader: {
    title: "Your Services",
  },
  bookingsHeader: {
    tabBarLabel: "Bookings",
    headerTitle: () => <AcceptBooking />,
    tabBarIcon: ({ color, size }) => (
      <FontAwesome5 name="book" size={26} color={GlobalStyles.colors.white} />
    ),
  },
  pendingBookingHeader: {
    title: "Pending Bookings",
  },
  bookingDetailHeader: {
    title: "Booking Detail",
  },
  earningHeader: {
    title: "Earnings",
  },
  profileHeader: {
    title: "Profile",
    tabBarLabel: "Profile",
    tabBarIcon: ({ color, size }) => (
      <FontAwesome5 name="user" size={26} color={GlobalStyles.colors.white} />
    ),
  },



  customerHomeHeader: {    
    title: "Home",
    tabBarLabel: "Home",
    headerTitleAlign: "center",
    tabBarIcon: ({ color, size }) => (
      <MaterialIcons name="home" size={34} color={GlobalStyles.colors.white} />
    ),
  },
  customerBookingHeader: {
    title: "Bookings",
    tabBarLabel: "Bookings",
    headerTitleAlign: "center",
    tabBarIcon: ({ color, size }) => (
      <FontAwesome5 name="book" size={26} color={GlobalStyles.colors.white} />
    ),
  },
  customerProfileHeader: {    
    title: "Profile",
    tabBarLabel: "Profile",
    headerTitleAlign: "center",
    tabBarIcon: ({ color, size }) => (
      <FontAwesome5 name="user" size={26} color={GlobalStyles.colors.white} />
    ),
  }
});
