import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Images from '../utils/Images';

const ItemList = props => {
  const itemDetails = props.route?.params?.productItem;
  const [searchText, setSearchText] = useState('');
  const onChangeSearch = value => {
    setSearchText(value);
  };
  const handleProceedOrder = order => {
    props.navigation.navigate('CheckoutPage', {order: order});
  };
  const handleBackPress = () => {
    props.navigation.goBack();
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          marginStart: 5,
        }}
        onPress={handleBackPress}>
        <Image style={{height: 20, width: 20}} source={Images.Previous} />
        <Text
          style={{
            color: '#000000',
            fontSize: 18,
            fontWeight: 'bold',
            marginStart: 10,
          }}>
          Items
        </Text>
      </TouchableOpacity>

      <View style={{marginTop: 10, marginHorizontal: 10}}>
        <ScrollView contentContainerStyle={{paddingBottom: 100}}>
          {itemDetails.map((item, i) => {
            return (
              <TouchableOpacity
                onPress={() => handleProceedOrder(item)}
                style={{
                  borderRadius: 5,
                  marginHorizontal: 10,
                  backgroundColor: '#ffffff',
                  marginTop: 10,
                  borderRadius: 10,
                }}>
                {item?.image ? (
                  <ImageBackground
                    source={{
                      uri: item?.image,
                    }}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 180,
                      width: '100%',
                    }}
                  />
                ) : (
                  <View>
                    <ImageBackground
                      source={Images.NoImage}
                      style={{height: 100, width: 100}}
                    />
                  </View>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    {item?.name}
                  </Text>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    ${item?.price}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
export default ItemList;
