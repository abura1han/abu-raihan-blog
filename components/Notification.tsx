import React, { useContext } from "react";
import { NotificationContext } from "../contexts";

const Notification = () => {
  const { notification, dispatchNotification } =
    useContext(NotificationContext);

  return (
    <div className="fixed bottom-5 left-5">
      {notification.msg && (
        <ul>
          <li>
            <div
              className={`px-2 py-3 text-black flex justify-between items-start min-w-full sm:min-w-[300px] bg-white  shadow-[0_0_3px_#858383] border-l-4 ${
                notification.type === "success" && "border-l-green-600"
              } ${notification.type === "error" && "border-l-red-600"}`}
            >
              {notification.msg}
              <button
                className="material-icons"
                onClick={() => dispatchNotification({ type: "", msg: "" })}
              >
                close
              </button>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Notification;
