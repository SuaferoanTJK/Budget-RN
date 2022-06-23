import React from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';

import globalStyles from '../styles/index';
import {formatQuantity, formatDate, titleColor, icons} from '../helpers';

const Bill = ({info, setVisibilityModal, setBillSelected}) => {
  const {name, category, quantity, date} = info;

  return (
    <Pressable
      onLongPress={() => {
        setVisibilityModal(true);
        setBillSelected(info);
      }}>
      <View style={styles.container}>
        <View style={styles.data}>
          <Image style={styles.icon} source={icons[category]} />
          <View style={styles.info}>
            <Text style={[styles.category, {color: titleColor[category]}]}>
              {category}
            </Text>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.date}>{formatDate(date)}</Text>
            <Text style={styles.quantity}>{formatQuantity(quantity)}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    marginBottom: 15,
    paddingVertical: 30,
  },
  data: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 65,
    height: 65,
  },
  info: {
    paddingLeft: 15,
    flex: 1,
    flexGrow: 1,
  },
  category: {
    textTransform: 'uppercase',
    fontWeight: '900',
    fontSize: 20,
    color: '#DB2777',
    marginBottom: 10,
  },
  name: {
    fontSize: 17,
  },
  date: {
    fontSize: 17,
    fontWeight: '500',
    color: '#94A3B8',
  },
  quantity: {
    fontSize: 17,
    fontWeight: '900',
    color: '#64748B',
    marginTop: 10,
  },
});

export default Bill;
