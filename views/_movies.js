import React, { Component } from 'react';
import { View, ScrollView, Picker, Button, Text } from 'react-native';
import { SearchBar, List, ListItem } from 'react-native-elements';
import axios from 'axios';

export class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      term: '',
      PickerValue: ''
    };
  }

  render() {
    return (
      <View>
        <Picker
          selectedValue={this.state.PickerValue}
          style={{ height: 50, width: 300 }}
          onValueChange={(itemValue, indexValue) => this.setState({ PickerValue: itemValue })}
        >
          <Picker.Item label="Selecione o tipo de veiculo" value="" />
          <Picker.Item label="Carros" value="carros" />
          <Picker.Item label="Fiat" value="21" />
        </Picker>

        <Button title="Buscar" onPress={() => this.getFilmes()} />

          {this.state.data.map((item, i) => (
            <ListItem key={i} title={item.name} />
          ))}

        {/* <SearchBar
          lightTheme
          onChangeText={term => this.setState({ term })}
          onClearText={() => this.setState({ term: '' })}
          placeholder="Faça sua busca aqui..."
          autoCapitalize="none"
          autoCorrect={false}
          onEndEditing={() => this.getFilmes()}
        />
        <List containerStyle={{ flex: 1 }}>
          {this.state.data.map((item, i) => (
            <ListItem key={i} title={item.nome} />
          ))}
        </List> */}

        {/* <ScrollView
          pagingEnabled={true}
          onScrollEndDrag={() => {
            this.state.data.length < this.state.totalResults ? this.getFilmes(false) : null;
          }}
        >
          <List containerStyle={{ flex: 1 }}>
            {this.state.data.map((item, i) => (
              <ListItem roundAvatar avatar={{ uri: item.Poster }} key={i} title={item.Title} />
            ))}
          </List>
        </ScrollView> */}
      </View>
    );
  }

  getFilmes = (clear = true) => {
    var data = this.state.PickerValue;

    if (data == "") {
      alert("Escolha uma opção de veiculo");
    } else {

      // let page = this.state.data.length == 0 ? 1 : Math.ceil(this.state.data.length / 10) + 1;

      this.state.PickerValue &&
        this.state.PickerValue.trim().length > 0 &&
        axios
          .get(`http://fipeapi.appspot.com/api/1/carros/veiculos/${this.state.PickerValue}.json`)
          // .get(`https://parallelum.com.br/fipe/api/v1/${this.state.PickerValue}/marcas`)
          // http://fipeapi.appspot.com/api/1/[tipo]/[acao]/[parametros].json
          // http://www.omdbapi.com/?apikey=363b2c11&s=${this.state.term}&page=${page}
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
