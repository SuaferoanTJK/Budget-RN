import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

import {formatQuantity} from '../helpers';
import globalStyles from '../styles';

const ControlBudget = ({
  budget,
  budgetManager,
  setBudgetManager,
  bills,
  setBtnDisabled,
  resetApp,
}) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const spent = bills.reduce(
      (total, bill) => Number(bill.quantity) + total,
      0,
    );
    const available = budget - spent;
    setPercentage(((budget - available) / budget) * 100);
    if (available === 0) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
    setBudgetManager({available, spent});
  }, [bills]);

  return (
    <View style={styles.container}>
      <View style={styles.graph}>
        <CircularProgress
          value={percentage}
          duration={1000}
          radius={100}
          valueSuffix={'%'}
          progressValueColor={'#3B82F6'}
          title={'Spent'}
          titleStyle={{fontWeight: 'bold', fontSize: 18}}
          titleColor={'#3B82F6'}
          inActiveStrokeColor={'#F5F5F5'}
          inActiveStrokeWidth={10}
          activeStrokeColor={'#3B82F6'}
          activeStrokeWidth={10}
          maxValue={100}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.value}>
          <Text style={styles.label}>Your budget is: </Text>
          {formatQuantity(budget)}
        </Text>
        <Text style={styles.value}>
          <Text style={styles.label}>Available: </Text>
          {formatQuantity(budgetManager.available)}
        </Text>
        <Text style={styles.value}>
          <Text style={styles.label}>Spent: </Text>
          {formatQuantity(budgetManager.spent)}
        </Text>
      </View>
      <View>
        <Pressable style={styles.btnCancel} onLongPress={resetApp}>
          <Text style={styles.btnCancelText}>Reset App</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    marginVertical: 20,
  },
  graph: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  textContainer: {marginTop: 30},
  value: {fontSize: 17, textAlign: 'center', marginBottom: 5},
  label: {fontWeight: '700', color: '#3B82F6'},
  btnCancel: {
    backgroundColor: '#5827A4',
    marginTop: 20,
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default ControlBudget;
