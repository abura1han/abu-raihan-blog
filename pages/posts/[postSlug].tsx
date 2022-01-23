import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import ContentWrapper from "../../components/ContentWrapper";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import NewsLater from "../../components/NewsLater";
import SyntaxHighlight from "../../components/SyntaxHighlight";

interface Props {
  success: boolean;
  statusCode: number;
  error?: string;
  data?: {
    thumbnail: {
      url: string;
    };
    shortDescription: string;
    title: string;
    _id: string;
    slug: string;
    description: string;
    updatedAt: string;
  };
}

// Single post page
const SinglePostPage: NextPage<Props> = ({
  success,
  statusCode,
  error,
  data,
}) => {
  return (
    <ContentWrapper>
      <Head>
        <meta name="description" content={data?.shortDescription} />
        <link rel="stylesheet" href="/markdown.css" />
        <title>{data?.title} - Abu Raihan</title>
      </Head>
      <Header />
      <NavBar />
      {success ? (
        <div className="mb-10 mx-auto max-w-[780px]">
          <div className="mt-4 sm:mt-0">
            <Link href={`${data?.thumbnail.url}`}>
              <a target="_blank" href={data?.thumbnail.url}>
                <img
                  src={data?.thumbnail.url}
                  alt={data?.title}
                  title={data?.title}
                  className="cursor-pointer"
                />
              </a>
            </Link>
          </div>
          <h2
            title={data?.title}
            role="heading"
            className="font-semibold text-3xl text-left my-3 text-black"
          >
            <Link href={`${data?.slug}`}>{data?.title}</Link>
          </h2>
          <div className="text-merri font-bold text-sm text-blue-700 mb-3 mt-1">
            UPDATED{" "}
            {new Date(String(data?.updatedAt))
              .toDateString()
              .slice(3)
              .toUpperCase()}
          </div>
          <div className="single-post">
            <ReactMarkdown
              children={String(data?.description)}
              components={SyntaxHighlight}
              plugins={[remarkGfm]}
            />
          </div>
        </div>
      ) : (
        <div>
          <h2 className="font-semibold text-xl text-center mt-10 text-gray-600">
            {statusCode} {error}
          </h2>
        </div>
      )}
      <NewsLater name="Abu Raihan" />
    </ContentWrapper>
  );
};

// Fetch all posts
SinglePostPage.getInitialProps = async (req: NextPageContext) => {
  const data = await (
    await fetch(`${process.env.posts_url}${req.query.postSlug}`)
  ).json();
  return data;
};

export default SinglePostPage;
