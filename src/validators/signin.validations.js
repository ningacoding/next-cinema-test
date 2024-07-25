import * as Yup from 'yup';

export const signInValidations = Yup.object().shape({
  email: Yup.string().email('Debe ser un email').required('Email es requerido.'),
  password: Yup.string().required('Contraseña es requerido.'),
  passwordRepeat: Yup.string().oneOf([Yup.ref('password')], 'Las contraseñas deben ser iguales').required('Contraseña es requerido.'),
  roleId: Yup.number().required('Contraseña es requerido.'),
});
