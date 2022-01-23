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

const ProjectsPage: NextPage<Props> = ({ success, statusCode, data }) => {
  return (
    <ContentWrapper>
      <Head>
        <meta name="description" content="Full stack developer projects" />
        <meta
          name="keywords"
          content="Full stack project, js projects, Reactjs projects"
        />
        <title>Full-stack Projects - Abu Raihan</title>
      </Head>
      <Header />
      <NavBar />
      <div>
        <h2 className="font-bold text-2xl text-gray-600 font-sans">
          <Link href="/projects">Projects</Link>
        </h2>
        <PostList posts={data} />
      </div>
    </ContentWrapper>
  );
};

// Fetch all projects from server
ProjectsPage.getInitialProps = async () => {
  const data = await (await fetch(`${process.env.projects_url}`)).json();
  return data;
};

export default ProjectsPage;
