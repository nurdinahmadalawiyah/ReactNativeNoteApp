import {Text, StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faNoteSticky, faFile} from '@fortawesome/free-solid-svg-icons';
import FIREBASE from '../../config/FIREBASE'
import { CardNote } from '../../components';

export default class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       notes: {},
       notesKey: [],
    }
  }

  componentDidMount() {
    FIREBASE.database()
    .ref("Note")
    .once('value', (querySnapshot) => {

      let data = querySnapshot.val() ? querySnapshot.val() : {};
      let noteItem = {...data};

      this.setState({
        notes: noteItem,
        notesKey: Object.keys(noteItem)
      })

    })
  }

  componentDidUpdate() {
    FIREBASE.database()
    .ref("Note")
    .once('value', (querySnapshot) => {

      let data = querySnapshot.val() ? querySnapshot.val() : {};
      let noteItem = {...data};

      this.setState({
        notes: noteItem,
        notesKey: Object.keys(noteItem)
      })

    })
  }

  render() {
    const { notes, notesKey } = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <FontAwesomeIcon icon={faNoteSticky} size={30} color={'#4E9C81'} />
          <Text style={styles.title}> Your Note</Text>
        </View>
        
        <View style={styles.label}>
          <Text style={styles.textLabel}>List Notes</Text>
        </View>

        <ScrollView style={styles.listNote}>
          {notesKey.length > 0 ? (
            notesKey.map((key) => (
              <CardNote key={key} noteItem={notes[key]} id={key} {...this.props}/>
            ))
          ) : (
            <View style={styles.wraperNoteEmpty}>
              <FontAwesomeIcon icon={faFile} size={200} color={'#8DC3A7'} />
              <Text style={styles.textNoteEmpty}>Catatan Kosong</Text>
            </View>
          )}
        </ScrollView>


        <View style={styles.wrapperButton}>
          <TouchableOpacity
            style={styles.btnTambah}
            onPress={() => this.props.navigation.navigate('TambahNote')}>
            <FontAwesomeIcon icon={faPlus} size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey'
  },
  label: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  textLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'grey'
  },
  listNote: {
    paddingHorizontal: 30,
    marginTop: 20
  },
  wraperNoteEmpty: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNoteEmpty: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    color: 'grey'
  },
  wrapperButton: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 30,
  },
  btnTambah: {
    padding: 20,
    backgroundColor: '#4E9C81',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
