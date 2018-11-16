import { createStackNavigator } from 'react-navigation';
import { Movies, Detalhes } from '../views';

export const InternalNav = createStackNavigator({
  Movies: {
    screen: Movies,
    navigationOptions: () => ({
      title: 'Busca veículos'
    })
  },
}
);
