'use client';

import {useHttpMutated} from '@/utils/http';
import {Field, Formik} from 'formik';
import {SetStateAction, createContext, useState, useEffect, useRef} from 'react';
import {useRouter} from 'next/navigation';
import Modal from '@/components/modal';
import InputField from '@/components/forms/input.field';
import {FaUserPlus} from 'react-icons/fa';
import {signInValidations} from '@/validators/signin.validations';
import HeaderWithBack from '@/components/page/header.with.back';
import RadioGroupField, {roles} from '@/components/forms/radio.group.field';
import Link from 'next/link';

export const LoginContext = createContext({
  email: '',
  password: '',
  passwordRepeat: '',
  roleId: roles[0].id,
});

export default function Signin() {
  
  const modalRef: any = useRef(null);
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [roleId, setRoleId] = useState(roles[0].id);
  
  const {trigger: httpLogin, data, reset} = useHttpMutated(`/users`, {
    email,
    password,
    roleId,
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
    if (data?.statusCode === 500) {
      modalRef.current?.show();
      reset();
    }
  }, [data?.statusCode]);
  
  return (
    <LoginContext.Provider value={{
      email,
      password,
      passwordRepeat,
      roleId,
    }}>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-gradient-to-r from-sky-500 to-blue-500">
        <div className={'bg-white rounded-2xl shadow-2xl px-10 py-12'}>
          
          <HeaderWithBack title={'Crea una cuenta'}/>
          
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            
            <Modal ref={modalRef}
                   title={'Aviso'}
                   message={'El email ingresado ya existe, elige otro o inicia sesión.'}
                   auxButton={{
                      label: 'Iniciar sesión',
                      onClick: () => router.push('/login'),
                   }}
                   okButton={{
                     label: 'Ingresar otro correo',
                   }}/>
            
            <Formik onSubmit={values => httpLogin()}
                    enableReinitialize
                    validationSchema={signInValidations}
                    initialValues={{
                      email,
                      password,
                      passwordRepeat,
                      roleId,
                    }}>
              {(_form) => {
                return <div className="rounded-md shadow-sm -space-y-px lg:min-w-96 sm:min-w-96">
                  <Field component={InputField}
                         label={'Email'}
                         name="email"
                         type="email"
                         autoComplete="email"
                         onChange={(value: SetStateAction<string>) => setEmail(value)}
                         required
                         containerStyles={'col-span-6 pt-6'}
                         placeholder="correo@ejemplo.com"/>
                  <Field component={InputField}
                         label={'Contraseña'}
                         name="password"
                         type="password"
                         autoComplete="current-password"
                         onChange={(value: SetStateAction<string>) => setPassword(value)}
                         required
                         containerStyles={'col-span-6 pt-6'}
                         placeholder="********"/>
                  <Field component={InputField}
                         label={'Confirmar contraseña'}
                         name="passwordRepeat"
                         type="password"
                         autoComplete="current-password"
                         onChange={(value: SetStateAction<string>) => setPasswordRepeat(value)}
                         required
                         containerStyles={'col-span-6 pt-6 pb-4'}
                         placeholder="********"/>
                  <Field component={RadioGroupField}
                         name="roleId"
                         onChange={(value: SetStateAction<string>) => setRoleId(+value)}
                         required/>
                  <div className={'pt-2 px-1'}>
                    <button
                      onClick={() => _form.submitForm()}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-2"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <FaUserPlus className="h-5 w-5 text-white"
                                    aria-hidden="true"/>
                      </span>
                      REGISTRARSE
                    </button>
                  </div>
                </div>;
              }}
            </Formik>
            
            <p className="mt-4 text-center text-sm text-gray-500">
              <div className={'text-center mb-4'}>
                <Link href="/login"
                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Inicia sesión
                </Link>
              </div>
            </p>
          </div>
        </div>
      </div>
    </LoginContext.Provider>
  );
}
