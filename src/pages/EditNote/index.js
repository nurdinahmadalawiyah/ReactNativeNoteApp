import {Text, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import React, {Component} from 'react';
import {InputData} from '../../components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import FIREBASE from '../../config/FIREBASE'

export default class EditNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      judul: '',
      catatan: '',
    };
  }

  componentDidMount() {
    FIREBASE.database()
      .ref('Note/'+ this.props.route.params.id)
      .once('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let noteItem = {...data};

        this.setState({
          judul: noteItem.judul,
          catatan: noteItem.catatan,
        });
      });
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  onSubmit = () => {
    if(this.state.judul && this.state.catatan) {

      const noteReferensi = FIREBASE.database().ref('Note/'+ this.props.route.params.id);
      const note = {
        judul: this.state.judul,
        catatan: this.state.catatan,
      }

      noteReferensi
        .update(note)
        .then((data) => {
          Alert.alert('Sukses', 'Catatan Terupdate');
          this.props.navigation.replace('Home');
        })
        .catch((error) => {
          console.log("Error :", error);
        })

    } else {
      Alert.alert('Error', 'Judul dan Catatan harus diisi');
    }

  };

  render() {
    return (
      <View style={styles.pages}>
        <InputData
          label="Judul"
          placeholder="Masukan Judul"
          onChangeText={this.onChangeText}
          value={this.state.judul}
          namaState="judul"
        />

        <InputData
          label="Catatan"
          placeholder="Masukan Catatan"
          isTextArea={true}
          onChangeText={this.onChangeText}
          value={this.state.catatan}
          namaState="catatan"
        />

        <View style={styles.wrapperButton}>
          <TouchableOpacity style={styles.tombol} onPress={() => this.onSubmit()}>
            <FontAwesomeIcon icon={faSave} size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  wrapperButton: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 30,
  },
  tombol: {
    padding: 20,
    backgroundColor: '#4E9C81',
    borderRadius: 15,
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
