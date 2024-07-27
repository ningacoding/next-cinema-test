import MovieFunctionType from '@/types/movie.function.type';

export default interface MovieType {
  id: number;
  name: string;
  coverImageUrl: string;
  durationInMinutes: number;
  movieFunctions: MovieFunctionType[];
}
