import { View, Text, StyleSheet, TextInput } from "react-native";

import { GlobalStyles } from "../../constants/Styles";
import ServiceCreate from "../../models/serviceCreate";
import { useState } from "react";

const Price = ({
  editedService,
  onSetEditedService,
  updatedService,
  onSetUpdatedService,
  action,
}) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const minPriceChangedHandler = (enteredPrice) => {
    setMinPrice(enteredPrice);

    if (action === "ADD") {
      onSetEditedService(
        new ServiceCreate(
          editedService.name,
          editedService.description,
          "RM " + enteredPrice + " - " + "RM " + maxPrice,
          editedService.category
        )
      );
    } else if (action === "UPDATE") {
      onSetUpdatedService(
        new ServiceCreate(
          updatedService.name,
          updatedService.description,
          "RM " + enteredPrice + " - " + "RM " + maxPrice,
          updatedService.category
        )
      );
    }
  };

  const maxPriceChangedHandler = (enteredPrice) => {
    setMaxPrice(enteredPrice);

    if (action === "ADD") {
      onSetEditedService(
        new ServiceCreate(
          editedService.name,
          editedService.description,
          "RM " + minPrice + " - " + "RM " + enteredPrice,
          editedService.category
        )
      );
    } else if (action === "UPDATE") {
      onSetUpdatedService(
        new ServiceCreate(
          updatedService.name,
          updatedService.description,
          "RM " + minPrice + " - " + "RM " + enteredPrice,
          updatedService.category
        )
      );
    }
  };

  return (
    <View>
      <Text style={styles.title}>Set price for your service:</Text>
      <View style={styles.container}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceTitle}>Min</Text>
          <TextInput
            style={styles.textInput}
            placeholder="price"
            keyboardType="decimal-pad"
            onChangeText={minPriceChangedHandler}
            value={minPrice}
          />
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceTitle}>Max</Text>
          <TextInput
            style={styles.textInput}
            placeholder="price"
            keyboardType="decimal-pad"
            onChangeText={maxPriceChangedHandler}
            value={maxPrice}
          />
        </View>
      </View>
    </View>
  );
};

export default Price;

const styles = StyleSheet.create({
  title: {
    marginLeft: 40,
    marginVertical: 30,
    fontSize: GlobalStyles.textHeading,
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    width: 100,
    color: "#120438",
    borderRadius: 10,
    padding: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceContainer: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  priceTitle: {
    fontSize: GlobalStyles.textHeading,
    marginHorizontal: 10,
  },
});
