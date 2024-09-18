import Aos from "aos";
import "aos/dist/aos.css";
import "../styles/index.scss";
import { useEffect } from "react";
import ScrollToTop from "../components/common/ScrollTop";
import { Provider } from "react-redux";
import { store } from "../app/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from 'next-auth/react';

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

function MyApp({ Component, pageProps, session }) {
  // aos animation activation

  useEffect(() => {
    Aos.init({
      duration: 1400,
      once: true,
    });
  }, []);

  return (

    <Provider store={store}>
      <div className="page-wrapper">
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>

        {/* Toastify */}
        <ToastContainer
          position="bottom-right"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {/* <!-- Scroll To Top --> */}
        <ScrollToTop />
      </div>
    </Provider>
  );
}

export default MyApp;
