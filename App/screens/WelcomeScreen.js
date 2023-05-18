import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

import { GlobalStyles } from "../constants/Styles";
import WelcomeButtons from "../components/Welcome/WelcomeButtons";

const WelcomeScreen = ({ navigation }) => {
  const navigateScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.bubble}>
          <Image
            style={styles.logo}
            source={require("../../assets/logo.png")}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomContent}></View>
        <View style={styles.bottomContent}>
          <Text style={styles.title}>Fixit</Text>
          <WelcomeButtons onNavigateScreen={navigateScreen} />
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.black,
  },
  topContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.yellow,
  },
  bottomContainer: {
    flex: 2,
  },
  bubble: {
    backgroundColor: GlobalStyles.colors.yellow,
    width: "100%",
    height: "140%",
    marginTop: 80,
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "50%",
    height: "50%",
  },
  title: {
    color: GlobalStyles.colors.white,
    fontSize: 40,
    fontWeight: "bold",
  },
  bottomContent: {
    flex: 1,
    alignItems: "center",
  },
});
