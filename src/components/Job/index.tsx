import React from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { JobAd } from '../../types/Job';
import { colors } from '../../config/styles';
import { formatDistanceStrict } from 'date-fns/esm';

const margin = 15;

const JobWrapper = styled.View``;

const JobInner = styled.View`
  padding-top: ${margin};
  padding-bottom: ${margin};
  display: flex;
  flex-direction: row;
`;

const Title = styled.Text`
  font-size: 16;
  font-weight: bold;
  font-family: 'Avenir';
`;

const BorderBottom = styled.View`
  height: 1;
  width: 100%;
  background-color: #aaa;
  margin-top: ${margin};
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Content = styled.View`
  padding: 0 10px;
  flex: 1;
`;

const Rating = styled.Text`
  width: 50;
  font-size: 20;
  color: ${colors.primary};
`;

export interface JobProps {
  ad: JobAd;
  onPress: () => void;
}

export class Job extends React.Component<JobProps> {
  render() {
    const { ad, onPress } = this.props;

    const { arbetsplatsnamn } = ad.arbetsplats;

    const ansokningsDag = ad.ansokan.sista_ansokningsdag || '';

    const timeLeft = formatDistanceStrict(ansokningsDag, new Date());

    const rand = Math.floor(Math.random() * 100);

    return (
      <JobWrapper>
        <TouchableOpacity onPress={onPress}>
          <JobInner>
            <Content>
              <Title>{ad.annons.annonsrubrik}</Title>
              <Text>
                {arbetsplatsnamn} {timeLeft} kvar
              </Text>
            </Content>
            <Rating>
              <Text>{rand}%</Text>
            </Rating>
          </JobInner>
        </TouchableOpacity>
        <BorderBottom />
      </JobWrapper>
    );
  }
}
