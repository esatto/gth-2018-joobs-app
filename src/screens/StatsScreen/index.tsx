import React from 'react';
import { View } from 'react-native';

interface StatsProps {}

export class StatsScreen extends React.Component<StatsProps> {
  static navigationOptions = {
    title: 'Trender',
  };

  render() {
    return <View />;
  }
}
