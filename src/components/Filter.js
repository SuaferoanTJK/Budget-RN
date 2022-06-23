import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import globalStyles from '../styles';

const Filter = ({bills, filterData, setFilterData}) => {
  useEffect(() => {
    if (filterData.category === '') {
      setFilterData({...filterData, billsFiltered: []});
    } else {
      const billsFiltered = bills.filter(
        bill => bill.category === filterData.category,
      );
      setFilterData({...filterData, billsFiltered});
    }
  }, [filterData.category]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filter expenses</Text>
      <Picker
        style={styles.input}
        selectedValue={filterData.category}
        onValueChange={category => {
          setFilterData({...filterData, category});
        }}>
        <Picker.Item label="All" value="" />
        <Picker.Item label="Bills" value="bills" />
        <Picker.Item label="Food" value="food" />
        <Picker.Item label="Health" value="health" />
        <Picker.Item label="House" value="house" />
        <Picker.Item label="Leisure" value="leisure" />
        <Picker.Item label="Saving" value="saving" />
        <Picker.Item label="Subscriptions" value="subscriptions" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {...globalStyles.container, paddingVertical: 25},
  label: {fontSize: 18, fontWeight: '900', color: '#64748B'},
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
});

export default Filter;
