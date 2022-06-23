import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import globalStyles from '../styles';
import {formatQuantity} from '../helpers/index';

const FormBill = ({
  setVisibilityModal,
  handleBills,
  budget,
  billSelected,
  setBillSelected,
  handleDelete,
}) => {
  const initialState = {
    name: '',
    quantity: '',
    category: '',
  };
  const [formData, setFormData] = useState(initialState);
  const [amount, setAmount] = useState(budget.available);

  useEffect(() => {
    if (billSelected.id) {
      setFormData({
        name: billSelected.name,
        quantity: billSelected.quantity,
        category: billSelected.category,
        id: billSelected.id,
        date: billSelected.date,
      });
      setAmount(Number(budget.available) + Number(billSelected.quantity));
    }
  }, [billSelected]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnsContainer}>
        <Pressable
          style={[styles.btn, styles.btnCancel]}
          onPress={() => {
            setVisibilityModal(false);
            setBillSelected({});
          }}>
          <Text style={styles.btnText}>X Cancel</Text>
        </Pressable>
        {billSelected.id && (
          <Pressable
            style={[styles.btn, styles.btnDelete]}
            onPress={() => {
              handleDelete(billSelected.id);
            }}>
            <Text style={styles.btnText}>Delete</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>
          {billSelected.name ? 'Update' : 'New'} Bill
        </Text>
        <Text style={styles.budget}>
          {!billSelected.id
            ? `Your available budget is: ${formatQuantity(budget.available)}`
            : `With the price of this item you have an available budget of: ${formatQuantity(
                amount,
              )}`}
        </Text>
        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Add name of the bill"
            value={formData.name}
            onChangeText={name => {
              setFormData({...formData, name});
            }}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Add price of the bill"
            keyboardType="numeric"
            value={formData.quantity}
            onChangeText={quantity => {
              setFormData({...formData, quantity});
            }}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Category</Text>
          <Picker
            style={styles.input}
            selectedValue={formData.category}
            onValueChange={category => {
              setFormData({...formData, category});
            }}>
            <Picker.Item label="-- Choose --" value="" />
            <Picker.Item label="Bills" value="bills" />
            <Picker.Item label="Food" value="food" />
            <Picker.Item label="Health" value="health" />
            <Picker.Item label="House" value="house" />
            <Picker.Item label="Leisure" value="leisure" />
            <Picker.Item label="Saving" value="saving" />
            <Picker.Item label="Subscriptions" value="subscriptions" />
          </Picker>
        </View>
        <Pressable
          style={styles.btnSubmit}
          onPress={() => {
            handleBills(formData, amount);
          }}>
          <Text style={styles.btnSubmitText}>
            {billSelected.name ? 'Update' : 'Add'} Bill
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E40AF',
    flex: 1,
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  btn: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '45%',
  },
  btnCancel: {
    backgroundColor: '#DB2777',
  },
  btnDelete: {
    backgroundColor: 'red',
  },
  btnText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  form: {...globalStyles.container, marginBottom: 20},
  title: {
    textAlign: 'center',
    fontSize: 24,
    color: '#64748B',
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  budget: {
    textAlign: 'center',
    marginBottom: 20,
  },
  field: {marginVertical: 10},
  label: {color: '#64748B', fontWeight: '700', fontSize: 16},
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  btnSubmit: {
    backgroundColor: '#3B82F6',
    padding: 10,
    marginTop: 30,
    borderRadius: 10,
  },
  btnSubmitText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '900',
    textTransform: 'uppercase',
    paddingVertical: 5,
  },
});

export default FormBill;
