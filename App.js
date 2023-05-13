import NavigationBar from "./App/navigation/NavigationBar";
import AuthContextProvider from "./App/util/auth-context";
import { StatusBar } from "expo-status-bar";
import ServicesContextProvider from "./App/util/service-context";
import BookingsContextProvider from "./App/util/booking-context";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <ServicesContextProvider>
          <BookingsContextProvider>
            <NavigationBar />
          </BookingsContextProvider>
        </ServicesContextProvider>
      </AuthContextProvider>
    </>
  );
}
