import axios from 'axios';
import useSWR from 'swr';
import { Country  } from './types';


const fetcher = (url: string) => axios.get(url).then(res => res.data);


const RESULT_LIMIT = 100;
export const apiUrl = 'https://randomuser.me/api/';

export const useGetCountries =  () => useSWR<Country, []>(`${apiUrl}?results=${RESULT_LIMIT}`, fetcher);

