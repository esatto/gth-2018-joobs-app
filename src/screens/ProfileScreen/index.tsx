import React from 'react';
import { View } from 'react-native';

interface ProfileProps {}

export class ProfileScreen extends React.Component<ProfileProps> {
  static navigationOptions = {
    title: 'Profil',
  };

  render() {
    return <View />;
  }
}
