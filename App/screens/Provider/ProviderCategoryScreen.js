import { View, Text, FlatList, StyleSheet } from "react-native";

import { CATEGORIES } from "../../data/dummy-data";
import CategoryItem from "../../components/ProviderCategory/CategoryItem";
import { GlobalStyles } from "../../constants/Styles";

const ProviderCategoryScreen = ({ navigation }) => {
  const renderCategoryItem = (itemData) => {
    const navigateScreen = () => {
      navigation.navigate("ProviderAddService", { category: itemData.item });
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

export default ProviderCategoryScreen;

const styles = StyleSheet.create({
  title: {
    margin: 30,
    color: "grey",
    fontSize: GlobalStyles.textHeading,
    fontWeight: "bold",
  },
});
