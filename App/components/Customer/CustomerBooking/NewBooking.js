import { View, Text, StyleSheet, Image, ScrollView, Pressable, Alert } from "react-native";
import { useState, useContext, useEffect, useCallback } from "react";

import { GlobalStyles } from "../../../constants/Styles";
import { TextInput } from "react-native-paper";
import { SelectList } from 'react-native-dropdown-select-list'
import { SafeAreaView } from "react-native-safe-area-context";
import {newBooking} from "../../../util/customerHttp";


function NewBookingScreen( {route, navigation} ) {
    

    const data = route.params.data;
    const token = route.params.token;
    
    console.log("data is")
    console.log(data)
    console.log(console.log(data))
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');

    const [selected, setSelected] = useState("");
    const sessions = [
        {key:'1', value:'AM/PM', disabled:true},
        {key:'2', value:'AM'},
        {key:'3', value:'PM'}
    ]

    async function NewBookingFunc() {
        const bookingData = {
            service_id: data.id,
            address: address,
            date: day+'-'+month+'-'+year,
            session: selected,
            notes: notes
        }
        console.log("new booking func start")
        console.log(bookingData)
        try {
            var response = await newBooking(token, bookingData);
            console.log(response)
            if(response != null) {
                Alert.alert('Booking Successful!')
            }
            
        } catch (error) {
            Alert.alert("Register Failed", "Something went wrong.");
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
                        <Text>{data.category}</Text>
                    </View>
                </View>
                <View style={styles.rowView}>
                    <View style={styles.rowView1}>
                        <Text>Service Title : </Text>
                    </View>
                    <View style={styles.rowView2}>
                        <Text>{data.name}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.rowView}>
                <View style={styles.rowView1}>
                    <Text>Date {'(dd-mm-yyyy)'} : </Text>
                </View>
                <View style={styles.canlendarView}>
                    <TextInput
                        value={day}
                        keyboardType="numeric"
                        placeholder="date"
                        maxLength={2}
                        onChangeText={setDay}
                        style={styles.calendarViewInput}
                    />
                    <Text>-</Text>
                    <TextInput
                        value={month}
                        keyboardType="numeric"
                        placeholder="month"
                        maxLength={2}
                        onChangeText={setMonth}
                    />
                    <Text>-</Text>
                    <TextInput
                        value={year}
                        keyboardType="numeric"
                        placeholder="year"
                        maxLength={4}
                        onChangeText={setYear}
                    />
                </View>
            </View>

            <View style={styles.rowView}>
                <View style={styles.rowView1}>
                    <Text>Session {'(AM/PM)'} : </Text>
                </View>
                <View style={styles.rowView2}>
                    <SelectList 
                        setSelected={(val) => setSelected(val)} 
                        data={sessions} 
                        save="value"
                    />
                </View>
            </View>

            <View style={styles.rowView}>
                <View style={styles.rowView1}>
                    <Text>Address : </Text>
                </View>
                <View style={styles.rowView2}>
                    <TextInput                        
                        onChangeText={setAddress}
                        value={address}
                    />
                    <Text style={styles.noteText}>If same as profile address then leave blank.</Text>
                </View>
            </View>

            <View style={styles.rowView}>
                <View style={styles.rowView1}>
                    <Text>Notes : </Text>
                </View>
                <View style={styles.rowView2}>
                    <TextInput                        
                        onChangeText={setNotes}
                        value={notes}
                    />
                </View>
            </View>

            <Pressable style={styles.bookNowBtn} onPress={NewBookingFunc}>
                <Text>Book Now!</Text>
            </Pressable>          
        </SafeAreaView>
    );
};

export default NewBookingScreen;

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
