import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

import { GlobalStyles } from "../../constants/Styles";
import OnGoingBookingsList from "./OnGoingBookingsList";
import CompletedBookingsList from "./CompletedBookingsList";

const BookingsBar = ({ onSetComponents, bookingCtx, serviceCtx }) => {
  const [colors, setColors] = useState({
    onGoingColor: GlobalStyles.colors.yellow,
    completedColor: "",
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.onGoing, { backgroundColor: colors.onGoingColor }]}
          onPress={() => {
            setColors({
              onGoingColor: GlobalStyles.colors.yellow,
              completedColor: GlobalStyles.colors.white,
            });
            onSetComponents(
              <OnGoingBookingsList
                bookingCtx={bookingCtx}
                serviceCtx={serviceCtx}
              />
            );
          }}
        >
          <Text style={styles.text}>On Going</Text>
        </Pressable>
        <Pressable
          style={[styles.completed, { backgroundColor: colors.completedColor }]}
          onPress={() => {
            setColors({
              onGoingColor: GlobalStyles.colors.white,
              completedColor: GlobalStyles.colors.yellow,
            });
            onSetComponents(
              <CompletedBookingsList
                bookingCtx={bookingCtx}
                serviceCtx={serviceCtx}
              />
            );
          }}
        >
          <Text style={styles.text}>Completed</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default BookingsBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: GlobalStyles.colors.white,
    fontSize: 30,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: GlobalStyles.colors.white,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 5,
    borderRadius: 30,
    elevation: 16,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 15,
  },
  onGoing: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    marginLeft: 10,
    borderRadius: 30,
  },
  completed: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 32,
    marginRight: 10,
    borderRadius: 30,
  },
  text: {
    fontSize: GlobalStyles.textHeading,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: GlobalStyles.colors.black,
    fontWeight: "bold",
  },
});
