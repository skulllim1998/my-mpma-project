import { View, FlatList } from "react-native";
import { useContext } from "react";

import ServiceItem from "../../components/ProviderServices/ServiceItem";
import { ServiceContext } from "../../util/service-context";
import { deleteService } from "../../util/serviceHttp";
import { CATEGORIES } from "../../data/dummy-data";
import { AuthContext } from "../../util/auth-context";

const ProviderServicesScreen = ({ navigation }) => {
  const serviceCtx = useContext(ServiceContext);
  const authCtx = useContext(AuthContext);
  const activeServices = serviceCtx.services.filter(
    (service) => service.active === 1
  );

  const renderServiceItem = (itemData) => {
    const item = itemData.item;

    const serviceItemProps = {
      id: item.id,
      name: item.name,
      description: item.description,
      price_range: item.price_range,
      categoryData: item.category,
      active: item.active,
      onNavigateScreen: navigateScreen,
      onGetCategory: getCategory,
      onDeleteServiceHandler: deleteServiceHandler,
    };

    return <ServiceItem {...serviceItemProps} />;
  };

  const navigateScreen = (screen, serviceData) => {
    navigation.navigate(screen, serviceData);
  };

  const getCategory = (subCategory) => {
    const category = CATEGORIES.find((item) => {
      const found = item.subCategories.find(
        (subItem) => subItem === subCategory
      );
      if (found) {
        return item.title;
      }
    });
    return category;
  };

  const deleteServiceHandler = async (id, serviceData) => {
    const response = await deleteService(authCtx.token, { service_id: id });

    if (response.message !== null) {
      serviceCtx.updateService(id, serviceData);
    }
  };

  return (
    <View>
      <FlatList
        data={activeServices}
        keyExtractor={(item) => item.id}
        renderItem={renderServiceItem}
      />
    </View>
  );
};

export default ProviderServicesScreen;
