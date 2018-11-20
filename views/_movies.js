import React, { Component } from 'react';
import { View, Picker, Button, ActivityIndicator, ScrollView } from 'react-native';
import { ListItem, Header } from 'react-native-elements';
import axios from 'axios';

export class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataA: [],
      dataD: [],
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
        this.getModelos();
      }
    );
  }

  onPickerValueChange2 = (value, index) => {
    this.setState(
      {
        "throttlemode2": value
      },
      () => {
        this.getAnos();
      }
    );
  }

  onPickerValueChange3 = (value, index) => {
    this.setState(
      {
        "throttlemode3": value
      },
      () => {
        this.getDetalhes();
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
          selectedValue={this.state.throttlemode}
          onValueChange={this.onPickerValueChange}
          mode="dropdown"
        >
          <Picker.Item label="Selecione a marca do veiculo" value="" />
          {this.state.dataSource.map((item, key) => (
            <Picker.Item label={item.fipe_name} value={item.id} key={key} />)
          )}
        </Picker>

        <Picker
          selectedValue={this.state.throttlemode2}
          onValueChange={this.onPickerValueChange2}
          mode="dropdown"
        >
          {this.state.data.map((item, i) => (
            <Picker.Item key={i} label={item.name} value={item.id} />
          ))}
        </Picker>

        <Picker
          selectedValue={this.state.throttlemode3}
          onValueChange={this.onPickerValueChange3}
          mode="dropdown"
        >
          {this.state.dataA.map((item, i) => (
            <Picker.Item key={i} label={item.name} value={item.id} />
          ))}
        </Picker>

        <ScrollView>
          {this.state.dataD.map((item, i) => (
            <ListItem key={i} title={item.name} onPress={() => this.onDetalhes(item)} />
          ))}
        </ScrollView>

        {/* <Button title="Buscar" onPress={() => this.getDetalhes()} /> */}

        {/* <ScrollView>
          {this.state.dataD.map((item, i) => (
            <ListItem key={i} title={item.name} onPress={() => this.onDetalhes(item)} />
          ))}
        </ScrollView> */}

      </View>
    );
  }

  getModelos = (clear = true) => {
    var data = this.state.throttlemode;

    if (data == "") {
      alert("Escolha uma marca");
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

  getAnos = (clear = true) => {
    var dataA = this.state.throttlemode2;
    if (dataA == "") {
      alert("Escolha o modelo");
    } else {
      axios
        .get(`http://fipeapi.appspot.com/api/1/carros/veiculo/${this.state.throttlemode}/${this.state.throttlemode2}.json`)
        .then(resp => {
          clear
            ? this.setState({ dataA: resp.data, totalResults: resp.data.totalResults })
            : this.setState({ dataA: [...this.state.data, ...resp.data], totalResults: resp.data.totalResults });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  getDetalhes = (clear = true) => {
    var dataD = this.state.throttlemode3;
    if (dataD == "") {
      alert("Escolha o ano");
    } else {
      axios
        .get(`http://fipeapi.appspot.com/api/1/carros/veiculo/${this.state.throttlemode}/${this.state.throttlemode2}/${this.state.throttlemode3}.json`)
        .then(resp => {
          clear
            ? this.setState({ dataD: [resp.data], totalResults: resp.data.totalResults })
            : this.setState({ dataD: [...this.state.data, ...resp.data], totalResults: resp.data.totalResults });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

}