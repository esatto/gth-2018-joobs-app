import React from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { JobAd } from '../../types/Job';
import { colors, dimensions } from '../../config/styles';
import { formatDistanceStrict } from 'date-fns/esm';

const { width } = Dimensions.get('screen');

const JobWrapper = styled.View`
  padding-top: ${dimensions.margin};
  padding-bottom: ${dimensions.margin};
  display: flex;
  flex-direction: row;
`;

const Content = styled.View`
  padding: 0 ${dimensions.margin}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: ${width};
`;

const Title = styled.Text`
  font-size: 18;
  font-weight: 900;
  margin-bottom: 8;
  flex: 1;
  color: #444444;
`;

const Rating = styled.Text`
  width: 50;
  font-size: 21;
  font-weight: 400;
  color: ${colors.primary};
  text-align: right;
`;

const Metadata = styled.View`
  padding: 0 ${dimensions.margin}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const WorkplaceName = styled.Text`
  margin-right: ${dimensions.margin};
  flex: 1;
  color: ${colors.primary};
  font-weight: bold;
`;

const WorkplaceInfo = styled.Text`
  color: ${colors.foreground2};
  text-align: right;
  font-weight: 400;
`;

const BorderBottom = styled.View`
  height: 1;
  width: 100%;
  background-color: #cccccc;
  margin-top: ${dimensions.margin};
  position: absolute;
  bottom: 0;
  right: 0;
`;

export interface JobProps {
  ad: JobAd;
  onPress?: () => void;
  disableLine?: boolean;
  margin?: number;
}

export class Job extends React.Component<JobProps> {
  render() {
    const { ad, onPress, disableLine } = this.props;

    const { arbetsplatsnamn } = ad.arbetsplats;

    const ansokningsDag = ad.ansokan.sista_ansokningsdag;

    const timeLeft =
      ansokningsDag != null
        ? formatDistanceStrict(ansokningsDag, new Date())
        : null;

    const TouchWrapper = onPress ? TouchableOpacity : View;

    return (
      <JobWrapper>
        <TouchWrapper onPress={onPress}>
          <Content>
            <Title>{ad.annons.yrkesbenamning}</Title>
            <Rating>
              <Text>{ad.extra.percentage}%</Text>
            </Rating>
          </Content>
          <Metadata>
            <WorkplaceName>{arbetsplatsnamn}</WorkplaceName>
            <WorkplaceInfo>
              {ad.villkor.arbetstid}, {ad.annons.kommunnamn}
            </WorkplaceInfo>
          </Metadata>
        </TouchWrapper>
        {!disableLine && <BorderBottom />}
      </JobWrapper>
    );
  }
}
