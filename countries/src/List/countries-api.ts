import axios from 'axios';
import useSWR from 'swr';
import { Country  } from './types';

// fetcher function requires by swr using axios
const fetcher = (url: string) => axios.get(url).then(res => res.data);

// incase we want to change our resutls we can make this a param
const RESULT_LIMIT = 100;

// url 
export const apiUrl = 'https://randomuser.me/api/';
// hook for fetching data usinmg swr, types with out country typ
export const useGetCountries =  () => useSWR<Country, []>(`${apiUrl}?results=${RESULT_LIMIT}`, fetcher);

