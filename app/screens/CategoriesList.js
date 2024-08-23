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

const CategoriesList = props => {
  const productData = props.route?.params?.itemDetails?.categories;
  const [searchText, setSearchText] = useState('');
  const onChangeSearch = value => {
    setSearchText(value);
  };

  const handleItemNavigation = productItem => {
    props.navigation.navigate('ItemList', {productItem: productItem});
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
        <Image style={{height: 20, width: 20}} source={Images.BackIcon} />
        <Text
          style={{
            color: '#000000',
            fontSize: 18,
            fontWeight: 'bold',
            marginStart: 10,
          }}>
          Categories
        </Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <View style={{marginTop: 10, marginHorizontal: 10}}>
          {productData?.map((item, i) => {
            return (
              <TouchableOpacity
                onPress={() => handleItemNavigation(item?.items)}
                style={{
                  borderRadius: 5,
                  marginHorizontal: 10,
                  alignItems: 'center',
                  marginTop: 10,
                  borderRadius: 10,
                }}>
                {item?.image ? (
                  <ImageBackground
                    source={{
                      uri: item?.image,
                    }}
                    style={{height: 180, width: '100%'}}>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: 22,
                        fontWeight: 'bold',
                        padding: 20,
                      }}>
                      {item?.name}
                    </Text>
                  </ImageBackground>
                ) : (
                  <View>
                    <ImageBackground
                      source={Images.NoImage}
                      style={{height: 100, width: 100}}></ImageBackground>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 22,
                        fontWeight: 'bold',
                        padding: 20,
                      }}>
                      {item?.name}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
export default CategoriesList;
