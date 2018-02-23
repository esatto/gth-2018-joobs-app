import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../config/styles';

const Wrapper = styled.View`
  background-color: ${colors.primary};
  padding-top: 15;
  padding-bottom: 15;
  border-radius: 5;
`;

const Label = styled.Text`
  color: #fff;
  font-size: 21;
  font-weight: 900;
  text-align: center;
`;

interface ApplyButtonProps {
  title: string;
  onPress: () => void;
}

export class ApplyButton extends React.PureComponent<ApplyButtonProps> {
  render() {
    const { title, onPress } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <Wrapper>
          <Label>{title.toUpperCase()}</Label>
        </Wrapper>
      </TouchableOpacity>
    );
  }
}
