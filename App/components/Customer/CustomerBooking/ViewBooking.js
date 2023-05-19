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
      return <Text style={styles.text2}>-</Text>
    }else{
      return <Text style={styles.text2}>{data.notes}</Text>
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
        return <Text style={styles.text2}>Price : RM {data.price.toFixed(2)}</Text>
    }else{
        return <Text style={styles.text2}>Price : RM -</Text>
    }
  } 


  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.detailsContainer}>
          <View style={styles.rowView}>
              <View style={styles.rowView1}>
                  <Text style={styles.text1}>Service Category : </Text>
              </View>
              <View style={styles.rowView2}>
                  <Text style={styles.text2}>{data.service_id.category}</Text>
              </View>
          </View>
          <View style={styles.rowView}>
              <View style={styles.rowView1}>
                  <Text style={styles.text1}>Service Title : </Text>
              </View>
              <View style={styles.rowView2}>
                  <Text style={styles.text2}>{data.service_id.name}</Text>
              </View>
          </View>
      
        <View style={styles.rowView}>
            <View style={styles.rowView1}>
                <Text style={styles.text1}>Date : </Text>
            </View>
            <View style={styles.rowView2}>
                <Text style={styles.text2}>{data.date}</Text>
            </View>
        </View>

        <View style={styles.rowView}>
            <View style={styles.rowView1}>
                <Text style={styles.text1}>Session {'(AM/PM)'} : </Text>
            </View>
            <View style={styles.rowView2}>
                <Text style={styles.text2}>{data.session}</Text>
            </View>
        </View>

        <View style={styles.rowView}>
            <View style={styles.rowView1}>
                <Text style={styles.text1}>Address : </Text>
            </View>
            <View style={styles.rowView2}>              
                <Text style={styles.text2}>{data.address}</Text>
            </View>
        </View>

        <View style={styles.rowView}>
            <View style={styles.rowView1}>
                <Text style={styles.text1}>Notes : </Text>
            </View>
            <View style={styles.rowView2}>
              <CheckNotes />
            </View>
        </View>

        <View style={styles.rowView}>
            <View style={styles.rowView1}>
                <Text style={styles.text1}>Booking Status : </Text>
            </View>
            <View style={styles.rowView2}>
              <Text style={styles.text2}>{bookingStatus}</Text>
            </View>
        </View>

        <View style={styles.rowView}>
            <View style={styles.rowView1}>
                <Text style={styles.text1}>Price : </Text>
            </View>
            <View style={styles.rowView2}>
              <PriceChecker />
            </View>
        </View>
      </View>
      {showButtons &&
      <View>
        <ButtonType />
      </View>
      }
  </ScrollView>   
  </SafeAreaView>
  );
};

export default ViewBookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    borderWidth: 3,
    margin: 10,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: 'chartreuse'
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
    borderColor: "red",
    paddingRight :10
  },
  rowView2: {  
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-around",
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    height: 50
  },
  text1: {
    fontSize: 18
  },
  text2: {
    fontSize: 18
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
