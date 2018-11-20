import { createStackNavigator } from 'react-navigation';
import { Movies, Detalhes } from '../views';
import { Header } from 'react-native-elements';

export const InternalNav = createStackNavigator({
  Movies: {
    screen: Movies,
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