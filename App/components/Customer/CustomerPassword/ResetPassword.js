import { View, Text, StyleSheet, Image, ScrollView, Pressable, SafeAreaView, Alert } from "react-native";
import { useState, useContext, useEffect, useCallback } from "react";

import { AuthContext } from "../../../util/auth-context";
import { userResetPassword } from "../../../util/customerHttp";

import { GlobalStyles } from "../../../constants/Styles";
import { TextInput } from "react-native-paper";

function ResetPassword( {route, navigation} ) {

    const token = route.params.token;
    
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  async function savePassword() {
    console.log("save password")
    console.log(token)

    if(newPassword != confirmNewPassword) {
        Alert.alert("New Password and Confirm New Password do not match. Try Again.")
        return;
    }

    const data = {
        oldPassword: oldPassword,
        newPassword: newPassword
    }
    console.log(data)

    try {
        var response = await userResetPassword(token, data);
        console.log(response)   
        Alert.alert(response.message)

    } catch (error) {
        Alert.alert("Register Failed", "Something went wrong.");
    }
  }

    console.log(token)  
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textView}>
                <Text style={styles.text}>Old Password</Text>
                <TextInput
                style={styles.textInput}
                placeholder="old password"
                onChangeText={setOldPassword}
                value={oldPassword}
                secureTextEntry={true}
                />
                
                <Text style={styles.text}>New Password</Text>
                <TextInput
                style={styles.textInput}
                placeholder="new password"
                onChangeText={setNewPassword}
                value={newPassword}
                secureTextEntry={true}
                />
                
                <Text style={styles.text}>Confirm New Password</Text>
                <TextInput
                style={styles.textInput}
                placeholder="confirm new password"
                onChangeText={setConfirmNewPassword}
                value={confirmNewPassword}
                secureTextEntry={true}
                />
            </View>     
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={savePassword}>
                    <Text style={styles.btnText}>Save</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default ResetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
      },
      flexDisplay: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        padding: 5
      },
      detialsView: {
        flex: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
      },
      image: {
        width: "90%",
        height: 120,
        marginRight: "auto",
        marginLeft: "auto",
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "black"
      },
      text: {
        fontSize: 16,
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
    backgroundColor: "chartreuse"
  },
  btnText: {
    fontSize: GlobalStyles.textHeading,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: GlobalStyles.colors.black,
    fontWeight: "bold",
  },
  textInput: {
    marginBottom: 30
  },
  text: {
    marginBottom: 5,
    fontSize: 18
  }
});
