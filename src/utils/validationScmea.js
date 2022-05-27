import * as yup from 'yup'

export const LoginValidationSchema = yup.object().shape({
    login: yup.string().required('Required'),
    password:yup.string().required('Reqiered')
});
