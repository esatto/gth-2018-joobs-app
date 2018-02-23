import { JobAd } from '../types/Job';

export interface SearchResponse {
  totalAds: number;
  numPages: number;
  ads: JobAd[];
}
