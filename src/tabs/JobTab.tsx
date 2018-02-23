import { StackNavigator } from 'react-navigation';
import { JobsScreen } from '../screens/JobsScreen';
import { JobScreen } from '../screens/JobScreen';
import { defaultHeaderStyle } from '../config/styles';

export default StackNavigator(
  {
    Jobs: { screen: JobsScreen },
    Job: { screen: JobScreen },
  },
  defaultHeaderStyle,
);
