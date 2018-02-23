import { Container } from 'unstated';
import { JobAd } from '../types/Job';
import { getJobsByCounty } from '../api/jobs';

export interface JobsState {
  byId: { [key: string]: JobAd };
  ids: string[];
  loading: boolean;
}

const convertJob = (jobs: JobAd[]) => {
  const obj: { [id: string]: JobAd } = {};

  const min = 50;
  const max = 97;

  for (const job of jobs) {
    obj[job.annons.annonsid] = {
      ...job,
      extra: {
        percentage: Math.floor(Math.random() * (max - min + 1) + min),
      },
    };
  }

  return obj;
};

export class JobsContainer extends Container<JobsState> {
  state: JobsState = {
    byId: {},
    ids: [],
    loading: false,
  };

  loadJobsByCounty = async (id: number) => {
    this.setState({ loading: true });
    const start = Date.now();
    let jobs = await getJobsByCounty(id);
    console.log('Took', (Date.now() - start) / 1000);

    const byId = convertJob(jobs.ads);
    const ids = Object.keys(byId);

    this.setState({
      byId,
      ids,
      loading: false,
    });
  };
}
