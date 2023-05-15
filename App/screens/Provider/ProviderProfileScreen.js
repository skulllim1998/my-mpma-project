import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { useState, useContext, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";

import { getProfile, updateProfile } from "../../util/providerHttp";
import { GlobalStyles } from "../../constants/Styles";
import { AuthContext } from "../../util/auth-context";

const ProviderProfileScreen = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [inputs, setInputs] = useState({
    compName: "",
    phoneNo: "",
    email: "",
    password: "",
  });
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchApi = async () => {
      await SplashScreen.preventAutoHideAsync();
      const profile = await getProfile(authCtx.token);
      setUserProfile(profile);
      setInputs({
        compName: profile.company_name,
        phoneNo: profile.phone_number,
        email: profile.email,
        password: profile.password,
      });
      setAppIsReady(true);
    };
    fetchApi();
  }, []);

  const inputChangedHandler = (inputIdentifier, enteredInput) => {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: enteredInput,
      };
    });
  };

  const saveForm = async () => {
    const editedProvider = {
      company_name: inputs.compName,
      phone_number: inputs.phoneNo,
      email: inputs.email,
      password: inputs.password,
    };

    try {
      const message = await updateProfile(authCtx.token, editedProvider);
      if (message !== null) {
        Alert.alert("Update Profile", "Profile updated successfully.");
      }
    } catch (error) {
      Alert.alert("Update Profile Failed", "Something went wrong.");
    }
  };

  const logout = () => {
    authCtx.logout();
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.mainContainer} onLayout={onLayoutRootView}>
      <View style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={require("../../../assets/profile.png")}
        />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder="Company Name"
            onChangeText={inputChangedHandler.bind(this, "compName")}
            value={inputs.compName}
          />
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder="Phone Number"
            onChangeText={inputChangedHandler.bind(this, "phoneNo")}
            value={inputs.phoneNo}
          />
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={inputChangedHandler.bind(this, "email")}
            value={inputs.email}
          />
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={inputChangedHandler.bind(this, "password")}
            value={inputs.password}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={saveForm}>
            <Text style={styles.text}>Update</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={logout}>
            <Text style={styles.text}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ProviderProfileScreen;

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  iconContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flex: 4,
  },
  icon: {
    width: 150,
    height: 150,
    margin: 20,
  },
  textInput: {
    color: "#120438",
    borderRadius: 15,
    padding: 10,
    margin: 10,
    backgroundColor: GlobalStyles.colors.white,
    elevation: 16,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 15,
  },
  container: {
    marginHorizontal: 30,
  },
  containerTitle: {
    fontSize: GlobalStyles.textHeading,
    marginHorizontal: 10,
  },
  buttonContainer: {
    height: 50,
    marginHorizontal: 20,
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    height: 60,
    marginHorizontal: 20,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: GlobalStyles.colors.black,
  },
  text: {
    fontSize: GlobalStyles.textHeading,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: GlobalStyles.colors.white,
    fontWeight: "bold",
  },
});
