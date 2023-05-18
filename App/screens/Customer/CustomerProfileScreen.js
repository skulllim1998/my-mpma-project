import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { useState, useContext, useEffect, useCallback } from "react";

import { AuthContext } from "../../util/auth-context";

import { GlobalStyles } from "../../constants/Styles";

function CustomerHomeScreen() {

  const authCtx = useContext(AuthContext);
  const logout = () => {
    authCtx.logout();
  };

  return (
    <View >
        <Text>Profile Screen</Text>
        
        <Pressable style={styles.button} onPress={logout}>
          <Text style={styles.text}>Logout</Text>
        </Pressable>
    </View>
  );
};

export default CustomerHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.black,
  }
});
