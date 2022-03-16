import { useForm } from 'react-hook-form';

export type RegisterFormInputProps = ReturnType<ReturnType<typeof useForm>['register']>;
