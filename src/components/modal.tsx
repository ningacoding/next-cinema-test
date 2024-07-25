import {forwardRef, Fragment, useImperativeHandle, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {MdClose} from 'react-icons/md';

export default forwardRef(Modal);

function Modal({
                 isInitiallyOpened,
                 title,
                 message,
                 okButton,
                 auxButton,
                 closable = true,
               }: {
  title: string,
  message: string,
  isInitiallyOpened?: boolean,
  closable?: boolean,
  okButton?: {
    label: string,
    onClick?: () => void,
  },
  auxButton?: {
    label: string,
    onClick?: () => void,
  },
}, ref: any) {
  
  let [isOpened, setIsOpen] = useState(isInitiallyOpened || false);
  
  useImperativeHandle(ref, () => ({
    show: () => openModal(),
    hide: () => closeModal(),
  }));
  
  function closeModal() {
    setIsOpen(false);
  }
  
  function openModal() {
    setIsOpen(true);
  }
  
  return (
    <Transition appear
                show={isOpened}
                as={Fragment}>
      <Dialog as="div"
              className="relative z-10"
              onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25"/>
        </Transition.Child>
        
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className={'flex flex-row'}>
                  <div className="flex-col text-lg font-medium leading-6 text-gray-900">
                    <h3>
                      {title}
                    </h3>
                  </div>
                  {closable && <div className={'ml-auto rounded-full bg-red-600 text-white p-1 cursor-pointer'}
                                    onClick={closeModal}>
                    <MdClose/>
                  </div>}
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {message}
                  </p>
                </div>
                
                <div className="mt-4 flex flex-row-reverse">
                  {!!okButton && <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 ml-4 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={okButton.onClick || closeModal}
                  >
                    {okButton.label}
                  </button>}
                  {!!auxButton && <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={auxButton.onClick || closeModal}
                  >
                    {auxButton.label}
                  </button>}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
