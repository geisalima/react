import { createStackNavigator } from 'react-navigation';
import { Slider, Veiculos, Detalhes } from '../views';

export const InternalNav = createStackNavigator({
  Slider: {
    screen: Slider,
    navigationOptions: () => ({
      title: 'Home'
    })
  },
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