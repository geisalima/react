import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export class Detalhes extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const params = this.props.navigation.state.params;

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <View>
                    <Text>Detalhes</Text>
                    <Text style={styles.detalhes}>Mês de referência: {params.referencia}</Text>
                    <Text style={styles.detalhes}>Código Fipe: {params.fipe_codigo}</Text>
                    <Text style={styles.detalhes}>Marca: {params.marca}</Text>
                    <Text style={styles.detalhes}>Modelo: {params.name}</Text>
                    <Text style={styles.detalhes}>Ano Modelo: {params.ano_modelo}</Text>
                    <Text style={styles.detalhes}>Combustível: {params.combustivel}</Text>
                    <Text style={styles.detalhes}>Preço Médio: {params.preco}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    detalhes: {
        fontWeight: 'bold',
        fontSize: 18,
        padding: 10
    },
    red: {
        color: 'red',
    },
});