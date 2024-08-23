import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

const AddressSelectionScreen = ({navigation}) => {
  const [selectedAddress, setSelectedAddress] = useState('Home');

  const addresses = [
    {
      label: 'Home',
      address: '10, Nehru Street, Sakthi Nagar, Madurai - 625121',
    },
    {
      label: 'Work',
      address: '438, Phils Bistro, KK Nagar, Madurai - 625020',
    },
  ];

  const selectAddress = label => setSelectedAddress(label);

  const handleNextPress = () => {
    navigation.navigate('PaymentScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Address</Text>
      <ScrollView>
        {addresses.map(({label, address}) => (
          <TouchableOpacity
            key={label}
            style={styles.addressContainer}
            onPress={() => selectAddress(label)}>
            <View style={styles.addressInfo}>
              <Text style={styles.addressLabel}>{label}</Text>
              <Text style={styles.addressText}>{address}</Text>
            </View>
            <View
              style={[
                styles.circle,
                {
                  backgroundColor:
                    selectedAddress === label ? '#32CD32' : '#333',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              {selectedAddress === label && (
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 10,
                    backgroundColor: 'white',
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={handleNextPress} style={styles.nextButton}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
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
    marginBottom: 5,
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
  addressContainer: {
    backgroundColor: '#1C1C1C',
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    // width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  addressInfo: {
    flex: 1,
  },
  addressLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addressText: {
    color: '#B0B0B0',
    marginTop: 5,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  nextButton: {
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: '#32CD32',
    borderRadius: 10,
  },
  nextText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default AddressSelectionScreen;
