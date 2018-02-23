import { StackNavigatorConfig } from 'react-navigation';

export const colors = {
  primary: '#6EB544',
  background1: '#fff',
  background2: '#ff0000',
  background3: '#000',
  foreground: '#fff',
  foreground2: '#999999',
  inactive: '#999999',
};

export const defaultHeaderStyle: StackNavigatorConfig = {
  navigationOptions: {
    headerTintColor: colors.foreground,
    headerStyle: {
      backgroundColor: colors.primary,
    },
  },
};

export const dimensions = {
  margin: 20,
};
