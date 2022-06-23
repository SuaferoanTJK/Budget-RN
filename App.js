import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Alert,
  Pressable,
  Image,
  ScrollView,
  Modal,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './src/components/Header';
import NewBudget from './src/components/NewBudget';
import ControlBudget from './src/components/ControlBudget';
import FormBill from './src/components/FormBill';
import ListBill from './src/components/ListBill';
import Filter from './src/components/Filter';
import {generateID} from './src/helpers';

const App = () => {
  const budgetManagerIS = {
    available: 0,
    spent: 0,
  };
  const filterDataIS = {
    category: '',
    billsFiltered: [],
  };

  const [budget, setBudget] = useState(0);
  const [isBudgetValid, setIsBudgetValid] = useState(false);
  const [budgetManager, setBudgetManager] = useState(budgetManagerIS);
  const [bills, setBills] = useState([]);
  const [visibilityModal, setVisibilityModal] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [billSelected, setBillSelected] = useState({});
  const [filterData, setFilterData] = useState(filterDataIS);

  useEffect(() => {
    const obtainBudgetStorage = async () => {
      try {
        const budgetStorage =
          (await AsyncStorage.getItem('budgetPlanner')) ?? 0;
        if (budgetStorage > 0) {
          setBudget(budgetStorage);
          setIsBudgetValid(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtainBudgetStorage();
  }, []);

  useEffect(() => {
    if (isBudgetValid) {
      const saveBudgetStorage = async () => {
        try {
          await AsyncStorage.setItem('budgetPlanner', budget);
        } catch (error) {
          console.log(error);
        }
      };
      saveBudgetStorage();
    }
  }, [isBudgetValid]);

  useEffect(() => {
    const obtainBillsStorage = async () => {
      try {
        const billsStorage = await AsyncStorage.getItem('billsPlanner');
        setBills(billsStorage ? JSON.parse(billsStorage) : []);
      } catch (error) {
        console.log(error);
      }
    };
    obtainBillsStorage();
  }, []);

  useEffect(() => {
    const saveBillsStorage = async () => {
      try {
        await AsyncStorage.setItem('billsPlanner', JSON.stringify(bills));
      } catch (error) {
        console.log(error);
      }
    };
    saveBillsStorage();
  }, [bills]);

  const handleNewBudget = budgetInput => {
    if (Number(budgetInput) > 0) {
      setIsBudgetValid(true);
    } else {
      Alert.alert('Error', 'Budget not approved, it must be greater than 0');
    }
  };

  const handleBills = (bill, amount) => {
    if (Object.values(bill).includes('')) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (bill.quantity > amount) {
      Alert.alert('Error', 'There is not enough budget');
      return;
    }
    if (billSelected.id) {
      const billsUpdated = bills.map(billMap =>
        billMap.id === bill.id ? bill : billMap,
      );
      setBills(billsUpdated);
    } else {
      bill.id = generateID();
      bill.date = Date.now();
      setBills([...bills, bill]);
    }
    setVisibilityModal(false);
    setBillSelected({});
  };

  const handleDelete = id => {
    Alert.alert(
      'Warning',
      "Are you sure you want to delete this expense? Once deleted it can't be recover",
      [
        {text: 'Cancel'},
        {
          text: 'Yes, Delete',
          onPress: () => {
            const billsUpdated = bills.filter(
              billFilter => billFilter.id !== id,
            );
            setBills(billsUpdated);
            setVisibilityModal(false);
            setBillSelected({});
          },
        },
      ],
    );
  };

  const resetApp = () => {
    Alert.alert(
      'Reset app?',
      'Are you sure you want to reset the app? There is no possibility to recover the data',
      [
        {text: 'Cancel'},
        {
          text: 'Yes, Reset',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setBudget(0);
              setIsBudgetValid(false);
              setBills([]);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Header />
          {isBudgetValid ? (
            <>
              <ControlBudget
                budget={budget}
                budgetManager={budgetManager}
                setBudgetManager={setBudgetManager}
                bills={bills}
                setBtnDisabled={setBtnDisabled}
                resetApp={resetApp}
              />
              {bills.length > 1 && (
                <Filter
                  bills={bills}
                  filterData={filterData}
                  setFilterData={setFilterData}
                />
              )}
              <ListBill
                bills={bills}
                setVisibilityModal={setVisibilityModal}
                setBillSelected={setBillSelected}
                filterData={filterData}
              />
            </>
          ) : (
            <NewBudget
              budget={budget}
              setBudget={setBudget}
              handleNewBudget={handleNewBudget}
            />
          )}
        </View>
      </ScrollView>
      {isBudgetValid && (
        <Pressable
          style={styles.imageBtn}
          onPress={() => {
            if (btnDisabled) {
              Alert.alert('Error', 'There is no available budget');
              return;
            }
            setVisibilityModal(true);
          }}>
          <Image
            style={styles.image}
            source={require('./src/img/newExpense.png')}
          />
        </Pressable>
      )}
      {visibilityModal && (
        <Modal animationType="slide" visible={visibilityModal}>
          <FormBill
            setVisibilityModal={setVisibilityModal}
            handleBills={handleBills}
            budget={budgetManager}
            billSelected={billSelected}
            setBillSelected={setBillSelected}
            handleDelete={handleDelete}
          />
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  imageBtn: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 5,
    right: 15,
  },
  image: {
    width: 60,
    height: 60,
  },
});

export default App;
