import MovieType from '@/types/movie.type';

export default interface MovieFunctionType {
  id: number;
  shownAt: string;
  movie: MovieType;
}
