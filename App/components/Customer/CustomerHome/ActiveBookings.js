import { View, Text, StyleSheet, Image, ScrollView, Pressable, Alert } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

// import { GlobalStyles } from "../../constants/Styles";
import { Button } from "react-native-paper";

import {customerActiveServices} from "../../../util/customerHttp.js"
import ActiveBookingItems from "./ActiveBookingItems.js";

function CustomerActiveServices( {token} ) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const authCtx = token;
  
  async function getActiveBookings () {
      try {
        var response = await customerActiveServices(authCtx.token);
        response = response.data
        
        if (response !== null) {
          for(let i=0; i<response.length; i++) {
            console.log(response[i].status)
            setData(oldArray => [...oldArray, response[i]]);
          }
        }
      } catch (error) {
        Alert.alert("Register Failed", "Something went wrong.");
      }
  };
  useEffect(() => {
      getActiveBookings();
  }, []);
  console.log(data)
  if(data.length < 1) {
    return (
      <View>
        <View style={styles.nodataView}>
            <Text style={styles.noViewText}>Nothing Pending.</Text>
        </View>
        <View style={styles.nodataViewB}>
          <Text style={styles.noViewText}>Promotions. Coming Soon!</Text>
        </View>
      </View>
    );
}else{
    return (
      <View style={styles.container}>
        <View style={styles.borderView}>
          <ScrollView style={styles.scrollView}>
            {data.map(newView =>
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
        <View style={styles.nodataViewB}>
          <Text style={styles.noViewText}>Promotions. Coming Soon!</Text>
        </View>
      </View>
    );
        }
};

export default CustomerActiveServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
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
    maxHeight: 250,
  },
  borderView: {
    borderWidth: 3,
    borderColor: "black",
    paddingVertical: 10
  }
});
