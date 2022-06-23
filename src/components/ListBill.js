import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Bill from './Bill';

const ListBill = ({bills, setVisibilityModal, setBillSelected, filterData}) => {
  const message =
    bills.length === 0 ||
    (filterData.billsFiltered.length === 0 && !!filterData.category);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses</Text>
      {filterData.category
        ? filterData.billsFiltered.map(bill => (
            <Bill
              info={bill}
              key={bill.id}
              setVisibilityModal={setVisibilityModal}
              setBillSelected={setBillSelected}
            />
          ))
        : bills.map(bill => (
            <Bill
              info={bill}
              key={bill.id}
              setVisibilityModal={setVisibilityModal}
              setBillSelected={setBillSelected}
            />
          ))}
      {message && (
        <Text style={styles.noExpenses}>There are not expenses yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 80,
  },
  title: {
    color: '#64748B',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 20,
  },
  noExpenses: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ListBill;
