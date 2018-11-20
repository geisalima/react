import React, { Component } from 'react';
import { View, Text } from 'react-native';

export class Detalhes extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const params = this.props.navigation.state.params;

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Detalhes</Text>
                <Text>Mês de referência: {params.referencia}</Text>
                <Text>Código Fipe: {params.fipe_codigo}</Text>
                <Text>Marca: {params.marca}</Text>
                <Text>Modelo: {params.name}</Text>
                <Text>Ano Modelo: {params.ano_modelo}</Text>
                <Text>Combustível: {params.combustivel}</Text>
                <Text>Preço Médio: {params.preco}</Text>
            </View>
        );
    }
}