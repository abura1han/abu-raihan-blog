import React from "react";

/***
 * Menu context
 */
interface MenuContext {
  menu: { isHidden: boolean };
  dispatchMenu: (menu: { isHidden: boolean }) => void;
}

export const MenuContext = React.createContext<MenuContext>({
  menu: { isHidden: true },
  dispatchMenu: () => {},
});

/**
 * Notification context
 */
interface NotificationContext {
  notification: { type: string; msg: string };
  dispatchNotification: (notification: { type: string; msg: string }) => void;
}

export const NotificationContext = React.createContext<NotificationContext>({
  notification: { type: "", msg: "" },
  dispatchNotification: () => {},
});
