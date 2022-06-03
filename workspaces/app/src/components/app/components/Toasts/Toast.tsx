import { Toaster } from 'react-hot-toast';
import tokens from 'styles/tokens';

const toastOptions = {
  style: {
    color: `${tokens.font.color.primary}`,
    background: `${tokens.background.color.secondary}`,
  },
  success: {
    theme: {
      duration: 3000,
    },
    iconTheme: {
      primary: `${tokens.background.color.brand}`,
      secondary: `${tokens.background.color.primary}`,
    },
  },
  error: {
    theme: {
      duration: 3000,
    },
    iconTheme: {
      primary: `${tokens.font.color.error}`,
      secondary: `${tokens.background.color.primary}`,
    },
  },
};

export const Toast = () => <Toaster toastOptions={toastOptions} containerStyle={{ top: 40 }} />;
