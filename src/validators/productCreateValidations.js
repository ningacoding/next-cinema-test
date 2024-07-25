import * as Yup from 'yup';

export const productCreateValidations = Yup.object().shape({
  name: Yup.string().required('Este campo es requerido.'),
  sku: Yup.string().required('Este campo es requerido.'),
  quantity: Yup.number().nullable().min(0.01).required('Este campo es requerido.'),
  price: Yup.number().nullable().min(0.01).required('Este campo es requerido.'),
});
