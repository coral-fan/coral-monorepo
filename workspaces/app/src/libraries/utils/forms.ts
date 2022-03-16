import { useForm } from 'react-hook-form';

export type RegisterProps = ReturnType<ReturnType<typeof useForm>['register']>;
