import { Text, StyleSheet, ScrollView, View, TouchableOpacity, Alert } from 'react-native'
import React, { Component } from 'react'
import FIREBASE from '../../config/FIREBASE'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

export default class DetailNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: {},
    };
  }
  
  componentDidMount() {
    FIREBASE.database()
      .ref('Note/'+ this.props.route.params.id)
      .once('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let noteItem = {...data};

        this.setState({
          note: noteItem,
        });
      });
  }

  removeData = () => {
    Alert.alert(
      "Hapus Catatan",
      "Anda yakin ingin menghapus catatan ini?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          FIREBASE.database()
            .ref('Note/'+ this.props.route.params.id)
            .remove();
          this.componentDidUpdate();
          Alert.alert('Catatan berhasil dihapus');
          this.props.navigation.navigate('Home');

        } }
      ]
    );
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
    const {note} = this.state;
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView style={styles.pages}>
        <Text style={styles.textJudul}>{note.judul}</Text>
        <Text style={styles.textCatatan}>{note.catatan}</Text>
      </ScrollView>
      <View style={styles.wrapperButton}>
          <TouchableOpacity
            style={styles.btnHapus}
            onPress={() => this.removeData(this.props.route.params.id)}>
            <FontAwesomeIcon icon={faTrash} size={20} color={'#FF6961'} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pages: {
    margin: 10,
    padding: 20,
    backgroundColor: '#DFEAE2',
    borderRadius: 15,
  },
  textJudul: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'grey'
  },
  textCatatan: {
    fontSize: 14,
    color: 'grey',
  },
  wrapperButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  btnHapus: {
    padding: 20,
    backgroundColor: '#FEE3E2',
    borderRadius: 16,
    right: 0,
    bottom: 0,
    margin: 20,
    position: 'absolute',
  },
})