import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Expense Planner</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 35,
    paddingBottom: 10,
  },
  text: {
    color: '#3D82F6',
    textAlign: 'center',
    fontSize: 36,
    textTransform: 'uppercase',
    fontWeight: '900',
  },
});

export default Header;
