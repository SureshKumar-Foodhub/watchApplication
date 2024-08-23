import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

const OrderScreen = ({navigation}) => {
  const [quantity, setQuantity] = useState(1);
  const pricePerItem = 40;

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handlePlaceOrder = () => {
    navigation.navigate('AddressSelectionScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>For you</Text>
      <ScrollView>
        <View style={styles.card}>
          <Image
            source={{uri: 'https://via.placeholder.com/100x100.png'}} // Replace with actual image URL
            style={styles.image}
          />
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decrementQuantity} style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={incrementQuantity} style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.itemName}>Chicken Salad</Text>
          <TouchableOpacity
            style={styles.orderButton}
            onPress={handlePlaceOrder}>
            <Text style={styles.orderButtonText}>
              ₹{pricePerItem * quantity} Place order
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    // padding: 15,
    // alignItems: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
    // position: 'absolute',
    // left: 10,
    // top: 10,
  },
  time: {
    color: '#fff',
    fontSize: 18,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  card: {
    backgroundColor: '#1C1C1C',
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FF3B30',
    borderRadius: 30,
    // padding: 5,
    marginHorizontal: 10,
    paddingHorizontal: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  quantity: {
    color: '#fff',
    fontSize: 18,
  },
  itemName: {
    color: '#fff',
    fontSize: 15,
    marginTop: 5,
    textAlign: 'center'
  },
  orderButton: {
    backgroundColor: '#0080FF',
    borderRadius: 10,
    padding: 10,
    width: width * 0.8,
    alignItems: 'center',
    marginVertical: 10,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OrderScreen;
