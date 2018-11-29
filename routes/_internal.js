import { createStackNavigator } from 'react-navigation';
import { Veiculos, Detalhes } from '../views';

export const InternalNav = createStackNavigator({
  Veiculos: {
    screen: Veiculos,
    navigationOptions: () => ({
      title: 'Buscar veículos'
    })
  },

  Detalhes: {
    screen: Detalhes,
    navigationOptions: () => ({
      title: 'Detalhes do veículo'
    })
  }

});