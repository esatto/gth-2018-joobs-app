import { SearchResponse } from '../types/SearchResponse';

export const getJobsByCounty = async (id: number): Promise<SearchResponse> => {
  const res = await fetch(
    `https://lag18.goodtechhack.se/api/jobs/searchAds?countyId=${id}`,
  );
  const data = await res.json();

  return data;
};
