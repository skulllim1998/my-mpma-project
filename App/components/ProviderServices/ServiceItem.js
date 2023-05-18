import { View, Text, StyleSheet, Pressable, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/Styles";

const ServiceItem = ({
  id,
  name,
  description,
  price_range,
  categoryData,
  active,
  onNavigateScreen,
  onGetCategory,
  onDeleteServiceHandler,
}) => {
  const category = onGetCategory(categoryData);

  const navigateScreen = () => {
    onNavigateScreen("ProviderAddService", {
      id,
      name,
      description,
      price_range,
      category: category,
      action: "UPDATE",
    });
  };

  const displayAlert = () => {
    Alert.alert(
      "Remove Service",
      "Do you want to remove service?",
      [
        {
          text: "Cancel",
          onPress: this._doSomethingSerious,
        },
        {
          text: "Remove",
          onPress: () => {
            onDeleteServiceHandler(id, { active: 0 });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Image
          style={styles.icon}
          source={require("../../../assets/customer-service.png")}
        />
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.paragraph}>{price_range}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.text} onPress={navigateScreen}>
            Edit
          </Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.text} onPress={displayAlert}>
            Remove
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ServiceItem;

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
  paragraph: {
    margin: 20,
    fontSize: GlobalStyles.textHeading,
    fontWeight: "bold",
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
