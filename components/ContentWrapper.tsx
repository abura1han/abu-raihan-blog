import Head from "next/head";
import React, { useState } from "react";
import { MenuContext, NotificationContext } from "../contexts";
import Notification from "./Notification";

interface Props {
  children?: React.ReactNode;
  width?: number;
}

const ContentWrapper: React.FC<Props> = ({ children }) => {
  const [menu, setMenu] = useState<{ isHidden: boolean }>({ isHidden: false });
  // Notification context
  const [notification, setNotification] = useState<{
    msg: string;
    type: string;
  }>({ msg: "", type: "" });

  const dispatchMenu = (menu: { isHidden: boolean }) => setMenu(menu);
  const dispatchNotification = (notification: { type: string; msg: string }) =>
    setNotification(notification);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Source+Code+Pro&display=swap"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
          crossOrigin=""
        />
      </Head>

      <NotificationContext.Provider
        value={{ notification, dispatchNotification }}
      >
        <MenuContext.Provider value={{ menu, dispatchMenu }}>
          <div className="max-w-[1200px] w-full mx-auto px-2 xl:px-0">
            {children && children}
          </div>
          <Notification />
        </MenuContext.Provider>
      </NotificationContext.Provider>
    </>
  );
};

export default ContentWrapper;
