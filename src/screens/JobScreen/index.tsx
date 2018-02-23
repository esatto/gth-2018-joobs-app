import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Subscribe } from 'unstated';
import { JobsContainer } from '../../store/JobsContainer';
import { JobView } from '../../components/JobView';

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

          if (!job) return null;

          return <JobView job={job} />;
        }}
      </Subscribe>
    );
  }
}
