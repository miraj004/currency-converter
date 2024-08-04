import {View, Text, StyleSheet, Pressable} from 'react-native';

import {PropsWithChildren} from 'react';

type CurrencyCardProp = PropsWithChildren<{
  name: String;
  flag: String;
  selected: boolean;
  handlePress: () => void;
}>;

const CurrencyCard = (props: CurrencyCardProp): JSX.Element => {
  return (
    <Pressable onPress={props.handlePress} 
    style={[styles.buttonStyle, props.selected && styles.selected]}>
      <Text style={styles.h1}>{props.flag}</Text>
      <Text style={styles.h2}>{props.name}</Text>
    </Pressable>
  );
};

export default CurrencyCard;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#f1f1f1',
    borderWidth: 2,
    borderColor: '#e9e9e9',
    width: '30%',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    
    
  },
  selected: {
    borderWidth: 2,
    borderColor: '#FF8225'
  },
  h1: {
    fontSize: 20,
  },
  h2: {
    fontWeight: 'bold',
  },
});
