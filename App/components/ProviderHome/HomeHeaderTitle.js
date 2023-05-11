import { Text, View, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/Styles";

const HomeHeaderTitle = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Hello, Seller</Text>
      <Text style={styles.headerTitle}>Kuala Lumpur, Malaysia</Text>
    </View>
  );
};

export default HomeHeaderTitle;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.black,
    justifyContent: "center",
    paddingLeft: 30,
  },
  headerTitle: {
    color: GlobalStyles.colors.white,
  },
});
