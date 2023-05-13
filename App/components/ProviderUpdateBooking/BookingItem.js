import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Alert,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useContext } from "react";
import DialogInput from "react-native-dialog-input";

import { GlobalStyles } from "../../constants/Styles";
import { BookingContext } from "../../util/booking-context";

const BookingItem = ({
  id,
  categoryData,
  date,
  session,
  address,
  onUpdateBookingPrice,
}) => {
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState("");

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.paragraphTitle}>Category</Text>
        <Text style={styles.paragraph}>{categoryData}</Text>
        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.paragraphTitle}>Date</Text>
            <Text style={styles.paragraph}>{date}</Text>
          </View>
          <View>
            <Text style={styles.paragraphTitle}>Timeslot</Text>
            <Text style={styles.paragraph}>{session}</Text>
          </View>
        </View>
        <Text style={styles.paragraphTitle}>Address</Text>
        <Text style={styles.paragraph}>{address}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text
            style={styles.text}
            onPress={() => {
              setVisible(true);
            }}
          >
            Accept
          </Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.text} onPress={() => {}}>
            Cancel
          </Text>
        </Pressable>
      </View>

      <DialogInput
        isDialogVisible={visible}
        title={"Accept Booking"}
        message={"Please set a booking price."}
        hintInput={"Enter price"}
        submitInput={(inputText) => {
          setInput(inputText);
          setVisible(false);
          onUpdateBookingPrice(id, { id: id, price: inputText });
        }}
        closeDialog={() => setVisible(false)}
      ></DialogInput>
    </View>
  );
};

export default BookingItem;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 15,
    backgroundColor: GlobalStyles.colors.yellow,
    elevation: 16,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 15,
  },
  rowContainer: {
    flexDirection: "row",
  },
  title: {
    marginHorizontal: 20,
    marginTop: 20,
    fontSize: GlobalStyles.textHeading,
  },
  paragraphTitle: {
    margin: 10,
    fontSize: GlobalStyles.textHeading,
    fontWeight: "bold",
  },
  paragraph: {
    margin: 10,
    fontSize: GlobalStyles.textHeading,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 32,
    margin: 10,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: GlobalStyles.colors.black,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
  icon: {
    width: 70,
    height: 70,
    margin: 20,
  },
});
