import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, Text, View } from 'react-native';
import { WebBrowser } from 'expo';
import { dimensions } from '../../config/styles';
import { JobAd } from '../../types/Job';
import { ApplyButton } from '../ApplyButton';
import { Job } from '../Job';
import { format } from 'date-fns/esm';

const Title = styled.Text`
  font-size: 20;
  padding-bottom: 10;
`;

const Content = styled.View`
  padding-left: ${dimensions.margin};
  padding-right: ${dimensions.margin};
`;

const ApplyDate = styled.Text`
  text-align: center;
  color: #666;
  margin-top: 10;
  margin-bottom: 20;
`;

const ApplyDateDate = styled.Text`
  font-weight: bold;
`;

const Body = styled.Text`
  font-size: 15;
  color: #666;
`;

interface JobViewProps {
  job: JobAd;
}

export class JobView extends React.PureComponent<JobViewProps> {
  applyForJob = async () => {
    const { job } = this.props;

    console.log('Will open', job.ansokan.webbplats);

    if (!job.ansokan.webbplats) return;

    console.log('Applying for job');

    const browser = await WebBrowser.openBrowserAsync(job.ansokan.webbplats);

    console.log('applied for job', browser);
  };
  render() {
    const { job } = this.props;

    const applyDate = job.ansokan.sista_ansokningsdag;

    const formattedApplyDate = applyDate
      ? format(applyDate, 'D MMMM YYYY')
      : null;

    return (
      <ScrollView style={{ backgroundColor: '#ffffff' }}>
        <Job ad={job} disableLine={true} margin={20} />
        <Content>
          <ApplyButton title="Sök jobbet" onPress={this.applyForJob} />
          {formattedApplyDate ? (
            <ApplyDate>
              Sista ansökningsdag är{' '}
              <ApplyDateDate>{formattedApplyDate}</ApplyDateDate>
            </ApplyDate>
          ) : (
            <View style={{ height: 20 }} />
          )}
          <Title>{job.annons.annonsrubrik}</Title>
          <Body>{job.annons.annonstext}</Body>
        </Content>
      </ScrollView>
    );
  }
}
