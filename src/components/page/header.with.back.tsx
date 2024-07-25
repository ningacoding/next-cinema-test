'use client'

import {MdArrowBack} from 'react-icons/md';
import {useRouter} from 'next/navigation';

export default function HeaderWithBack({title}:{title: string}) {
  const router = useRouter();
  return (
    <div className={'mb-12'}>
      <div className="min-w-0 flex flex-row">
        <div className={'text-2xl hover:bg-gray-200 rounded-full p-2 mr-6 cursor-pointer'}
             onClick={() => router.back()}>
          <MdArrowBack/>
        </div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
      </div>
    </div>
  );
}
