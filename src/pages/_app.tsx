import type {ReactElement, ReactNode} from 'react';
import type {NextPage} from 'next';
import type {AppProps} from 'next/app';
import '../app/globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import {Auditoriums} from '@/app/auditoriums';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

// @ts-ignore
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// @ts-ignore
export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return <Auditoriums>
    {getLayout(<Component {...pageProps} />)}
  </Auditoriums>;
}
