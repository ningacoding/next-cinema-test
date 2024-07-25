'use client';

import MainLayout from '@/components/main.layout';
import {useHttpMutated} from '@/utils/http';
import {Field, Formik} from 'formik';
import {SetStateAction, useContext, useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/navigation';
import InputField from '@/components/forms/input.field';
import Button from '@/components/ui/button';
import {MdSave} from 'react-icons/md';
import {FcPackage} from 'react-icons/fc';
import {productCreateValidations} from '@/validators/productCreateValidations';
import Modal from '@/components/modal';
import HeaderWithBack from '@/components/page/header.with.back';
import {AuthContext} from '@/app/auditoriums';

export default function Create() {

  const modalRef: any = useRef(null);
  const formRef: any = useRef(null);
  const router = useRouter();

  const {hasLoggedIn, isBuyer} = useContext(AuthContext);

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const {trigger: httpCreateProduct, data, reset} = useHttpMutated(`/products`, {
    name,
    sku,
    quantity,
    price,
  });

  useEffect(() => {
    if (!hasLoggedIn) {
      router.push('/login');
    }
  }, [hasLoggedIn]);

  useEffect(() => {
    if (isBuyer) {
      router.push('/products');
    }
  }, [isBuyer]);

  useEffect(() => {
    if (!!data?.id) {
      modalRef.current?.show();
      formRef.current?.resetForm();
      setName('');
      setSku('');
      setQuantity(0);
      setPrice(0);
      reset();
    }
  }, [data?.id]);

  return (
    <MainLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pb-12 pt-10 lg:max-w-7xl lg:px-8">

          <HeaderWithBack title={'Agregar producto'}/>

          <div className="mt-6">

            <Modal ref={modalRef}
                   closable={false}
                   title={'Producto creado'}
                   message={'El producto se creó con éxito.'}
                   auxButton={{
                     label: 'Crear otro producto',
                     onClick: () => router.refresh(),
                   }}
                   okButton={{
                     label: 'Ver productos',
                     onClick: () => router.push('/'),
                   }}/>

            <Formik innerRef={formRef}
                    onSubmit={values => httpCreateProduct()}
                    enableReinitialize
                    validationSchema={productCreateValidations}
                    initialValues={{
                      name,
                      sku,
                      quantity,
                      price,
                    }}>
              {(_form) => {
                return <>
                  <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                      <div className="md:col-span-1">
                        <div className="px-4 sm:px-0 text-center">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Datos del producto
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">
                            Ingrese los datos del producto.
                          </p>
                          <div className={'text-9xl text-center flex items-center justify-center pt-6'}>
                            <FcPackage/>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="shadow overflow-hidden sm:rounded-md">
                          <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid grid-cols-6 gap-6">

                              <Field component={InputField}
                                     label={'Nombre del producto'}
                                     name={'name'}
                                     required
                                     onChange={(value: SetStateAction<string>) => setName(value)}
                                     containerStyles={'col-span-6'}/>

                              <Field component={InputField}
                                     label={'SKU'}
                                     name={'sku'}
                                     required
                                     onChange={(value: SetStateAction<string>) => setSku(value)}
                                     containerStyles={'col-span-6'}/>

                              <Field component={InputField}
                                     label={'Cantidad'}
                                     name={'quantity'}
                                     required
                                     onChange={(value: SetStateAction<string>) => setQuantity(Number(value))}
                                     containerStyles={'col-span-6'}/>

                              <Field component={InputField}
                                     label={'Precio'}
                                     name={'price'}
                                     required
                                     onChange={(value: SetStateAction<string>) => setPrice(Number(value))}
                                     containerStyles={'col-span-6'}/>

                            </div>
                          </div>
                          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <Button inline
                                    onClick={() => _form.submitForm()}
                                    icon={MdSave}
                                    label={'Guardar'}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </>;
              }}
            </Formik>

          </div>
        </div>
      </div>
    </MainLayout>
  );
};
