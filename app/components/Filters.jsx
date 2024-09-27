import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

const Filters = ({ filter, setFilter }) => {
  return (
    <View style={styles.filters}>
      <TouchableOpacity
        onPress={() => {
          setFilter('BOLA');
        }}>
        <Text
          style={{
            backgroundColor: filter === 'BOLA' ? '#338985' : '#015953',
            color: 'white',
            minHeight: 30,
            fontSize: 15,
            fontWeight: 'bold',
            width: 100,
            textAlign: 'center',
          }}>
          BOLA
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setFilter('PARLE');
        }}>
        <Text
          style={{
            backgroundColor: filter === 'PARLE' ? '#338985' : '#015953',
            color: 'white',
            minHeight: 30,
            fontSize: 15,
            fontWeight: 'bold',
            width: 100,
            textAlign: 'center',
          }}>
          PARLE
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setFilter('CENT');
        }}>
        <Text
          style={{
            backgroundColor: filter === 'CENT' ? '#338985' : '#015953',
            color: 'white',
            minHeight: 30,
            fontSize: 15,
            fontWeight: 'bold',
            width: 100,
            textAlign: 'center',
          }}>
          CENT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#015953',
  },
  filterButton: {
    backgroundColor: '#015953',
    color: 'white',
    minHeight: 30,
    fontSize: 15,
    fontWeight: 'bold',
    width: 100,
    textAlign: 'center',
  },
});
