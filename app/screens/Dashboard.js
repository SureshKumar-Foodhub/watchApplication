import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Images from '../utils/Images';

const DATA = [
  {
    id: '1',
    title: 'Pizza',
    image: Images.Pizza,
    backgroundColor: '#a8cc40',
  },
  {
    id: '2',
    title: 'Past Orders',
    image: Images.Sandwich,
    backgroundColor: '#eb4d4b',
  },
  {
    id: '3',
    title: 'Healthy Meals',
    image: Images.Meal,
    backgroundColor: '#eba75b',
  },
  {
    id: '4',
    title: 'Burger',
    image: Images.BurgerNew,
    backgroundColor: '#e47d8d',
  },
  {
    id: '5',
    title: 'Meat',
    image: Images.Meat,
    backgroundColor: '#67c7d1',
  },
];

const Item = ({title, image, backgroundColor}) => (
  <TouchableOpacity style={[styles.item, {backgroundColor}]}>
    <Image
      style={{
        position: 'absolute',
        top: -20,
        height: 60,
        width: 60,
        marginStart: 5
      }}
      source={image}
    />
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>For you</Text>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <Item
            title={item.title}
            image={item.image}
            backgroundColor={item.backgroundColor}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const {width} = Dimensions.get('window');
const itemHeight = width * 0.25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    marginStart: 10,
  },
  list: {
    alignItems: 'center',
    paddingTop: 20,
  },
  item: {
    width: width * 0.8,
    height: itemHeight,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    paddingRight: 7,
  },
  image: {
    justifyContent: 'center',
  },
  imageStyle: {
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'right',
  },
});

export default Dashboard;
