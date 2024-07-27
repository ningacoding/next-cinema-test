import MovieFunctionType from '@/types/movie.function.type';

export default function MovieFunctionHourItem({movieFunction}: { movieFunction: MovieFunctionType }) {
  return <div className={'bg-gray-200 text-gray-600 px-3 py-1 rounded-full mx-2 text-sm font-bold'}>
    {movieFunction.shownAt}
  </div>;
};
