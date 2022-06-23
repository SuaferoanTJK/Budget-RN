import React from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import globalStyles from '../styles';

const NewBudget = ({budget, setBudget, handleNewBudget}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Define Budget</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Add your budget"
        value={budget.toString()}
        onChangeText={setBudget}
      />
      <Pressable
        style={styles.btn}
        onPress={() => {
          handleNewBudget(budget);
        }}>
        <Text style={styles.btnText}>Add Budget</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    marginVertical: 20,
  },
  label: {
    textAlign: 'center',
    fontSize: 20,
    color: '#3B82F6',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 20,
  },
  btn: {
    marginTop: 30,
    backgroundColor: '#1048A4',
    padding: 15,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '900',
  },
});

export default NewBudget;
