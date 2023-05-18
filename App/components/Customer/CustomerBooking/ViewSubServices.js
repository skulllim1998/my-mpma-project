import { View, Text, FlatList, StyleSheet, Item, Pressable } from "react-native";

import CategoryItem from "../../../components/ProviderCategory/CategoryItem";
import { GlobalStyles } from "../../../constants/Styles";

function ViewSubServicesScreen( {route, navigation} ) {
    console.log("category is")
    const categoryItem = route.params;
    console.log(categoryItem.itemData.item.subCategories)
    const renderCategoryItem = (itemData) => {
        console.log("this is item data")
        console.log(itemData)
        const navigateScreen = () => {
            navigation.navigate("ViewAvailableServices", {
                category: categoryItem.itemData.item.title,
                subCategory: itemData.item
            });
        };

        return (
            <CategoryItem
                title={itemData.item}
                color={categoryItem.itemData.item.color}
                onNavigate={navigateScreen}
            />
        );
    };

  return (
    <>
      <Text style={styles.title}>Select Sub Category</Text>
      <FlatList
        data={categoryItem.itemData.item.subCategories}
        keyExtractor={(item, index) => index}
        renderItem={renderCategoryItem}
        numColumns={2}
      />
    </>
  );
};

export default ViewSubServicesScreen;

const styles = StyleSheet.create({
  title: {
    margin: 30,
    color: "grey",
    fontSize: GlobalStyles.textHeading,
    fontWeight: "bold",
  },
});
