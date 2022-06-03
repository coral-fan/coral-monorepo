import toast from 'react-hot-toast';

const errorToast = (message = 'Something went wrong - please try again') => toast.error(message);

export const useErrorToast = () => errorToast;

const successToast = (message = 'Success!') => toast.success(message);

export const useSuccessToast = () => successToast;
