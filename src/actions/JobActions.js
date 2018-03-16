import qs from 'qs';
import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';

import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKES
} from '../constants';

const queryParams = {
  publisher: 4201738803816157,
  v: '2',
  format: 'json',
  latlong: 1,
  radius: 10,
  q: 'javascript'
};

const buildUrl = (zip) => {
  const query = qs.stringify({ ...queryParams, l: zip });
  return `https://api.indeed.com/ads/apisearch?${query}`;
};

export const fetchJobs = (region, callback) => async dispatch => {
  try {
    const zip = await reverseGeocode(region);
    const url = buildUrl(zip);
    const { data } = await axios.get(url);

    dispatch({ type: FETCH_JOBS, payload: data });

    callback(null);

  } catch (err) {
    console.log(err);
  }
};

export const likeJob = (job) => {
  return { type: LIKE_JOB, payload: job };
};


export const clearLikes = () => {
  return { type: CLEAR_LIKES };
};
