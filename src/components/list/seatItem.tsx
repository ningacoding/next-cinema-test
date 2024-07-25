import React from 'react';

export default function SeatItem({
                                   id,
                                   index,
                                   available,
                                   auditoriumName,
                                   onSelect,
                                   isSelected,
                                 }: {
  id: number;
  index: string;
  auditoriumName: string;
  available: boolean;
  isSelected: boolean;
  onSelect: (id: number, isSelected: boolean) => void;
}) {

  const [selected, setSelected] = React.useState(isSelected);

  const seatColor = selected ? 'blue' : available ? 'green' : 'gray';

  return <div key={id}
              onClick={() => {
                if (!available) {
                  return;
                }
                setSelected(!selected);
                onSelect(id, selected);
              }}
              className={`group relative ${selected ? 'bg-blue-100' : 'bg-gray-50'} rounded-md ${available ? 'cursor-pointer hover:shadow-md transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 duration-300' : ''} py-6`}>
    <div className={'w-18 h-16'}>
      <div className={`bg-${seatColor}-300 rounded-b-2xl w-16 h-14 mx-auto flex rotate-180`}>
        <div className={`bg-${seatColor}-600 w-4 h-8`}>
        </div>
        <div className={`bg-${seatColor}-600 w-8 h-4`}>
        </div>
        <div className={`bg-${seatColor}-600 w-4 h-8`}>
        </div>
        {/* MANTENER ESTO PARA QUE TAILWIND GENERE LOS ESTILOS */}
        <div className={'bg-blue-300 bg-green-300 bg-gray-300 bg-blue-600 bg-green-600 bg-gray-600 hidden'}></div>
      </div>
    </div>
    <div className={`text-center ${selected ? 'font-bold' : ''}`}>
      {`${auditoriumName.replace('Sala ', '')}${id}`}
    </div>
  </div>;
}
