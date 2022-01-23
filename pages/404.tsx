import Head from "next/head";
import Link from "next/link";
import React from "react";
import ContentWrapper from "../components/ContentWrapper";
import Header from "../components/Header";

const $404 = () => {
  return (
    <ContentWrapper>
      <Head>
        <title>404 page not found - Abu Raihan</title>
      </Head>
      <Header />
      <h2
        className="font-semibold text-3xl text-center mt-10 text-gray-600"
        role="heading"
      >
        404 page not found
      </h2>
      <div className="mx-auto text-center mt-4 text-blue-500 hover:underline">
        <Link href={"/"}>Back to home</Link>
      </div>
      <div className="text-center mt-14">
        <h2
          className="font-semibold text-xl text-center mt-10 text-gray-600"
          role="heading"
        >
          Some posts you may like
        </h2>
      </div>
    </ContentWrapper>
  );
};

export default $404;
