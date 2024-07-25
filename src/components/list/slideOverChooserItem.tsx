import {MdCheck} from 'react-icons/md';

export default function SlideOverChooserItem({
                                               id,
                                               name,
                                               isSelected,
                                               onClick,
                                               removeAvatar,
                                             }: {
  id: number,
  name: string,
  isSelected: boolean,
  onClick: any,
  removeAvatar?: boolean,
}) {
  return <div className={`flex flex-row ${isSelected ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'} cursor-pointer select-none`}
              onClick={onClick}>
    {!removeAvatar && <div className="p-4">
      <img
        src={`https://ui-avatars.com/api/?name=${name}&background=random`}
        alt={'Provider image'}
        className="h-12 w-12 object-cover object-center rounded-full"
      />
    </div>}
    <div className={`flex py-4 pr-4 items-center text-gray-700 ${removeAvatar ? 'ml-4' : ''}`}>
      {name}
    </div>
    <div className={'flex items-center justify-center text-2xl text-blue-700 pr-6'}>
      {isSelected && <MdCheck/>}
    </div>
  </div>;
}
