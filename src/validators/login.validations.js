import * as Yup from 'yup';

export const loginValidations = Yup.object().shape({
    email: Yup.string().email('Debe ser un email').required('Email es requerido.'),
    password: Yup.string().required('Contraseña es requerido.'),
});
