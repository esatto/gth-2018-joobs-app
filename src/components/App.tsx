import React from 'react';
import { StatusBar } from 'react-native';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import { Provider } from 'unstated';

import { store } from '../store';
import JobTab from '../tabs/JobTab';
import { StartScreen } from '../screens/StartScreen';
import ProfileTab from '../tabs/ProfileTab';
import StatsTab from '../tabs/StatsTab';
import CareerTab from '../tabs/CareerTab';
import { colors } from '../config/styles';

const iconMap: { [key: string]: string } = {
  Jobs: 'briefcase',
  Profile: 'user',
  Career: 'arrow-up-right',
  Stats: 'bar-chart',
};

const navigationOptions = ({ navigation, header }: any) => ({
  tabBarIcon: ({ focused, tintColor }: any) => {
    const { routeName } = navigation.state;
    let iconName = iconMap[routeName] || 'star';

    return <Feather name={iconName} size={25} color={tintColor} />;
  },
});

const Navigator = TabNavigator(
  {
    Jobs: { screen: JobTab },
    Profile: { screen: ProfileTab },
    Career: { screen: CareerTab },
    Stats: { screen: StatsTab },
  },
  {
    navigationOptions: navigationOptions as any,
    tabBarOptions: {
      activeTintColor: colors.primary,
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
  },
);

const RootNavigator = StackNavigator(
  {
    Root: Navigator,
    Start: StartScreen,
  },
  {
    headerMode: 'none',
  },
);

const App = () => (
  <Provider inject={store}>
    <StatusBar barStyle="dark-content" />
    <RootNavigator />
  </Provider>
);

export default App;
