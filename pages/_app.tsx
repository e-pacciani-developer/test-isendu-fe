import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      // Shows an toast containing the error message after a failed request
      toast.error(error?.response?.data?.error, {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });

      return Promise.reject(error.response);
    }
  );

  // Distinction between components that have a layout (headbar) and those that don't like the SignIn/SignUp form
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <ChakraProvider>
      {getLayout(<Component {...pageProps} />)}
      <ToastContainer />
    </ChakraProvider>
  );
}

export default MyApp;
