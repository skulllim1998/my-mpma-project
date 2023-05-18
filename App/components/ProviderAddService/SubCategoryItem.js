import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

import { GlobalStyles } from "../../constants/Styles";
import ServiceCreate from "../../models/serviceCreate";

const SubCategoryItem = ({
  item,
  checked,
  onSetChecked,
  editedService,
  onSetEditedService,
  updatedService,
  onSetUpdatedService,
  action,
}) => {
  const setEditedService = () => {
    onSetChecked(item);

    if (action === "ADD") {
      onSetEditedService(
        new ServiceCreate(
          editedService.name,
          editedService.description,
          editedService.price_range,
          item
        )
      );
    } else if (action === "UPDATE") {
      onSetUpdatedService(
        new ServiceCreate(
          updatedService.name,
          updatedService.description,
          updatedService.price_range,
          item
        )
      );
    }
  };

  return (
    <View style={styles.gridItem}>
      <RadioButton
        value={item}
        status={checked === item ? "checked" : "unchecked"}
        onPress={setEditedService}
        color={GlobalStyles.colors.black}
      />
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );
};

export default SubCategoryItem;

const styles = StyleSheet.create({
  gridItem: {
    margin: 10,
    width: "40%",
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: GlobalStyles.textParagraph,
  },
});
