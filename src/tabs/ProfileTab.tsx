import { StackNavigator } from 'react-navigation';
import { defaultHeaderStyle } from '../config/styles';
import { ProfileScreen } from '../screens/ProfileScreen';

export default StackNavigator(
  {
    Profile: { screen: ProfileScreen },
  },
  defaultHeaderStyle,
);
