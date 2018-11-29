import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export class Detalhes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let params = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.titulo}>Detalhes</Text>
                    <Text style={styles.detalhes}>Mês Referência: {params.referencia}</Text>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 20
    },
    detalhes: {
        fontSize: 18,
        padding: 10
    },
    titulo: {
        padding: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
});