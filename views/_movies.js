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
      isLoading: true,
      throttlemode: '',
      throttlemode2: '',
      throttlemode3: '',
    };
  }

  onPickerValueChange = (value, index) => {
    this.setState(
      {
        "throttlemode": value
      },
      () => {
        // here is our callback that will be fired after state change.
        // Alert.alert();
        this.getVeiculos();
      }
    );
  }

  onPickerValueChange2 = (value, index) => {
    this.setState(
      {
        "throttlemode2": value
      },
      () => {
        // here is our callback that will be fired after state change.
        // Alert.alert();
        this.getModelos();
      }
    );
  }

  onPickerValueChange3 = (value, index) => {
    this.setState(
      {
        "throttlemode3": value
      },
      () => {
        // here is our callback that will be fired after state change.
        // Alert.alert();
        this.getAnos();
      }
    );
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

    return (
      <View>

        <Picker
          // selectedValue={this.state.PickerValue}
          // onValueChange={(itemValue, indexValue) => this.setState({ PickerValue: itemValue })} >
          selectedValue={this.state.throttlemode}
          onValueChange={this.onPickerValueChange}
        >

          <Picker.Item label="Selecione a marca do veiculo" value="" />
          {this.state.dataSource.map((item, key) => (
            <Picker.Item label={item.fipe_name} value={item.id} key={key} />)
          )}
        </Picker>

        <Picker
          selectedValue={this.state.throttlemode2}
          onValueChange={this.onPickerValueChange2}
        >
          {this.state.data.map((item, i) => (
            <Picker.Item key={i} label={item.name} value={item.id} />
          ))}
        </Picker>
        
        <Picker
          selectedValue={this.state.throttlemode3}
          onValueChange={this.onPickerValueChange3}
        >
          {this.state.data.map((item, i) => (
            <Picker.Item key={i} label={item.name} value={item.id} />
          ))}
        </Picker>

        {/* <Button title="Buscar" onPress={() => this.getVeiculos()} /> */}

        {/* <ScrollView>
          {this.state.data.map((item, i) => (
            <ListItem key={i} title={item.name} onPress={() => this.onDetalhes(item)} />
          ))}
        </ScrollView> */}

      </View>
    );
  }

  getVeiculos = (clear = true) => {
    var data = this.state.throttlemode;

    if (data == "") {
      alert("Escolha uma opção de marca");
    } else {

      axios
        .get(`http://fipeapi.appspot.com/api/1/carros/veiculos/${this.state.throttlemode}.json`)
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

  getModelos = (clear = true) => {
    var data = this.state.throttlemode2;
    if (data == "") {
      alert("Escolha uma opção de marca");
    } else {

      axios
        .get(`http://fipeapi.appspot.com/api/1/carros/veiculo/${this.state.throttlemode}/${this.state.throttlemode2}.json`)
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

  getAnos = (clear = true) => {
    var data = this.state.throttlemode3;
    if (data == "") {
      alert("Escolha uma opção de marca");
    } else {

      axios
        .get(`http://fipeapi.appspot.com/api/1/carros/veiculo/${this.state.throttlemode}/${this.state.throttlemode2}/${this.state.throttlemode3}.json`)
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