import { StyleSheet, View, Text } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/Styles";

const AddService = () => {
  const navigation = useNavigation();

  const navigateScreen = () => {
    navigation.navigate("ProviderCategory");
  };

  return (
    <View style={styles.headerIcon}>
      <Text style={GlobalStyles.headerTitle}>Your Services</Text>
      <MaterialIcons
        name="add"
        size={GlobalStyles.headerIcons}
        color={GlobalStyles.colors.white}
        onPress={navigateScreen}
      />
    </View>
  );
};

export default AddService;

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
