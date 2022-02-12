import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, useDisclosure } from '@chakra-ui/react';
import Layout from '../components/layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      toast.error(error.response.data.error, {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.resolve(error);
    }
  );

  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
