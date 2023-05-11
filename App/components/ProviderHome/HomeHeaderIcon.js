import { StyleSheet, View } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import { GlobalStyles } from "../../constants/Styles";

const HomeHeaderIcon = () => {
  return (
    <View style={styles.headerIcon}>
      <MaterialIcons
        name="view-headline"
        size={GlobalStyles.headerIcons}
        color={GlobalStyles.colors.white}
        onPress={() => console.log("pressed")}
      />
      <FontAwesome5
        name="bell"
        size={GlobalStyles.headerIcons}
        color={GlobalStyles.colors.white}
        onPress={() => console.log("pressed")}
      />
    </View>
  );
};

export default HomeHeaderIcon;

const styles = StyleSheet.create({
  headerIcon: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
