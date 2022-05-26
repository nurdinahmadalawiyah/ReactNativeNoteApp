import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';

const CardNote = ({id, noteItem, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('DetailNote', {id: id})}
      onLongPress={() => navigation.navigate('EditNote', {id: id})}>
      <View>
        <Text style={styles.judul}>{noteItem.judul}</Text>
        <Text style={styles.catatan} numberOfLines={4}>{noteItem.catatan}</Text>
      </View>
      <View style={styles.icon}>
        <FontAwesomeIcon icon={faEdit} color={'#4E9C81'} size={20} onPress={() => navigation.navigate('EditNote', {id: id})}/>
      </View>
    </TouchableOpacity>
  );
};

export default CardNote;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#DFEAE2',
    borderRadius: 15,
    marginBottom: 15,
  },
  judul: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: 'grey'
  },
  catatan: {
    fontSize: 14,
    color: 'grey',
  },
  icon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
});
