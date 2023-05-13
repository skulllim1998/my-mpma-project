import { StyleSheet, View, Text } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/Styles";

const AcceptBooking = () => {
  const navigation = useNavigation();

  const navigateScreen = () => {
    navigation.navigate("ProviderUpdateBooking");
  };

  return (
    <View style={styles.headerIcon}>
      <Text style={GlobalStyles.headerTitle}>Your Bookings</Text>
      <FontAwesome5
        name="bell"
        size={GlobalStyles.headerIcons}
        color={GlobalStyles.colors.white}
        onPress={navigateScreen}
      />
    </View>
  );
};

export default AcceptBooking;

const styles = StyleSheet.create({
  headerIcon: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: GlobalStyles.colors.white,
    fontSize: GlobalStyles.headerTitle,
  },
});
