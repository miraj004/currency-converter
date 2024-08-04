import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput, FlatList} from 'react-native';
import CurrencyCard from '../components/CurrencyCard'; // Adjust the path as necessary
import CurrencyByCountry from './constants'; // Adjust the path as necessary
import Snackbar from 'react-native-snackbar';

const App = (): React.JSX.Element => {
  
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
    null,
  );

  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const handlePress = () => {
    if (selectedCurrency == null || inputValue == '') return;

    if (!(inputValue.length > 0)) {
      Snackbar.show({
        text: 'Please enter a value to change.',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }

    const insertedValue = parseFloat(inputValue);

    if (isNaN(insertedValue)) {
      Snackbar.show({
        text: '"' + inputValue + '" is not a number',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }

    setResult(
      () =>
        selectedCurrency.symbol +
        ' ' +
        (insertedValue * selectedCurrency.value).toFixed(2),
    );
  };

  useEffect(() => {
    handlePress();
  }, [inputValue, selectedCurrency]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          style={styles.inputStyle}
          keyboardType="number-pad"
          placeholder="Amount in AF 🇦🇫"
        />
        {inputValue && <Text style={styles.resultText}>{result}</Text>}
      </View>
      <View style={styles.mainContainer}>
        <FlatList
          numColumns={3}
          data={CurrencyByCountry}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <CurrencyCard
              name={item.name}
              flag={item.flag}
              handlePress={() => {
                setSelectedCurrency(() => item);
              }}
              selected={selectedCurrency?.name === item.name}
            />
          )}
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  inputStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d9d9d9',
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 'auto',
    
  },
  inputContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
  resultText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
