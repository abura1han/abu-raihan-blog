import { NextPage } from "next";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import ContentWrapper from "../../components/ContentWrapper";
import { NotificationContext } from "../../contexts";
import Cookies from "js-cookie";

interface Props {
  data?: {
    name: string;
    email: string;
    bio: string;
    socialLinks: {
      facebook: string;
      github: string;
      linkedin: string;
      discord: string;
    };
  };
}
const Settings: NextPage<Props> = ({ data }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [discord, setDiscord] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPasswrod] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const { dispatchNotification } = useContext(NotificationContext);

  useEffect(() => {
    data?.name && setName(data?.name);
    data?.email && setEmail(data?.email);
    data?.bio && setBio(data?.bio);
    data?.socialLinks.github && setGithub(data?.socialLinks.github);
    data?.socialLinks.linkedin && setLinkedin(data?.socialLinks.linkedin);
    data?.socialLinks.facebook && setFacebook(data?.socialLinks.facebook);
    data?.socialLinks.discord && setDiscord(data?.socialLinks.discord);
  }, [data]);

  console.log(data);

  // Handle update user
  async function handleUpdateUser() {
    fetch(`${process.env.edit_user_url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("access_token")}`,
      },
      body: JSON.stringify({
        image,
        name,
        email,
        bio,
        socialLinks: {
          github,
          linkedin,
          facebook,
          discord,
        },
        password,
        newPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          return dispatchNotification({ type: "error", msg: data.error });
        }
        dispatchNotification({ type: "success", msg: data.message });
      });
  }

  // Handle image
  const handleImage = (e: any) => {
    if (e.target !== null) {
      const image = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => setImage(String(reader.result));
    }
  };

  return (
    <ContentWrapper>
      <Head>
        <title>Settings - Abu Raihan</title>
      </Head>
      <AdminHeader />
      <div className="mb-3 max-w-[1000px] mx-auto">
        <h2 className="font-semibold text-3xl mt-10 text-gray-600">Settings</h2>
        <div className="border p-2 mt-3 border-[#D1CFCF]">
          <h3 className="font-bold text-xl">Generale</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateUser();
            }}
          >
            <div className="mt-2">
              <label htmlFor="p-pic" className="block font-medium">
                Profile pic
              </label>
              <input
                type="file"
                accept="image/webp"
                id="p-pic"
                className="w-full border border-[#D1CFCF] px-1 py-2"
                onChange={handleImage}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="name" className="block font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-[#D1CFCF] px-1 py-2"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            <div className="mt-2">
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-[#D1CFCF] px-1 py-2"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="mt-2">
              <label htmlFor="bio" className="block font-medium">
                Bio
              </label>
              <textarea
                id="bio"
                className="w-full min-h-[100px] border border-[#D1CFCF] px-1 py-2"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                required
              />
            </div>
            <div className="mt-2">
              <button
                type="submit"
                className="px-3 py-1 font-medium bg-yellow-400"
              >
                Update
              </button>
            </div>
          </form>
        </div>

        <div className="border p-2 mt-5 border-[#D1CFCF]">
          <h3 className="font-bold text-xl">Links</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateUser();
            }}
          >
            <div className="mt-2">
              <label htmlFor="github" className="block font-medium">
                GitHub
              </label>
              <input
                type="url"
                id="github"
                className="w-full border border-[#D1CFCF] px-1 py-2"
                onChange={(e) => setGithub(e.target.value)}
                value={github}
              />
            </div>

            <div className="mt-2">
              <label htmlFor="linkedin" className="block font-medium">
                Linkedin
              </label>
              <input
                type="url"
                id="linkedin"
                className="w-full border border-[#D1CFCF] px-1 py-2"
                onChange={(e) => setLinkedin(e.target.value)}
                value={linkedin}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="facebook" className="block font-medium">
                Facebook
              </label>
              <input
                type="url"
                id="facebook"
                className="w-full border border-[#D1CFCF] px-1 py-2"
                onChange={(e) => setFacebook(e.target.value)}
                value={facebook}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="discord" className="block font-medium">
                Discord
              </label>
              <input
                type="url"
                id="discord"
                className="w-full border border-[#D1CFCF] px-1 py-2"
                onChange={(e) => setDiscord(e.target.value)}
                value={discord}
              />
            </div>

            <div className="mt-2">
              <button
                type="submit"
                className="px-3 py-1 font-medium bg-yellow-400"
              >
                Update
              </button>
            </div>
          </form>
        </div>

        <div className="border p-2 mt-5 border-[#D1CFCF]">
          <h3 className="font-bold text-xl">Security</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateUser();
            }}
          >
            <div className="mt-2">
              <label htmlFor="password" className="block font-medium">
                Old password
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-[#D1CFCF] px-1 py-2"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div className="mt-2">
              <label htmlFor="n-password" className="block font-medium">
                New password
              </label>
              <input
                type="password"
                id="n-password"
                className="w-full border border-[#D1CFCF] px-1 py-2"
                onChange={(e) => setNewPasswrod(e.target.value)}
                value={newPassword}
              />
            </div>

            <div className="mt-2">
              <button
                type="submit"
                className="px-3 py-1 font-medium bg-yellow-400"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </ContentWrapper>
  );
};

Settings.getInitialProps = async () => {
  const data = await (await fetch(`${process.env.user_url}`)).json();
  return data;
};

export default Settings;
