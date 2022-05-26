import {StyleSheet, Text, TextInput} from 'react-native';
import React from 'react';

const InputData = ({
  placeholder,
  isTextArea,
  onChangeText,
  namaState,
  value,
}) => {
  if (isTextArea) {
    return (
      <>
        <TextInput
          multiline={true}
          numberOfLines={25}
          placeholder={placeholder}
          style={styles.textInputArea}
          value={value}
          onChangeText={text => onChangeText(namaState, text)}
          placeholderTextColor="grey" 
        />
      </>
    );
  }

  return (
    <>
      <TextInput
        fontSize={16}
        placeholder={placeholder}
        style={styles.textInput}
        value={value}
        onChangeText={text => onChangeText(namaState, text)}
        placeholderTextColor="grey" 
      />
    </>
  );
};

export default InputData;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#6BAF92',
    backgroundColor: '#DFEAE2',
    borderRadius: 13,
    fontWeight: 'bold',
    color: '#051F20',
    padding: 10,
    marginBottom: 10,
  },
  textInputArea: {
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#6BAF92',
    backgroundColor: '#DFEAE2',
    borderRadius: 16,
    color: '#051F20',
    padding: 10,
    marginBottom: 10,
  },
});
