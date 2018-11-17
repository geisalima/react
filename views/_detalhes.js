import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';

export class Detalhes extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const params = this.props.navigation.state.params;

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Detalhes</Text>
                <Text>{params.name}</Text>
                <Text>{params.id}</Text>
            </View>
        );
    }
}