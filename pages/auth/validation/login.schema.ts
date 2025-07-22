import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().min(6, "Minimal 6 characters").required('Password is required'),
}).required('Login data is required');

export type LoginSchemaType = yup.InferType<typeof LoginSchema>;





