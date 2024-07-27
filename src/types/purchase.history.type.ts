import SeatType from '@/types/seat.type';
import AuditoriumType from '@/types/auditorium.type';
import MovieFunctionType from '@/types/movie.function.type';

export default interface PurchaseHistoryType {
  purchaseId: string;
  scheduledDate: string;
  seats: SeatType[];
  movieFunction: MovieFunctionType;
  auditorium: AuditoriumType;
  statusCode: number;
}
