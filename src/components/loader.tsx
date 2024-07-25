import {TbLoader2} from 'react-icons/tb';

export default function Loader({size, containerStyle}: { size?: 'large' | 'medium' | 'small', containerStyle?: string }) {
  const sizeSelector = {
    'large': 'text-9xl',
    'medium': 'text-6xl',
    'small': 'text-3xl',
  };
  return (
    <div className={`flex justify-center items-center ${containerStyle || ''}`}>
      <div className={`animate-spin ${sizeSelector[size || 'small']} text-orange-500`}>
        <TbLoader2/>
      </div>
    </div>
  );
}
