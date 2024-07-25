import moment from 'moment/moment';

export default function MovieCover({
                                     id,
                                     name,
                                     coverImageUrl,
                                     durationInMinutes,
                                     onClick,
                                   }: {
  id: number,
  name: string,
  coverImageUrl: string,
  durationInMinutes: number,
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
    <p className="mt-6 text-lg leading-8 text-gray-600">
      {`${durationHours}h ${durationMinutes}m`}
    </p>
  </div>;
}
