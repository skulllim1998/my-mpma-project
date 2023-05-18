import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

import { GlobalStyles } from "../../../constants/Styles";

function ActiveBookingItems({data}) {
    console.log(data)

    function GetImage(){
        console.log(data.service_id.category)
        if(
            data.service_id.category == "Air Condition Installation" ||
            data.service_id.category == "Air Condition Repair" ||
            data.service_id.category == "Air Condition Maintenance" ||
            data.service_id.category == "Air Condition Cleaning" 
        ){
            console.log("true")
            return <Image style={styles.image} source={require('../../../../assets/aircond.jpg')} />
        }
        else if(
            data.service_id.category == "Engine repair" ||
            data.service_id.category == "Brake system repair" ||
            data.service_id.category == "Suspension repair" ||
            data.service_id.category == "Electrical system repair" 
        ){
            console.log("true")
            return <Image style={styles.image} source={require('../../../../assets/car.png')} />
        }
        else if(
            data.service_id.category == "Exterior car wash" ||
            data.service_id.category == "Interior car wash" ||
            data.service_id.category == "Hand car wash" ||
            data.service_id.category == "Detailing services" 
        ){
            console.log("true")
            return <Image style={styles.image} source={require('../../../../assets/carwash.jpg')} />
        }
        else if(
            data.service_id.category == "Washing Machine Repair" ||
            data.service_id.category == "Washing Machine Installation" ||
            data.service_id.category == "Washing Machine Maintenance" ||
            data.service_id.category == "Washing Machine Part replacement" 
        ){
            console.log("true")
            return <Image style={styles.image} source={require('../../../../assets/washing-machine.png')} />
        }
        else if(
            data.service_id.category == "Refrigerator Repair" ||
            data.service_id.category == "Refrigerator Installation" ||
            data.service_id.category == "Refrigerator Maintenance" ||
            data.service_id.category == "Refrigerator Part replacement" 
        ){
            console.log("true")
            return <Image style={styles.image} source={require('../../../../assets/fridge.png')} />
        }
        else if(
            data.service_id.category == "Toilet Repair" ||
            data.service_id.category == "Toilet Installation" ||
            data.service_id.category == "Toilet Maintenance" ||
            data.service_id.category == "Clog removal" 
        ){
            console.log("true")
            return <Image style={styles.image} source={require('../../../../assets/bathroom.jpg')} />
        }
        else if(
            data.service_id.category == "Unlock service" ||
            data.service_id.category == "Installation lock" ||
            data.service_id.category == "Car locksmith" ||
            data.service_id.category == "Duplicating keys" 
        ){
            console.log("true")
            return <Image style={styles.image} source={require('../../../../assets/locksmith.jpg')} />
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
        <View style={styles.flexDisplay}>
            <View style={styles.imageView}>
                <GetImage />
            </View>
            <View style={styles.detialsView}>
                <Text style={styles.text}>Service Name : {data.service_id.name}</Text>
                <PriceChecker />
                <Text style={styles.text}>Status : {data.status}</Text>
                <Text style={styles.text}>Date : {data.date}</Text>
            </View>
        </View>
    );
  
};

export default ActiveBookingItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.black,
  },
  flexDisplay: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: 5
  },
  imageView: {
    display: "flex",
    flex: 1,
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
  }
});
