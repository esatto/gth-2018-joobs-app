import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

const Wrapper = styled.View`
  flex: 1;
`;

const BgImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const BgTone = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(110, 181, 68, 0.45);
`;

const StartButton = styled.Button`
  position: absolute;
  left: 50%;
  bottom: 30%;
`;

interface StartProps extends NavigationScreenProps<any> {}

export class StartScreen extends React.Component<StartProps> {
  static navigationOptions = {
    title: 'Home',
  };

  gotoTabs = () => {
    this.props.navigation.navigate('Root');
  };

  render() {
    return (
      <Wrapper>
        <TouchableOpacity onPress={this.gotoTabs}>
          <BgImage
            source={require('../../assets/images/splash.jpg')}
            resizeMode="cover"
          />
          <BgTone />
        </TouchableOpacity>
      </Wrapper>
    );
  }
}
