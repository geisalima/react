import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
// import { createStackNavigator, createAppContainer } from 'react-navigation';

export class Slider extends Component {
    render() {
        return (

            <View style={styles.wrapper}>
                <Swiper  showsButtons>
                    <View style={styles.slide1}>
                        <Text style={styles.text}>Preço Médio de Veículos</Text>
                    </View>
                    <View style={styles.slide2}>
                        <Text style={styles.text}>A Tabela Fipe expressa preços médios de veículos no mercado nacional, servindo apenas como um parâmetro para negociações ou avaliações. </Text>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>O ano do veículo refere-se ao ano do modelo e não são considerados veículos para uso profissional ou especial.</Text>
                    </View>
                    <View style={styles.slide4}>
                        <Text style={styles.text}>Os valores são expressos em R$ (reais) do mês/ano de referência.</Text>
                    </View>
                </Swiper>

                <View>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Veiculos')} >
                        <Text style={styles.buttonText}>Consultar Veículos</Text>
                    </TouchableOpacity>
                </View>
            </View>            
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
        padding: 40
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
        padding: 40
    },
    slide4: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#becdda',
        padding: 40
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#348dc1',
        padding: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18
    }
});