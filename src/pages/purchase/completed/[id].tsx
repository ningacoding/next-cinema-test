'use client';

import MainLayout from '@/components/main.layout';
import {useHttpMutated} from '@/utils/http';
import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {FaBagShopping, FaCircleCheck} from 'react-icons/fa6';
import Loader from '@/components/loader';
import PurchaseHistoryType from '@/types/purchase.history.type';
import moment from 'moment';

export default function PurchaseCompleted() {

  const router = useRouter();
  const {id: purchaseId} = router.query as { id: string };

  const {
    data: purchaseHistory,
    trigger: getMovieData,
    isMutating: isMutatingMovie,
  }: {
    data: PurchaseHistoryType;
    trigger: () => void;
    isMutating: boolean;
  } = useHttpMutated(`/movies/purchase/${purchaseId}`);

  useEffect(() => {
    getMovieData();
  }, [purchaseId]);

  return (
    <MainLayout>
      <div className="bg-white">
        {!purchaseHistory && <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <Loader/>
        </div>}
        {!!purchaseHistory && <div className="mx-auto max-w-2xl lg:max-w-7xl">
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
          <div className={'lg:px-8 px-4 pb-12 pt-10'}>
            <div className={'text-center font-bold text-2xl'}>
              {purchaseHistory.movieFunction.movie.name}
            </div>
            <div className={'pt-8'}>
              <div className={'flex'}>
                <img className={'mx-auto'}
                     src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${purchaseHistory?.purchaseId}`}/>
              </div>

              <div className={'text-center pt-6'}>
                Presenta esta entrada y disfruta tu película.
                <br/>
                <br/>
                Asiste en la fecha y hora indicada a continuación:<br/>
                <span className={'font-bold'}>{moment(purchaseHistory.scheduledDate, 'DD-MM-YYYY').format('DD MMMM YYYY')}</span> a
                las <span className={'font-bold'}>{purchaseHistory.movieFunction.shownAt}</span>
              </div>

              <div>
                <div className={'text-center pt-6'}>
                  <div className={'flex justify-center flex-col mb-8'}>
                    <div className={'rounded-full w-24 h-24 pt-2 bg-gray-100 mx-auto items-center justify-center'}>
                      <div className={'text-4xl mb-2'}>
                        🎥
                      </div>
                      <div className={'text-gray-700 font-bold'}>
                        {purchaseHistory.auditorium.name}
                      </div>
                    </div>
                  </div>
                  <div className={'text-gray-800 flex justify-center'}>
                    <div className={'mr-6'}>
                      Asientos:
                    </div>
                    {purchaseHistory.seats.map((seat) => <div key={seat.id}
                                                              className={'font-bold mr-4'}>
                      {purchaseHistory.auditorium.name.replace('Sala ', '')}{seat.seatNumber}
                    </div>)}
                  </div>
                </div>
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
          </div>
        </div>}
      </div>
    </MainLayout>
  );
};
