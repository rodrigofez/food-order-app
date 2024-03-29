import Head from "next/head";
import { FC, ReactNode, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useGetIsOpenQuery, useGetOneStoreQuery } from "../../services/api";
import { selectIsLoggedIn, selectUser } from "../../store";
import { useAppSelector } from "../../store/hooks";
import { EmailAlert, Footer, Navbar } from "../ui";
import ScheduleAlert from "../ui/Alerts/ScheduleAlert";

import "react-toastify/dist/ReactToastify.css";

interface Props {
  children: ReactNode;
  title?: string;
  margin?: boolean;
}

export const Layout: FC<Props> = ({ children, title, margin = false }) => {
  const { isEmailConfirmed } = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const {
    data: scheduling,
    isLoading,
    isError,
    isUninitialized,
  } = useGetIsOpenQuery();

  const {
    data: store,
    isError: isStoreError,
    isLoading: isStoreLoading,
    isUninitialized: isStoreUninitialized,
  } = useGetOneStoreQuery();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>{title || "Shop"}</title>
        <meta name="description" content="Somos un restaurante mexicano que ofrece una amplia selección de deliciosos y tradicionales platillos elaborados con los ingredientes más frescos. Desde deliciosos tacos y enchiladas hasta sabrosos burritos y quesadillas, nuestro menú tiene algo para cada antojo." />
      </Head>
      <div className=" fixed bottom-0 z-40">
        {isClient && isLoggedIn && !isEmailConfirmed && <EmailAlert />}
        {!isLoading && !isError && !isUninitialized && !scheduling.isOpen && (
          <ScheduleAlert />
        )}
      </div>
      <Navbar />
      <main className={`lg:flex p-6 pt-2 px-6 justify-center w-full`}>
        <div className="w-full center-div max-w-5xl">{children}</div>
      </main>
      <ToastContainer />
      {store && <Footer margin={margin} store={store} />}
    </>
  );
};

export default Layout;
