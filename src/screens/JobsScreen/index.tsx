import React from 'react';
import { Subscribe } from 'unstated';
import { JobsContainer } from '../../store/JobsContainer';
import { JobsView } from '../../components/JobsView';
import { NavigationScreenProps } from 'react-navigation';
import { JobAd } from '../../types/Job';

interface JobsProps extends NavigationScreenProps<any> {}

export class JobsScreen extends React.Component<JobsProps> {
  static navigationOptions = {
    title: 'Jobb',
  };

  gotoJob = (job: JobAd) => {
    const id = job.annons.annonsid;
    const title = job.annons.yrkesbenamning;
    this.props.navigation.navigate('Job', { id, title });
  };

  render() {
    return (
      <Subscribe to={[JobsContainer]}>
        {(jobs: JobsContainer) => {
          return <JobsView jobs={jobs} onPress={this.gotoJob} />;
        }}
      </Subscribe>
    );
  }
}
