import {RiCloseCircleFill} from 'react-icons/ri';
import {HiMiniHome} from 'react-icons/hi2';
import React from 'react';
import {useRouter} from 'next/router';

export default function ErrorBodyMessage() {
  const router = useRouter();
  return <div>
    <div className={'text-center text-white text-bold py-12 flex flex-col justify-center bg-red-600'}>
      <div className={'text-8xl mx-auto mb-8'}>
        <RiCloseCircleFill/>
      </div>
      <div className={'text-4xl mb-8'}>LA SOLICITUD NO ES VÁLIDA</div>
      <div>El recurso no existe o no tienes los permisos necesarios para acceder.</div>
    </div>
    <div className={'flex mt-10 pb-10'}>
      <button
        type="button"
        className={'mx-auto inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm bg-orange-500 hover:bg-orange-400'}
        onClick={() => router.push('/')}
      >
        <HiMiniHome className={`-ml-0.5 mr-1.5 h-5 w-5 text-white`}
                    aria-hidden="true"/>
        <p>IR A LA PAGINA DE INICIO</p>
      </button>
    </div>
  </div>;
}
