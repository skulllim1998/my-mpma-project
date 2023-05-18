import { View, Text, StyleSheet, Image, ScrollView, Alert, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../../constants/Styles";
import {getUserBookings} from "../../../util/customerHttp";
import ActiveBookingItems from "../CustomerHome/ActiveBookingItems";

function CustomerHomeScreen( {token} ) {

  const navigation = useNavigation();
  const [responseData, setResponseData] = useState([]);
  const authCtx = token;
  
  async function GetActiveBookings () {
      try {
        var response = await getUserBookings(authCtx.token);
        console.log(response)

        if(response != null) {
          response = response.data
          console.log(response.length)
          
          for(let j=0; j<response.length; j++) {
            console.log(response[j]);
            console.log(responseData)
            setResponseData(oldData => [...oldData, response[j]]);
            console.log("end append")
          }
        }
        
        console.log("final data")
        console.log(responseData)
      } catch (error) {
        Alert.alert("Register Failed", "Something went wrong.");
      }
  };
  useEffect(() => {
      GetActiveBookings();
  }, []);

  
  console.log(responseData)
  if(responseData.length < 1) {
    return (
      <View>
        <View style={styles.nodataView}>
            <Text style={styles.noViewText}>Nothing Pending.</Text>
        </View>
      </View>
    );
  }else{
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {responseData.map(newView =>
            <View key={newView.id} style={styles.newBookingPressableView}>
              <Pressable 
                style={styles.newBookingPressable} 
                onPress={() => {
                  navigation.navigate("ViewBooking", {
                    data: newView,
                    token: authCtx.token
                  });
                  
                }}
              >
                <ActiveBookingItems data={newView}/>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
};

export default CustomerHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4
  },
  newBookingPressableView: {
    width: "100%",
    display: "flex",
    marginTop: 10,
    marginRight: "auto",
    marginLeft: "auto",
    width: "90%",
  },
  newBookingPressable: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'chartreuse',
    padding: 10
  },
  nodataView: {
    backgroundColor: 'chartreuse',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 20
  },
  nodataViewB: {
    backgroundColor: 'yellow',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 20
  },
  noViewText: {
    textAlign: "center",
    margin: 10
  },
  scrollView: {
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 10,
    height: "100%"
  }
});
