import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import ContentWrapper from "../components/ContentWrapper";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import PostList from "../components/PostList";

interface Props {
  success: boolean;
  statusCode: number;
  data: [];
}

const BlogPostPage: NextPage<Props> = ({ success, statusCode, data }) => {
  return (
    <ContentWrapper>
      <Head>
        <title>Blog posts - Abu Raihan</title>
      </Head>
      <Header />
      <NavBar />
      <div>
        <h2 className="font-bold text-2xl text-gray-600 font-sans">
          <Link href="/blog-posts">Blog posts</Link>
        </h2>
        <PostList posts={data} />
      </div>
    </ContentWrapper>
  );
};

// Fetch all blog posts from server
BlogPostPage.getInitialProps = async () => {
  const data = await (await fetch(`${process.env.blog_posts_url}`)).json();
  return data;
};

export default BlogPostPage;
