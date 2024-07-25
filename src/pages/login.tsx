'use client';

import {useHttpMutated} from '@/utils/http';
import {Field, Formik} from 'formik';
import {loginValidations} from '@/validators/login.validations';
import InputPrependField from '@/components/forms/input.prepend.field';
import {LockClosedIcon} from '@heroicons/react/24/solid';
import {SetStateAction, createContext, useState, useEffect, useRef} from 'react';
import {useRouter} from 'next/navigation';
import Modal from '@/components/modal';

export const LoginContext = createContext({
  email: '',
  password: '',
});

export default function Login() {
  
  const modalRef: any = useRef(null);
  const router = useRouter();
  
  const [email, setEmail] = useState('admin@dominio.com');
  const [password, setPassword] = useState('admin');
  
  const {trigger: httpLogin, data, reset} = useHttpMutated(`/users/login`, {
    email,
    password,
  });
  
  useEffect(() => {
    localStorage.removeItem('accessToken');
  }, []);
  
  useEffect(() => {
    if (!!data?.token) {
      localStorage.setItem('accessToken', data.token);
      router.push('/');
    }
  }, [data?.token]);
  
  useEffect(() => {
    if (data?.statusCode === 401) {
      modalRef.current?.show();
      reset();
    }
  }, [data?.statusCode]);
  
  return (
    <LoginContext.Provider value={{
      email,
      password,
    }}>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-gradient-to-r from-pink-500 to-rose-500">
        <div className={'bg-white rounded-2xl shadow-2xl px-10 py-12'}>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Inicia sesión
            </h2>
          </div>
          
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            
            <Modal ref={modalRef}
                   title={'Aviso'}
                   message={'Los datos son incorrectos.'}
                   okButton={{
                     label: 'OK',
                   }}/>
            
            <Formik onSubmit={values => httpLogin()}
                    enableReinitialize
                    validationSchema={loginValidations}
                    initialValues={{
                      email,
                      password,
                    }}>
              {(_form) => {
                return <div className="rounded-md shadow-sm -space-y-px">
                  <Field component={InputPrependField}
                         label={'Email'}
                         name="email"
                         type="email"
                         autoComplete="email"
                         onChange={(value: SetStateAction<string>) => setEmail(value)}
                         required
                         placeholder="correo@ejemplo.com"/>
                  <Field component={InputPrependField}
                         label={'Contraseña'}
                         name="password"
                         type="password"
                         autoComplete="current-password"
                         onChange={(value: SetStateAction<string>) => setPassword(value)}
                         required
                         placeholder="********"/>
                  <div className={'pt-2 px-1'}>
                    <button
                      onClick={() => _form.submitForm()}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-2"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon className="h-5 w-5 text-white"
                                        aria-hidden="true"/>
                      </span>
                      INICIAR SESIÓN
                    </button>
                  </div>
                </div>;
              }}
            </Formik>
            
            <p className="mt-4 text-center text-sm text-gray-500">
              <a href="/"
                 className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Volver a la página de inicio
              </a>
            </p>
          </div>
        </div>
      </div>
    </LoginContext.Provider>
  );
}
