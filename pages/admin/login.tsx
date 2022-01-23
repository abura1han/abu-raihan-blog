import Head from "next/head";
import React, { useContext, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import ContentWrapper from "../../components/ContentWrapper";
import { NotificationContext } from "../../contexts";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatchNotification } = useContext(NotificationContext);

  // Handle login
  const handleLogin = () => {
    fetch(`${process.env.login_url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          dispatchNotification({ type: "error", msg: data.error });
          return;
        }

        document.cookie = "access_token=" + data.data.accessToken;
        dispatchNotification({ type: "success", msg: data.message });
        window.location.assign("/admin");
      });
  };
  return (
    <ContentWrapper>
      <Head>
        <title>Admin login - Abu Raihan</title>
      </Head>
      <AdminHeader />
      <div className="max-w-[500px] mx-auto">
        <h2 className="font-semibold text-3xl mt-4 text-gray-600">Login</h2>
        <form
          className="mt-2 max-w-[400px]"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mt-5">
            <label htmlFor="email" className="block font-medium text-black">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-1 py-2 border border-[#D1CFCF]"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="password" className="block font-medium text-black">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-1 py-2 border border-[#D1CFCF]"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="mt-2">
            <button
              type="submit"
              className="block font-medium text-black bg-yellow-400 px-4 py-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </ContentWrapper>
  );
};

export default LoginPage;
