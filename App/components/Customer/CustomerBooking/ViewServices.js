import { View, Text, FlatList, StyleSheet, Item, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CATEGORIES } from "../../../data/dummy-data";
import CategoryItem from "../../../components/ProviderCategory/CategoryItem";
import { GlobalStyles } from "../../../constants/Styles";

function CustomerCategoryScreen() {
    const navigation = useNavigation();
    const renderCategoryItem = (itemData) => {
        console.log("item data is")
        console.log(itemData)
        const navigateScreen = () => {
            navigation.navigate("ViewSubServices", {
                itemData: itemData
            });
        };

        return (
            <CategoryItem
                title={itemData.item.title}
                color={itemData.item.color}
                onNavigate={navigateScreen}
            />
        );
    };

  return (
    <>
      <Text style={styles.title}>Select Category</Text>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
      />
    </>
  );
};

export default CustomerCategoryScreen;

const styles = StyleSheet.create({
  title: {
    margin: 30,
    color: "grey",
    fontSize: GlobalStyles.textHeading,
    fontWeight: "bold",
  },
});
