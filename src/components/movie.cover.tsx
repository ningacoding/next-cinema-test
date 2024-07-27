import moment from 'moment/moment';
import MovieFunctionType from '@/types/movie.function.type';
import MovieFunctionHourItem from '@/components/list/movie.function.hour.item';

export default function MovieCover({
                                     id,
                                     name,
                                     coverImageUrl,
                                     durationInMinutes,
                                     onClick,
                                     movieFunctions,
                                   }: {
  id: number,
  name: string,
  coverImageUrl: string,
  durationInMinutes: number,
  movieFunctions: MovieFunctionType[],
  onClick: Function,
}) {

  const durationHours = moment.duration(durationInMinutes, 'minutes').hours();
  const durationMinutes = moment.duration(durationInMinutes, 'minutes').minutes();

  return <div key={id}
              onClick={() => onClick(id)}
              className="text-center mb-10 cursor-pointer hover:bg-gray-50 pb-6 transition duration-300 ease-in-out hover:scale-105">
    <div className="relative overflow-hidden bg-cover bg-no-repeat">
      <img className="bg-gray-400 mb-8 mx-auto "
           src={coverImageUrl}/>
    </div>
    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
      {name}
    </h1>
    <div className={'flex justify-center mt-8'}>
      <div className={'font-bold px-2 pl-6 pt-0.5'}>
        Funciones
      </div>
      {movieFunctions?.map((movieFunction: MovieFunctionType) => <MovieFunctionHourItem key={movieFunction.id}
                                                                                        movieFunction={movieFunction}/>)}
    </div>
    <div className={'flex justify-center mt-8'}>
      <div className={'font-bold px-2 pl-6'}>
        Duración
      </div>
      <div className={'font-bold px-2 pl-6 text-green-600'}>
        {`${durationHours}h ${durationMinutes}m`}
      </div>
    </div>
  </div>;
}
