import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { useState, useContext } from "react";

import SubCategoryItem from "../../components/ProviderAddService/SubCategoryItem";
import { GlobalStyles } from "../../constants/Styles";
import Price from "../../components/ProviderAddService/Price";
import SaveBtn from "../../components/ProviderAddService/SaveBtn";
import ServiceCreate from "../../models/serviceCreate";
import { createService } from "../../util/serviceHttp";
import AddServiceForm from "../../components/ProviderAddService/AddServiceForm";
import { AuthContext } from "../../util/auth-context";

const ProviderAddServiceScreen = ({ route }) => {
  const [checked, setChecked] = useState("");
  const [editedService, setEditedService] = useState(
    new ServiceCreate("", "", "", "")
  );
  const categoryItem = route.params.category;
  const authCtx = useContext(AuthContext);

  const renderSubCategoryItem = (itemData) => {
    return (
      <SubCategoryItem
        item={itemData.item}
        checked={checked}
        onSetChecked={setChecked}
        editedService={editedService}
        onSetEditedService={setEditedService}
      />
    );
  };

  const setEditedServiceHandler = (service) => {
    setEditedService(
      new ServiceCreate(
        service.name,
        service.description,
        service.price_range,
        service.category
      )
    );
  };

  const saveForm = async () => {
    try {
      const createdService = await createService(editedService, authCtx.token);
      if (createdService !== null) {
        Alert.alert("Add Service", "Service created successfully.");
      }
    } catch (error) {
      Alert.alert("Add Service Failed", "Something went wrong.");
    }
  };

  return (
    <View>
      <AddServiceForm
        editedService={editedService}
        onSetEditedService={setEditedServiceHandler}
      />
      <Text style={styles.title}>Select your list of service options:</Text>
      <View style={styles.container}>
        <FlatList
          data={categoryItem.subCategories}
          keyExtractor={(item) => item}
          renderItem={renderSubCategoryItem}
          numColumns={2}
        />
      </View>
      <Price
        editedService={editedService}
        onSetEditedService={setEditedServiceHandler}
      />
      <SaveBtn onSaveForm={saveForm} />
    </View>
  );
};

export default ProviderAddServiceScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    marginLeft: 40,
    marginVertical: 30,
    fontSize: GlobalStyles.textHeading,
    fontWeight: "bold",
  },
});
