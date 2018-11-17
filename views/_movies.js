import React, { Component } from 'react';
import { View, Picker, Button, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import axios from 'axios';

export class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      PickerValue: '',
      isLoading: true
    };
  }

  componentDidMount() {
    return fetch('http://fipeapi.appspot.com/api/1/carros/veiculos/marcas.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onDetalhes = (item) => {
    this.props.navigation.navigate('Detalhes', item);
  };

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    const { navigate } = this.props.navigation;

    return (
      <View>

        <Picker
          selectedValue={this.state.PickerValue}
          onValueChange={(itemValue, indexValue) => this.setState({ PickerValue: itemValue })} >

          <Picker.Item label="Selecione a marca do veiculo" value="" />
          {this.state.dataSource.map((item, key) => (
            <Picker.Item label={item.fipe_name} value={item.id} key={key} />)
          )}
        </Picker>

        <Button title="Buscar" onPress={() => this.getVeiculos()} />

        <ScrollView>
          {this.state.data.map((item, i) => (
            <ListItem key={i} title={item.name} onPress={() => this.onDetalhes(item) } />
          ))}
        </ScrollView>

      </View>
    );
  }

  getVeiculos = (clear = true) => {
    var data = this.state.PickerValue;

    if (data == "") {
      alert("Escolha uma opção de marca");
    } else {

      axios
        .get(`http://fipeapi.appspot.com/api/1/carros/veiculos/${this.state.PickerValue}.json`)
        .then(resp => {
          clear
            ? this.setState({ data: resp.data, totalResults: resp.data.totalResults })
            : this.setState({ data: [...this.state.data, ...resp.data], totalResults: resp.data.totalResults });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
}
