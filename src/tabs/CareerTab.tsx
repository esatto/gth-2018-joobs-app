import { StackNavigator } from 'react-navigation';
import { defaultHeaderStyle } from '../config/styles';
import { CareerScreen } from '../screens/CareerScreen';

export default StackNavigator(
  {
    Career: { screen: CareerScreen },
  },
  defaultHeaderStyle,
);
