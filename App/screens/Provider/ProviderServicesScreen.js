import { View, FlatList } from "react-native";
import { useContext } from "react";

import ServiceItem from "../../components/ProviderServices/ServiceItem";
import { ServiceContext } from "../../util/service-context";

const ProviderServicesScreen = ({ navigation }) => {
  const serviceCtx = useContext(ServiceContext);

  const renderServiceItem = (itemData) => {
    const item = itemData.item;

    const serviceItemProps = {
      name: item.name,
      description: item.description,
      price_range: item.price_range,
    };

    return <ServiceItem {...serviceItemProps} />;
  };

  return (
    <View>
      <FlatList
        data={serviceCtx.services}
        keyExtractor={(item) => item.id}
        renderItem={renderServiceItem}
      />
    </View>
  );
};

export default ProviderServicesScreen;
