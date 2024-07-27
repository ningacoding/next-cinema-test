'use client';

import MainLayout from '@/components/main.layout';
import {useContext, useEffect, useRef} from 'react';
import Modal from '@/components/modal';
import {useRouter} from 'next/navigation';
import {useHttpMutated} from '@/utils/http';
import {AuthContext} from '@/app/auditoriums';
import MovieType from '@/types/movie.type';
import MovieCover from '@/components/movie.cover';

export default function Page() {

  const router = useRouter();
  const modalRef = useRef<any>(null);
  const {hasLoggedIn} = useContext(AuthContext);
  const {data: movies, trigger: getMovies, reset, isMutating} = useHttpMutated('/movies');

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <MainLayout>
      <div className="bg-white">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl py-8 sm:py-8 lg:py-8">

            <Modal title={'Crea una cuenta'}
                   message={'Registrate o inicia una sesión para empezar a agregar productos a tu inventario.'}
                   auxButton={{
                     label: 'Inicia sesión',
                     onClick: () => router.push('/login'),
                   }}
                   okButton={{
                     label: 'Regístrate',
                     onClick: () => router.push('/signin'),
                   }}
                   ref={modalRef}/>

            {!hasLoggedIn && <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Inicia sesión para poder reservar un lugar.{' '}
                <a className="font-semibold text-indigo-600 cursor-pointer"
                   onClick={() => modalRef.current?.show()}>
                  <span className="absolute inset-0"
                        aria-hidden="true"/>
                  Iniciar sesión <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>}

            {movies?.map((movie: MovieType) => <MovieCover key={movie.id}
                                                           id={movie.id}
                                                           name={movie.name}
                                                           onClick={(id: number) => hasLoggedIn ? router.push(`/purchase/${id}`) : modalRef.current?.show()}
                                                           durationInMinutes={movie.durationInMinutes}
                                                           movieFunctions={movie.movieFunctions}
                                                           coverImageUrl={movie.coverImageUrl}/>)}

            <div className="flex items-center justify-center gap-x-6">
              <a
                onClick={() => hasLoggedIn ? router.push('/purchase/1') : modalRef.current?.show()}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              >
                COMPRAR BOLETOS
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </MainLayout>
  );
}
