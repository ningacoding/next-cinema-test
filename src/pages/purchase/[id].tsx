'use client';

import MainLayout from '@/components/main.layout';
import useHttp, {useHttpMutated} from '@/utils/http';
import FlatList from 'flatlist-react';
import SeatItem from '@/components/list/seatItem';
import Loader from '@/components/loader';
import SlideOver from '@/components/page/slide.over';
import {useRouter} from 'next/router';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {AuditoriumsContext, AuthContext} from '@/app/auditoriums';
import SlideOverChooser from '@/components/ui/slideOverChooser';
import SeatType from '@/types/seat.type';
import Header from '@/components/page/header';
import AuditoriumType from '@/types/auditorium.type';
import Datepicker from '@/components/ui/datepicker';
import moment from 'moment';
import {FaBagShopping, FaRegClock} from 'react-icons/fa6';
import Modal from '@/components/modal';
import {FaRegTrashAlt} from 'react-icons/fa';
import SlideOverChooserItem from '@/components/list/slideOverChooserItem';
import {BiCameraMovie} from 'react-icons/bi';
import MovieFunctionType from '@/types/movie.function.type';
import {TbRefresh} from 'react-icons/tb';

export default function Id() {

  const router = useRouter();
  const {id: movieFunctionIdQuery} = router.query as { id: string };
  const movieId = +movieFunctionIdQuery;
  const slideOverRef: any = useRef(null);
  const slideOverHoursRef: any = useRef(null);
  const modalRef = useRef<any>(null);
  const {hasLoggedIn} = useContext(AuthContext);
  const {selectedAuditoriumId, setSelectedAuditorium} = useContext(AuditoriumsContext);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedMovieFunctionId, setSelectedMovieFunctionId] = useState(1);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format('DD-MM-YYYY'));
  const [selectedAuditoriumState, setSelectedAuditoriumState] = useState<AuditoriumType | undefined>(undefined);

  const {data: auditoriums, isLoading: isLoadingAuditoriums} = useHttp('/movies/auditoriums');

  const {
    data: seats,
    trigger: getSeats,
    isMutating,
  } = useHttpMutated(`/movies/seats/${selectedMovieFunctionId}/${selectedAuditoriumId}/${selectedDate}`);

  const {
    data: movieResponse,
    trigger: getMovieData,
    isMutating: isMutatingMovie,
  } = useHttpMutated(`/movies/${movieId}`);

  const {
    data: purchaseResponse,
    trigger: purchase,
    isMutating: isMutatingPurchase,
  } = useHttpMutated(`/movies/seats/purchase`, {
    movieFunctionId: selectedMovieFunctionId,
    seatsIds: selectedSeats,
    scheduledDate: selectedDate,
  });

  useEffect(() => {
    if (!hasLoggedIn) {
      router.push('/login');
    }
  }, [hasLoggedIn]);

  useEffect(() => {
    getMovieData();
  }, [movieId]);

  useEffect(() => {
    if (!!purchaseResponse?.id) {
      router.push(`/purchase/completed/${purchaseResponse.id}`);
    }
  }, [purchaseResponse]);

  useEffect(() => {
    setSelectedSeats([]);
    getSeats();
  }, [selectedDate, selectedAuditoriumId, selectedMovieFunctionId]);

  const selectSeat = (id: number, isSelected: boolean) => {
    const currentSelection = [...selectedSeats];
    if (isSelected) {
      const index = currentSelection.indexOf(id as never);
      currentSelection.splice(index, 1);
    } else {
      currentSelection.push(id as never);
    }
    setSelectedSeats(currentSelection);
  };

  const selectAuditorium = (id: number, isSelected: boolean) => {
    const selectedItem = auditoriums.find((auditorium: AuditoriumType) => auditorium.id === id);
    setSelectedAuditorium(selectedItem.id);
    slideOverRef.current?.hide();
    setSelectedAuditoriumState(selectedItem);
  };

  const selectMovieFunction = (id: number, isSelected: boolean) => {
    const selectedItem = movieResponse?.movieFunctions.find((movieFunctions: MovieFunctionType) => movieFunctions.id === id);
    setSelectedMovieFunctionId(selectedItem.id);
    slideOverHoursRef.current?.hide();
  };

  const selectedMovieFunction = movieResponse?.movieFunctions.find((movieFunction: MovieFunctionType) => movieFunction.id === selectedMovieFunctionId);

  return (
    <MainLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pb-12 pt-10 lg:max-w-7xl lg:px-8">

          <Modal title={'Selecciona un asiento'}
                 message={'Agrega al menos un asiento, haciendo click en los asientos disponibles (en color verde) para poder realizar la compra.'}
                 auxButton={{
                   label: 'OK',
                 }}
                 ref={modalRef}/>

          <SlideOver ref={slideOverRef}
                     title={'Elige una Sala'}>
            <SlideOverChooser options={auditoriums}
                              isLoading={isLoadingAuditoriums}
                              renderItem={(auditorium: AuditoriumType) => {
                                const isSelected = (selectedAuditoriumId || 1) === auditorium.id;
                                return <SlideOverChooserItem key={auditorium.id}
                                                             id={auditorium.id}
                                                             name={auditorium.name}
                                                             isSelected={isSelected}
                                                             onClick={() => selectAuditorium(auditorium.id, isSelected)}
                                />;
                              }}/>
          </SlideOver>

          <SlideOver ref={slideOverHoursRef}
                     title={'Elige un Horario'}>
            <SlideOverChooser options={movieResponse?.movieFunctions}
                              isLoading={isLoadingAuditoriums}
                              renderItem={(movieFunction: MovieFunctionType) => {
                                const isSelected = (selectedMovieFunctionId || 1) === movieFunction.id;
                                return <SlideOverChooserItem key={movieFunction.id}
                                                             removeAvatar
                                                             id={movieFunction.id}
                                                             name={moment(movieFunction.shownAt, 'HH:mm').format('h:mm a')}
                                                             isSelected={isSelected}
                                                             onClick={() => selectMovieFunction(movieFunction.id, isSelected)}
                                />;
                              }}/>
          </SlideOver>

          <div className={'mb-12'}>
            <Header title={`${movieResponse?.name} - ${selectedAuditoriumState?.name || 'Sala A'} a las ${moment(selectedMovieFunction?.shownAt, 'HH:mm').format('h:mm a')}`}>
              <div className={'block lg:flex'}>
                <div className="flex">
                  <div className="">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      onClick={() => slideOverRef.current?.show()}
                    >
                      <BiCameraMovie className={`-ml-0.5 mr-1.5 h-5 w-5 text-gray-600`}
                                     aria-hidden="true"/>
                      <p>Cambiar de Sala</p>
                    </button>
                  </div>
                  <div className="ml-3">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      onClick={() => slideOverHoursRef.current?.show()}
                    >
                      <FaRegClock className={`-ml-0.5 mr-1.5 h-5 w-5 text-gray-600`}
                                  aria-hidden="true"/>
                      <p>Cambiar de Horario</p>
                    </button>
                  </div>
                  <div className="ml-3">
                    <Datepicker value={moment().toDate()}
                                minDate={moment().toDate()}
                                format={'d MMMM YYYY'}
                                onChanged={(value: any) => setSelectedDate(moment(value).format('DD-MM-YYYY'))}/>
                  </div>
                </div>

                <div className={'block lg:flex h-4'}>
                </div>

                <div className={'flex-1'}>
                  <div className="flex">

                    <div className="ml-auto pl-3">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => {
                          setSelectedSeats([]);
                          getSeats();
                        }}
                      >
                        {selectedSeats.length < 1 && <TbRefresh className={`ml-0.5 mr-0.5 h-5 w-5 text-gra-900`}
                                                                aria-hidden="true"/>}
                        {selectedSeats.length > 0 && <FaRegTrashAlt className={`ml-0.5 mr-0.5 h-5 w-5 text-gra-900`}
                                                                    aria-hidden="true"/>}
                        <p>{selectedSeats.length > 0 ? `(${selectedSeats.length})` : ''}</p>
                      </button>
                    </div>

                    <span className="ml-3">

                      <button
                        type="button"
                        className={'inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm bg-orange-500 hover:bg-orange-400'}
                        onClick={() => {
                          if (selectedSeats.length < 1) {
                            modalRef?.current.show();
                          } else {
                            purchase();
                          }
                        }}
                      >
                        <FaBagShopping className={`-ml-0.5 mr-1.5 h-5 w-5 text-white`}
                                       aria-hidden="true"/>
                        <p>COMPRAR</p>
                      </button>
                    </span>

                  </div>
                </div>
              </div>
            </Header>
          </div>

          <div className={'mb-16'}>
            <div className={'bg-gray-600 rounded-md h-10 pt-0.5 text-white text-2xl text-center'}>
              PANTALLA DE PROYECCIÓN
            </div>
          </div>

          <div className="mt-6 grid gap-x-6 gap-y-10 grid-cols-5 xl:gap-x-8">
            {isMutating && <Loader/>}
            {!isMutating &&
              <FlatList list={seats}
                        renderItem={(seat: SeatType, index) => <SeatItem key={seat.id}
                                                                         id={seat.id}
                                                                         seatNumber={seat.seatNumber}
                                                                         auditoriumName={selectedAuditoriumState?.name || 'Sala A'}
                                                                         index={index}
                                                                         isSelected={!!selectedSeats.find(id => seat.id === id)}
                                                                         onSelect={(id, isSelected) => selectSeat(id, isSelected)}
                                                                         available={seat.available}
                        />}/>}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
