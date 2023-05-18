import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert, Pressable } from "react-native";
import { useState, useContext, useEffect } from "react";

import { GlobalStyles } from "../../../constants/Styles";

import ServiceItem from "../Services/Service";

import { AuthContext } from "../../../util/auth-context";
import {getServicesByCategory} from "../../../util/customerHttp.js"

function ViewAvailableServicesScreen( {route, navigation} ) {


  const authCtx = useContext(AuthContext);
  const routeData = route.params;

  const [availableServices, setAvailableServices] = useState([]);
  const [category, setCategory] = useState('')

  async function getServiceByCategory () {
    console.log("start gettign available services")
    console.log(authCtx.token)
    console.log(routeData.subCategory)
    try {
      var catData = {
        category:routeData.subCategory
      }
      console.log(catData)
      var response = await getServicesByCategory(authCtx.token, catData);
      console.log(response)
      
      if (response !== null) {
        response = response.data
        
        for(let i=0; i<response.length; i++) {
          if(i == 0){
            setCategory(response[i].category)
          }
          setAvailableServices(prevArray => [...prevArray, response[i]]);
        }
      }
      
    } catch (error) {
      Alert.alert("Register Failed", "Something went wrong.");
    }
  };
  useEffect(() => {
    getServiceByCategory();
  }, []);

  function GetImage(){
    if(
        category == "Air Condition Installation" ||
        category == "Air Condition Repair" ||
        category == "Air Condition Maintenance" ||
        category == "Air Condition Cleaning" 
    ){
        console.log("true")
        return <Image style={styles.image} source={require('../../../../assets/aircond.jpg')} />
    }
    else if(
        category == "Engine repair" ||
        category == "Brake system repair" ||
        category == "Suspension repair" ||
        category == "Electrical system repair" 
    ){
        console.log("true")
        return <Image style={styles.image} source={require('../../../../assets/car.png')} />
    }
    else if(
        category == "Exterior car wash" ||
        category == "Interior car wash" ||
        category == "Hand car wash" ||
        category == "Detailing services" 
    ){
        console.log("true")
        return <Image style={styles.image} source={require('../../../../assets/carwash.jpg')} />
    }
    else if(
        category == "Washing Machine Repair" ||
        category == "Washing Machine Installation" ||
        category == "Washing Machine Maintenance" ||
        category == "Washing Machine Part replacement" 
    ){
        console.log("true")
        return <Image style={styles.image} source={require('../../../../assets/washing-machine.png')} />
    }
    else if(
        category == "Refrigerator Repair" ||
        category == "Refrigerator Installation" ||
        category == "Refrigerator Maintenance" ||
        category == "Refrigerator Part replacement" 
    ){
        console.log("true")
        return <Image style={styles.image} source={require('../../../../assets/fridge.png')} />
    }
    else if(
        category == "Toilet Repair" ||
        category == "Toilet Installation" ||
        category == "Toilet Maintenance" ||
        category == "Clog removal" 
    ){
        console.log("true")
        return <Image style={styles.image} source={require('../../../../assets/bathroom.jpg')} />
    }
    else if(
        category == "Unlock service" ||
        category == "Installation lock" ||
        category == "Car locksmith" ||
        category == "Duplicating keys" 
    ){
        console.log("true")
        return <Image style={styles.image} source={require('../../../../assets/locksmith.jpg')} />
    }
  }

  console.log(availableServices)
  if(availableServices.length < 1) {
    return (
      <View>
        <View style={styles.nodataView}>
            <Text style={styles.noViewText}>No Providers current available.</Text>
        </View>
      </View>
    );
  }else{
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
            <GetImage />
        </View>
        <View>
          <ScrollView style={styles.scrollView}>
            {availableServices.map(newView =>
              <View key={newView.id} style={styles.newBookingPressableView}>
                <Pressable 
                  style={styles.newBookingPressable} 
                  onPress={() => {
                    navigation.navigate("NewBooking", {
                      data: newView,
                      token: authCtx.token
                    });
                    
                  }}
                >
                  <ServiceItem data={newView}/>
                </Pressable>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
};

export default ViewAvailableServicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 4
  },
  imageView: {
    display: "flex",
    flex: 1,
    padding: 5
  },
  image: {
    width: "80%",
    height: "100%",
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "black"
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
    borderRadius: 10,
    height: "100%"
  }
});
