// import React from 'react';
// import {Image, SafeAreaView, Text, TouchableOpacity} from 'react-native';
// import Images from '../utils/Images';

// const PaymentScreen = props => {
//   const handleBackPress = () => {
//     props.navigation.goBack();
//   };

//   return (
//     <SafeAreaView>
//       <TouchableOpacity
//         style={{flexDirection: 'row', alignItems: 'center'}}
//         onPress={handleBackPress}>
//         <Image style={{height: 15, width: 15}} source={Images.BackIcon} />
//         <Text style={{marginLeft: 10}}>Pay Using</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default PaymentScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import Images from '../utils/Images';

let successInterval = null;

const PaymentScreen = props => {
  const [paymentStatus, setPaymentStatus] = useState('initial');
  const handleBackPress = () => {
    props.navigation.goBack();
  };

  const handlePayPress = () => {
    let successTime = 0;
    setPaymentStatus('processing');
    successInterval = setInterval(() => {
      setPaymentStatus('success');
      if (successTime >= 1) {
        clearInterval(successInterval);
        props.navigation.navigate('StatusScreen');
      } else {
        successTime = successTime + 1;
      }
    }, 5000);
  };
  return (
    <View style={styles.container}>
      {paymentStatus === 'initial' && (
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={handleBackPress}>
            <Image
              style={{height: 15, width: 15, tintColor: 'white'}}
              source={Images.BackIcon}
            />
            <Text style={styles.headerText}>Pay Using</Text>
          </TouchableOpacity>
          <View style={styles.paymentContainer}>
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentAppName}>FOODHUB</Text>
              <Text style={styles.creditsAvailable}>Credits available</Text>
              <Text style={styles.creditAmount}>₹4000</Text>
            </View>
            {/* <TouchableOpacity style={styles.useCreditsButton}>
            <Text style={styles.useCreditsText}>Use credits</Text>
          </TouchableOpacity> */}
            <TouchableOpacity onPress={handlePayPress} style={styles.payButton}>
              <Text style={styles.payText}>Pay ₹434</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {paymentStatus === 'processing' && (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={styles.processingText}>Processing payment</Text>
        </View>
      )}

      {paymentStatus === 'success' && (
        <View style={styles.successContainer}>
          {/* <View style={styles.successIcon}>
            <Text style={styles.checkMark}>✔</Text>
          </View> */}
          <Image
            source={Images.OrderSuccessful}
            style={{width: 60, height: 60}}
          />
          <Text style={styles.successText}>Payment Sucessful</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#000',
  },
  paymentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 5,
  },
  paymentDetails: {
    alignItems: 'center',
    marginBottom: 20,
  },
  paymentAppName: {
    color: '#00f',
    fontSize: 22,
    fontWeight: 'bold',
  },
  creditsAvailable: {
    color: '#ccc',
    fontSize: 14,
  },
  creditAmount: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  useCreditsButton: {
    backgroundColor: '#222',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  useCreditsText: {
    color: '#fff',
    fontSize: 16,
  },
  payButton: {
    backgroundColor: '#f00',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  payText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  processingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  processingText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  successIcon: {
    backgroundColor: '#0f0',
    borderRadius: 50,
    padding: 20,
  },
  checkMark: {
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold',
  },
  successText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default PaymentScreen;
