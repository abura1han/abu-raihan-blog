import { NextPage } from "next";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import Head from "next/head";
import ContentWrapper from "../components/ContentWrapper";
import NewsLater from "../components/NewsLater";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

interface Props {
  success: boolean;
  statusCode: number;
  message?: string;
  error?: string;
  data?: {
    image: string;
    name: string;
    email: string;
    bio: string;
    socialLinks: {
      github: string;
      linkedin: string;
      facebook: string;
    };
    address: string;
  };
}

const HomePage: NextPage<Props> = ({
  success,
  statusCode,
  message,
  error,
  data,
}) => {
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [socialLinks, setSocialLinks] = useState<{
    github?: string | null;
    linkedin?: string | null;
    facebook?: string | null;
    discord?: string | null;
  }>({
    github: null,
    linkedin: null,
    facebook: null,
    discord: null,
  });

  useEffect(() => {
    data?.image && setImage(data?.image);
    data?.name && setName(data?.name);
    data?.email && setEmail(data?.email);
    data?.bio && setBio(data?.bio);

    data?.socialLinks &&
      setSocialLinks({
        ...data?.socialLinks,
      });
  }, [data]);

  return (
    <ContentWrapper>
      <Head>
        <link rel="stylesheet" href="/markdown.css" />
        <meta name="description" content="Full stack development projects" />
        <meta
          name="keywords"
          content="Full stack, Mern stack, Node js, React js, MongoDB, MySQL"
        />
        <title>{name} - home</title>
      </Head>
      <Header />
      <NavBar />
      <div>
        {image && (
          <div className="flex justify-center">
            <div className="mt-5 border border-[#D1CFCF] inline-block">
              <img src={image} alt={name} className="max-w-[220px] rotate-6" />
            </div>
          </div>
        )}
        <h2
          className="font-semibold text-4xl text-center mt-10 text-gray-600"
          data-testid="name"
        >
          {name}
        </h2>
        <p className="text-center">
          <a
            href={`mailto:${email}`}
            className="text-blue-600 hover:underline font-medium"
          >
            {email}
          </a>
        </p>
        <div className="text-center text-black max-w-[500px] mt-6 mx-auto single-post whitespace-pre">
          <ReactMarkdown>{bio}</ReactMarkdown>
        </div>
        <div className="text-center">
          <h2 className="font-medium text-xl text-gray-600">Social links</h2>
          <div className="flex justify-center mt-3">
            {socialLinks.github && (
              <div className="mx-1 text-blue-600 font-medium hover:underline">
                <Link href={socialLinks.github}>GitHub</Link>
              </div>
            )}

            {socialLinks.linkedin && (
              <div className="mx-1 text-blue-600 font-medium hover:underline">
                <Link href={socialLinks.linkedin}>linkedin</Link>
              </div>
            )}

            {socialLinks.facebook && (
              <div className="mx-1 text-blue-600 font-medium hover:underline">
                <Link href={socialLinks.facebook}>Facebook</Link>
              </div>
            )}

            {socialLinks.discord && (
              <div className="mx-1 text-blue-600 font-medium hover:underline">
                <Link href={socialLinks.discord}>Discord</Link>
              </div>
            )}
          </div>
        </div>
        <NewsLater name={name} />
      </div>
    </ContentWrapper>
  );
};

// Fetch user data
HomePage.getInitialProps = async () => {
  const data = await (await fetch(`${process.env.user_url}`)).json();
  return data;
};

export default HomePage;
