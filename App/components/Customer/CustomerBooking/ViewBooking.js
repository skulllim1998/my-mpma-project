import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, Pressable, Alert } from "react-native";
import { useState, useContext, useEffect, useCallback } from "react";

import { GlobalStyles } from "../../../constants/Styles";

import {userRejectBooking} from "../../../util/customerHttp.js";
import {userMakePayment} from "../../../util/customerHttp.js";
import {userAcceptQuotation} from "../../../util/customerHttp.js";

function ViewBookingScreen( {route, navigation} ) {
  const data = route.params.data;
  const token = route.params.token;

  const [bookingStatus, setBookingStatus] = useState(data.status);
  const [showButtons, setShowButtons] = useState(true);
  
  function CheckNotes() {
    if(data.notes == "" || data.notes == null) {
      return <Text>-</Text>
    }else{
      return <Text>{data.notes}</Text>
    }
  }

  async function rejectBooking() {
    console.log("reject booking")
    const bookingData = {
      booking_id: data.id
    };
    console.log(bookingData)
    try {
      var response = await userRejectBooking(token, bookingData);
      console.log(response)      
      response = response.data
      
      if(response != null) {
        console.log(response)
        if(response.status == "customer reject") {
          setBookingStatus("customer reject");
          Alert.alert("Booking Successfully canceled.");
          setShowButtons(false);
        }
      }
    } catch (error) {
      Alert.alert("Register Failed", "Something went wrong.");
    }
  }  

  async function payment() {
    console.log("pay booking")
    const bookingData = {
      booking_id: data.id
    };
    console.log(bookingData)
    try {
      var response = await userMakePayment(token, bookingData);
      console.log(response)      
      response = response.data
      
      if(response != null) {
        console.log(response)
        if(response.status == "payment completed") {
          setBookingStatus("payment completed");
          Alert.alert("Booking Successfully Paid.");
          setShowButtons(false);
        }
      }
    } catch (error) {
      Alert.alert("Register Failed", "Something went wrong.");
    }
  }  

  async function acceptQuotation() {
    console.log("accept quotation")
    const bookingData = {
      booking_id: data.id
    };
    console.log(bookingData)
    try {
      var response = await userAcceptQuotation(token, bookingData);
      console.log(response)      
      response = response.data
      
      if(response != null) {
        console.log(response)
        if(response.status == "pending job completion") {
          setBookingStatus("pending job completion");
          Alert.alert("Quotation approved");
          setShowButtons(false);
        }
      }
    } catch (error) {
      Alert.alert("Register Failed", "Something went wrong.");
    }
  }
  
  function ButtonType() {
    if(data.status == "pending customer approval") {
      return (
        <View>
          <Pressable style={styles.bookNowBtn} onPress={()=>rejectBooking()}>
            <Text>Cancel Booking</Text>
          </Pressable>
          <Pressable style={styles.bookNowBtn} onPress={()=>acceptQuotation()}>
            <Text>Accept Pricing</Text>
          </Pressable>
        </View>
      )
    }else if(data.status == "pending payment") {
      return (
        <Pressable style={styles.bookNowBtn} onPress={()=>payment()}>
          <Text>Pay Now</Text>
        </Pressable>
      )
    }else if(data.status == "payment completed" || data.status == "admin reject" || data.status == "customer reject") {
      //do nothing
    }else{
      return (
        <Pressable style={styles.bookNowBtn} onPress={()=>rejectBooking()}>
          <Text>Cancel Booking</Text>
        </Pressable>   
      )
    }
  } 

  function PriceChecker() {
    if(data.price) {
        return <Text style={styles.text}>Price : RM {data.price.toFixed(2)}</Text>
    }else{
        return <Text style={styles.text}>Price : RM -</Text>
    }
  } 


  return (
    <SafeAreaView>
      <View>
          <View style={styles.rowView}>
              <View style={styles.rowView1}>
                  <Text>Service Category : </Text>
              </View>
              <View style={styles.rowView2}>
                  <Text>{data.service_id.category}</Text>
              </View>
          </View>
          <View style={styles.rowView}>
              <View style={styles.rowView1}>
                  <Text>Service Title : </Text>
              </View>
              <View style={styles.rowView2}>
                  <Text>{data.service_id.name}</Text>
              </View>
          </View>
      </View>
      <View style={styles.rowView}>
          <View style={styles.rowView1}>
              <Text>Date : </Text>
          </View>
          <View style={styles.rowView2}>
              <Text>{data.date}</Text>
          </View>
      </View>

      <View style={styles.rowView}>
          <View style={styles.rowView1}>
              <Text>Session {'(AM/PM)'} : </Text>
          </View>
          <View style={styles.rowView2}>
              <Text>{data.session}</Text>
          </View>
      </View>

      <View style={styles.rowView}>
          <View style={styles.rowView1}>
              <Text>Address : </Text>
          </View>
          <View style={styles.rowView2}>              
              <Text>{data.address}</Text>
          </View>
      </View>

      <View style={styles.rowView}>
          <View style={styles.rowView1}>
              <Text>Notes : </Text>
          </View>
          <View style={styles.rowView2}>
            <CheckNotes />
          </View>
      </View>

      <View style={styles.rowView}>
          <View style={styles.rowView1}>
              <Text>Booking Status : </Text>
          </View>
          <View style={styles.rowView2}>
            <Text>{bookingStatus}</Text>
          </View>
      </View>

      <View style={styles.rowView}>
          <View style={styles.rowView1}>
              <Text>Price : </Text>
          </View>
          <View style={styles.rowView2}>
            <PriceChecker />
          </View>
      </View>
      {showButtons &&
      <View>
        <ButtonType />
      </View>
      }
             
  </SafeAreaView>
  );
};

export default ViewBookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.black,
  },
  rowView: {    
    display: "flex",
    flexDirection: "row",
    // borderWidth: 3,
    borderColor: "purple",
    padding: 10
  },
  rowView1: {    
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    // borderWidth: 3,
    borderColor: "red"
  },
  rowView2: {  
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-around",
    // borderWidth: 3,
    borderColor: "green"
  },
  canlendarView: {
    flex: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 3,
    borderColor: "green"
  },
  calendarViewInput: {

  },
  noteText: {
    fontSize: 11
  },
  bookNowBtn: {
    width: "50%",
    minWidth: 200,
    maxWidth: 300,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
    marginVertical: 20,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: GlobalStyles.colors.yellow,
  }
});
