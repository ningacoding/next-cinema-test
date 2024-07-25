'use client';

import MainLayout from '@/components/main.layout';
import {useHttpMutated} from '@/utils/http';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {FaBagShopping, FaCircleCheck} from 'react-icons/fa6';
import Loader from '@/components/loader';

export default function PurchaseCompleted() {

  const router = useRouter();
  const {id: movieFunctionIdQuery} = router.query as { id: string };
  const movieId = +movieFunctionIdQuery;

  const {
    data: movieResponse,
    trigger: getMovieData,
    isMutating: isMutatingMovie,
  } = useHttpMutated(`/movies/${movieId}`);

  useEffect(() => {
    getMovieData();
  }, [movieId]);

  return (
    <MainLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <div className={'lg:px-8 px-4 pb-12 pt-10 bg-green-500'}>
            <div className={'text-white text-7xl flex mb-4'}>
              <div className={'mx-auto'}>
                <FaCircleCheck/>
              </div>
            </div>
            <div className={'text-white font-bold text-4xl text-center'}>
              Compra exitosa
            </div>
          </div>
          {isMutatingMovie && <Loader/>}
          {!isMutatingMovie && <div className={'lg:px-8 px-4 pb-12 pt-10'}>
            <div className={'text-center font-bold text-2xl'}>
              {movieResponse?.data?.name}
            </div>
            <div className={'pt-8'}>
              <div className={'flex'}>
                <img className={'mx-auto'}
                     src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${movieResponse?.data?.name}`}/>
              </div>

              <div className={'text-center pt-6'}>
                Presenta esta entrada 10 minutos antes de la función <br/>y disfruta tu película.
              </div>
              <div className={'text-center pt-6'}>
                <div className={'text-4xl mb-3'}>
                  🍿
                </div>
                <div className={'text-gray-400'}>
                  No olvides pasar a comprar tus productos favoritos <br/>en la dulcería del establecimiento.
                </div>
              </div>

              <div className={'flex mt-8'}>
                <button
                  type="button"
                  className={'mx-auto inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm bg-orange-500 hover:bg-orange-400'}
                  onClick={() => router.push('/')}
                >
                  <FaBagShopping className={`-ml-0.5 mr-1.5 h-5 w-5 text-white`}
                                 aria-hidden="true"/>
                  <p>SEGUIR COMPRANDO</p>
                </button>
              </div>

            </div>
          </div>}
        </div>
      </div>
    </MainLayout>
  );
};
