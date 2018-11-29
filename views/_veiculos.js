import React, { Component } from 'react';
import { View, Picker, ActivityIndicator, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import axios from 'axios';

export class Veiculos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataA: [],
      dataD: [],
      carregando: true,
      marca: '',
      modelo: '',
      ano: '',
    };
  }

  onPickerValueChange = (value, index) => {
    this.setState(
      {
        "marca": value
      },
      () => {
        this.getModelos();
      }
    );
  }

  onPickerValueChange2 = (value, index) => {
    this.setState(
      {
        "modelo": value
      },
      () => {
        this.getAnos();
      }
    );
  }

  onPickerValueChange3 = (value, index) => {
    this.setState(
      {
        "ano": value
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
          carregando: false,
          dadosIni: responseJson
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

    if (this.state.carregando) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.state.marca}
          onValueChange={this.onPickerValueChange}
          mode="dropdown"
        >
          <Picker.Item label="Selecione a marca do veiculo" value="" />
          {this.state.dadosIni.map((item, key) => (
            <Picker.Item label={item.fipe_name} value={item.id} key={key} />)
          )}
        </Picker>

        <Picker
          selectedValue={this.state.modelo}
          onValueChange={this.onPickerValueChange2}
          mode="dropdown"
        >
          <Picker.Item label="Selecione o modelo" value="" />
          {this.state.data.map((item, i) => (
            <Picker.Item key={i} label={item.name} value={item.id} />
          ))}
        </Picker>

        <Picker
          selectedValue={this.state.ano}
          onValueChange={this.onPickerValueChange3}
          mode="dropdown"
        >
          <Picker.Item label="Selecione o ano" value="" />
          {this.state.dataA.map((item, i) => (
            <Picker.Item key={i} label={item.name} value={item.id} />
          ))}
        </Picker>

        {this.state.dataD.map((item, i) => (
          <TouchableOpacity style={styles.button} key={i} onPress={() => this.onDetalhes(item)} >
            <Text style={styles.buttonText}>Ver Detalhes</Text>
          </TouchableOpacity>
        ))}

      </View>
    );
  }

  getModelos = (clear = true) => {
    var vl = this.state.marca;
    if (vl != "") {
      axios
        .get(`http://fipeapi.appspot.com/api/1/carros/veiculos/${this.state.marca}.json`)
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
    var vl = this.state.modelo;
    if (vl != "") {
      axios
        .get(`http://fipeapi.appspot.com/api/1/carros/veiculo/${this.state.marca}/${this.state.modelo}.json`)
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
    var vl = this.state.ano;
    if (vl != "") {
      axios
        .get(`http://fipeapi.appspot.com/api/1/carros/veiculo/${this.state.marca}/${this.state.modelo}/${this.state.ano}.json`)
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#348dc1',
    padding: 10,
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  }
})