import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useState, useContext } from "react";

import SubCategoryItem from "../../components/ProviderAddService/SubCategoryItem";
import { GlobalStyles } from "../../constants/Styles";
import Price from "../../components/ProviderAddService/Price";
import SaveBtn from "../../components/ProviderAddService/SaveBtn";
import ServiceCreate from "../../models/serviceCreate";
import { createService, updateService } from "../../util/serviceHttp";
import AddServiceForm from "../../components/ProviderAddService/AddServiceForm";
import { AuthContext } from "../../util/auth-context";
import { ServiceContext } from "../../util/service-context";

const ProviderAddServiceScreen = ({ route }) => {
  const [checked, setChecked] = useState("");
  const [editedService, setEditedService] = useState(
    new ServiceCreate("", "", "", "")
  );
  const [updatedService, setUpdatedService] = useState({
    service_id: null,
    name: "",
    description: "",
    price_range: "",
    category: "",
  });
  const categoryItem = route.params.category;
  const action = route.params.action;
  const serviceId = route.params.id;
  const authCtx = useContext(AuthContext);
  const serviceCtx = useContext(ServiceContext);

  const renderSubCategoryItem = (itemData) => {
    return (
      <SubCategoryItem
        item={itemData.item}
        checked={checked}
        onSetChecked={setChecked}
        editedService={editedService}
        onSetEditedService={setEditedService}
        updatedService={updatedService}
        onSetUpdatedService={setUpdatedServiceHandler}
        action={action}
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

  const setUpdatedServiceHandler = (service) => {
    setUpdatedService({
      service_id: serviceId,
      name: service.name,
      description: service.description,
      price_range: service.price_range,
      category: service.category,
    });
  };

  const saveForm = async () => {
    try {
      if (action === "ADD") {
        const createdService = await createService(
          editedService,
          authCtx.token
        );
        if (createdService.data !== null) {
          serviceCtx.addService(createdService.data);
          Alert.alert("Add Service", "Service created successfully.");
        }
      } else if (action === "UPDATE") {
        const updatedServiceData = await updateService(
          authCtx.token,
          updatedService
        );
        if (updatedServiceData.data !== null) {
          serviceCtx.updateService(
            updatedService.service_id,
            new ServiceCreate(
              updatedService.name,
              updatedService.description,
              updatedService.price_range,
              updatedService.category
            )
          );
          Alert.alert("Update Service", "Service updated successfully.");
        }
      }
    } catch (error) {
      Alert.alert(action + " Service Failed", error.toString());
    }
  };

  const ScrollList = ({ children }) => {
    return (
      <FlatList
        data={[]}
        keyExtractor={() => "key"}
        renderItem={null}
        ListHeaderComponent={<>{children}</>}
      />
    );
  };

  return (
    <View>
      <AddServiceForm
        editedService={editedService}
        onSetEditedService={setEditedServiceHandler}
        updatedService={updatedService}
        onSetUpdatedService={setUpdatedServiceHandler}
        action={action}
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
        updatedService={updatedService}
        onSetUpdatedService={setUpdatedServiceHandler}
        action={action}
      />
      <SaveBtn onSaveForm={saveForm} action={action} />
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
