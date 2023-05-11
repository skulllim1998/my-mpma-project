import NavigationBar from "./App/navigation/NavigationBar";
import AuthContextProvider from "./App/util/auth-context";
import { StatusBar } from "expo-status-bar";
import ServicesContextProvider from "./App/util/service-context";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <ServicesContextProvider>
          <NavigationBar />
        </ServicesContextProvider>
      </AuthContextProvider>
    </>
  );
}
