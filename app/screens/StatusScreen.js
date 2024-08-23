import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Images from '../utils/Images';

let timeout = null;

const StatusScreen = props => {
  const [currentStatus, setCurrentStatus] = useState('waiting');

  useEffect(() => {
    timeout = setTimeout(() => {
      if (currentStatus === 'waiting') {
        setCurrentStatus('prepared');
      } else if (currentStatus === 'prepared') {
        setCurrentStatus('pickedup');
      } else if (currentStatus === 'pickedup') {
        setCurrentStatus('ontheway');
      } else if (currentStatus === 'ontheway') {
        setCurrentStatus('delivered');
        setTimeout(() => {
          props.navigation.navigate('SplashScreen');
        }, 3000);
      }
    }, 5000);
  }, [currentStatus, props.navigation]);

  const handleBackPress = () => {
    clearTimeout(timeout);
    props.navigation.navigate('SplashScreen');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity onPress={handleBackPress} style={styles.header}>
        <Image
          style={{height: 15, width: 15, tintColor: 'white'}}
          source={Images.Previous}
        />
        <Text style={styles.appTitle}>FOODHUB</Text>
      </TouchableOpacity>

      {/* Order Status */}
      {currentStatus === 'waiting' && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Order Received</Text>
          <Text style={styles.statusNow}>NOW</Text>
          <Text style={styles.subText}>Awaiting restaurant confirmation.</Text>
        </View>
      )}

      {/* Secondary Status */}
      {currentStatus === 'prepared' && (
        <View style={styles.nextStatusContainer}>
          <Text style={styles.nextStatusLabel}>NEXT</Text>
          <Text style={styles.nextSubText}>Food is Being Prepared</Text>
          <Text style={styles.etaText}>ETA: 30 mins</Text>
        </View>
      )}

      {currentStatus === 'pickedup' && (
        <View style={styles.pickedUpContainer}>
          <Text style={styles.pickedUpLabel}>Order Picked Up</Text>
          <Text style={styles.statusNow}>NOW</Text>
          <Text style={styles.pickedUpSubText}>
            Tasty food en route!{' '}
            <Text style={styles.boldText}>Vinay Hegde</Text> has picked up your
            order.
          </Text>
          <Text style={styles.etaText}>ETA: 15 mins</Text>
        </View>
      )}

      {currentStatus === 'ontheway' && (
        <View style={styles.nextStatusContainer}>
          <Text style={styles.nextStatusLabel}>Address</Text>
          <Text style={styles.nextSubText}>Your order is on the way</Text>
          <Text style={styles.etaText}>
            On time, reaching near you in 14 minutes
          </Text>
        </View>
      )}

      {currentStatus === 'delivered' && (
        <View style={styles.nextStatusContainer}>
          <Text style={styles.nextStatusLabel}>Your order is delivered</Text>
          <Text style={styles.nextSubText}>Thank You!!!</Text>
        </View>
      )}
    </View>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  appTitle: {
    color: '#FF8C00',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  time: {
    color: '#fff',
    fontSize: 18,
  },
  statusContainer: {
    backgroundColor: '#1C1C1C',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  statusLabel: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusNow: {
    color: '#0080FF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    color: '#B0B0B0',
    fontSize: 16,
  },
  nextStatusContainer: {
    backgroundColor: '#1C1C1C',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  nextStatusLabel: {
    color: '#B0B0B0',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  nextSubText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  etaText: {
    color: '#B0B0B0',
    fontSize: 13,
    marginTop: 5,
  },
  pickedUpContainer: {
    backgroundColor: '#1C1C1C',
    padding: 15,
    borderRadius: 10,
  },
  pickedUpLabel: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pickedUpSubText: {
    color: '#B0B0B0',
    fontSize: 13,
    marginTop: 5,
  },
  boldText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default StatusScreen;
