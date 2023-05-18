import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { useState, useContext, useEffect, useCallback } from "react";

import { AuthContext } from "../../../util/auth-context";

import { GlobalStyles } from "../../../constants/Styles";

function ServiceScreen( {data} ) {

    console.log(data)
    const authCtx = useContext(AuthContext);
    
    
    
    return (
        <View style={styles.flexDisplay}>
            <View style={styles.detialsView}>
                <Text style={styles.text}>Name : {data.name}</Text>
                <Text style={styles.text}>Category : {data.category}</Text>
                <Text style={styles.text}>Description : {data.description}</Text>
                <Text style={styles.text}>Price : RM {data.price_range}</Text>
                <Text style={styles.text}>Company : {data.admin_id.company_name}</Text>
            </View>
        </View>
    );
};

export default ServiceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.black,
      },
      flexDisplay: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        padding: 5
      },
      detialsView: {
        flex: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
      },
      image: {
        width: "90%",
        height: 120,
        marginRight: "auto",
        marginLeft: "auto",
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "black"
      },
      text: {
        fontSize: 16,
      }
});
