import { View, Text, StyleSheet, Image, ScrollView, Pressable, TextInput, Alert } from "react-native";
import { useState, useContext, useEffect, useCallback } from "react";

import { AuthContext } from "../../util/auth-context";
import { getProfile } from "../../util/providerHttp";
import { saveProfile } from "../../util/customerHttp";

import { GlobalStyles } from "../../constants/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

function CustomerHomeScreen() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNum, setPhoneNum] = useState('')

  const [edit, setEdit] = useState(false)

  const authCtx = useContext(AuthContext);
  const logout = () => {
    authCtx.logout();
  };

  async function getUserProfile() {
    try {
      var response = await getProfile(authCtx.token);
      console.log(response)

      if(response != null) {
        setFullName(response.name)
        setEmail(response.email)
        setAddress(response.address)
        setPhoneNum(response.phone_number)
      }
    } catch (error) {
      Alert.alert("Register Failed", "Something went wrong.");
    }
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  function editBtnFunc() {
    setEdit(true)
  }

  async function saveBtnFunc() {
    setEdit(false)

    const profileData = {
      name: fullName,
      address: address,
      email: email,
      phone_number: phoneNum
    }
    
    try {
      var response = await saveProfile(authCtx.token, profileData);
      console.log(response)

      if(response.message) {
        Alert.alert(response.message)
      }

    } catch (error) {
      Alert.alert("Register Failed", "Something went wrong.");
    }
  }
  
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={require("../../../assets/profile.png")}
        />
      </View>
      <View style={styles.formContainer}>

        <View style={styles.flexView}>
          <View style={styles.textView}>
            <Text style={styles.text}>Full Name</Text>
          </View>        
          <View style={styles.textInputView}>
            <TextInput
              style={styles.textInput}
              placeholder="Name"
              onChangeText={setFullName}
              value={fullName}
              editable={edit}
            />
          </View>
        </View>

        <View style={styles.flexView}>
          <View style={styles.textView}>
            <Text style={styles.text}>Email</Text>
          </View>        
          <View style={styles.textInputView}>
            <TextInput
              style={styles.textInput}
              placeholder="E-mail"
              onChangeText={setEmail}
              value={email}
              editable={edit}
            />
          </View>
        </View>

        <View style={styles.flexView}>
          <View style={styles.textView}>
            <Text style={styles.text}>Phone Number</Text>
          </View>        
          <View style={styles.textInputView}>
            <TextInput
              style={styles.textInput}
              placeholder="Phone number"
              onChangeText={setPhoneNum}
              value={phoneNum}
              editable={edit}
            />
          </View>
        </View>

        <View style={styles.flexView}>
          <View style={styles.textView}>
            <Text style={styles.text}>Address</Text>
          </View>        
          <View style={styles.textInputView}>
            <TextInput
              style={styles.textInput}
              placeholder="Address"
              onChangeText={setAddress}
              value={address}
              editable={edit}
            />
          </View>
        </View>

        <View style={styles.flexView}>
          <View style={styles.textView}>
            <Text style={styles.text}>Password</Text>
          </View>        
          <View style={styles.textInputView}>
            <Pressable style={styles.buttonReset}
              onPress={() => {
                    navigation.navigate("ResetPassword", {
                      token: authCtx.token
                    });
                    
                  }
              }>
              <Text style={styles.btnText}>Reset Password</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.buttonContainer}>
        {!edit &&
          <Pressable style={styles.button} onPress={editBtnFunc}>
            <Text style={styles.btnText}>Edit</Text>
          </Pressable>
        }
        {edit &&
          <Pressable style={styles.button} onPress={saveBtnFunc}>
            <Text style={styles.btnText}>Save</Text>
          </Pressable>
        }
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={logout}>
            <Text style={styles.btnText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CustomerHomeScreen;

const styles = StyleSheet.create({
  
  mainContainer: { flex: 1 },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  formContainer: {
    flex: 4,
    marginTop: 30
  },
  icon: {
    width: 150,
    height: 150,
    margin: 20,
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
  buttonReset: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    height: 40,
    backgroundColor: "red",
  },
  btnText: {
    fontSize: GlobalStyles.textHeading,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: GlobalStyles.colors.white,
    fontWeight: "bold",
  },
  flexView: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 15
  },
  textView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  textInputView: {
     flex: 3,
     marginVertical: 5,
     flexDirection: "column",
     justifyContent: "space-around"
  },
  text: {
    fontWeight: "bold",
    fontSize: 20
  },
  textInput: {
    color: "#120438",
    borderRadius: 15,
    padding: 10,
    backgroundColor: GlobalStyles.colors.white,
    elevation: 16,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 15,
    borderWidth: 3
  },
});
