import toast from 'react-hot-toast';

const errorToast = (message = 'Something went wrong - please try again') => toast.error(message);

export const useErrorToast = () => errorToast;

type ToastOptions = NonNullable<Parameters<typeof toast.success>[1]>;

const successToast = (message = 'Success!', options?: ToastOptions) =>
  toast.success(message, options);

export const useSuccessToast = () => successToast;
