import { StackNavigator } from 'react-navigation';
import { defaultHeaderStyle } from '../config/styles';
import { StatsScreen } from '../screens/StatsScreen';

export default StackNavigator(
  {
    Stats: { screen: StatsScreen },
  },
  defaultHeaderStyle,
);
