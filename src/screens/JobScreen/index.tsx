import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { NavigationScreenProps } from 'react-navigation';
import { Subscribe } from 'unstated';
import { JobsContainer } from '../../store/JobsContainer';

const Title = styled.Text`
  font-size: 25;
  padding-left: 10;
  padding-top: 20;
  padding-bottom: 10;
`;

const Body = styled.Text`
  font-size: 15;
  padding-left: 10;
  padding-right: 10;
`;

interface JobParams {
  id: string;
  title: string;
}

interface JobProps extends NavigationScreenProps<JobParams> {}

export class JobScreen extends React.Component<JobProps> {
  static navigationOptions = ({ navigation }: JobProps) => {
    const { params } = navigation.state;

    const title = params ? params.title : 'Jobb';

    return {
      title,
    };
  };

  render() {
    const { id } = this.props.navigation.state.params;

    return (
      <Subscribe to={[JobsContainer]}>
        {(jobs: JobsContainer) => {
          const job = jobs.state.byId[id];

          if (!job) return <View />;

          return (
            <ScrollView>
              <Title>{job.annons.annonsrubrik}</Title>
              <Body>{job.annons.annonstext}</Body>
            </ScrollView>
          );
        }}
      </Subscribe>
    );
  }
}
