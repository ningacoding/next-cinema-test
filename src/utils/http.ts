import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import fetcher from '@/utils/fetcher';
import {AppConstants} from '@/constants/app.constants';

export default function useHttp(url: string | Function, body?: object) {
  const endpoint = {
    'string': `${AppConstants.APP_URL}${url}`,
    'number': null,
    'bigint': null,
    'boolean': null,
    'symbol': null,
    'undefined': null,
    'object': null,
    'function': url,
  };
  const urlType = typeof url;
  const hasBody = !!body;
  return useSWR(hasBody ? [endpoint[urlType], body] : endpoint[urlType], fetcher);
}

export function useHttpMutated(url: string | Function, body?: object): {
  data: any,
  error: any,
  trigger: any,
  isMutating: boolean,
  reset: any,
} {
  const endpoint = {
    'string': `${AppConstants.APP_URL}${url}`,
    'number': null,
    'bigint': null,
    'boolean': null,
    'symbol': null,
    'undefined': null,
    'object': null,
    'function': url,
  };
  const urlType = typeof url;
  const hasBody = !!body;
  return useSWRMutation(hasBody ? [endpoint[urlType], body] : endpoint[urlType], fetcher);
}
